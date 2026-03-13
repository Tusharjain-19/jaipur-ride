import {
  metroData,
  translations,
  stationTranslations,
  lineNameMap,
  calculateFare,
  safetyData,
} from "./data/stations.js";
import { stationsMeta } from "./data/stationsMeta.js";
import { stationAttractions } from "./data/stationAttractions.js";
import { CustomDropdown } from "./ui/dropdown.js";
import { renderLiveRoute, updateRouteVisuals } from "./ui/route.js";

// ═══════════════════════════════════════
//  STATE
// ═══════════════════════════════════════
let currentLang = localStorage.getItem("appLang") || "en";
let currentTheme = localStorage.getItem("theme") || "light";
let startDropdown, endDropdown;
let currentJourney = null;
let lastView = "plan-view";
const simulationState = {
  isActive: false,
  startTime: null,
  timeline: [],
  animFrameId: null,
};
const precomputed = { stations: {}, graph: {} };

// ═══════════════════════════════════════
//  TRANSLATION
// ═══════════════════════════════════════
export function T(key) {
  return (translations[currentLang] && translations[currentLang][key]) || key;
}
export function T_STATION(name) {
  if (!name) return "";
  if (lineNameMap[name]) {
    const k = lineNameMap[name];
    return stationTranslations[k]?.[currentLang] || name;
  }
  return stationTranslations[name]?.[currentLang] || name;
}
export function formatTime(d) {
  return d.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}
window.T_STATION = T_STATION;
window.T = T;

function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

// ═══════════════════════════════════════
//  MODAL SYSTEM
// ═══════════════════════════════════════
function showModal({ title, body, confirmText, cancelText, onConfirm }) {
  const modal = document.getElementById("custom-modal");
  const tEl = document.getElementById("modal-title");
  const bEl = document.getElementById("modal-body");
  const cbtn = document.getElementById("modal-confirm-btn");
  const xbtn = document.getElementById("modal-cancel-btn");
  if (!modal || !tEl || !bEl || !cbtn || !xbtn) return;

  tEl.textContent = title || T("notice");
  bEl.innerHTML = body || "";
  cbtn.textContent = confirmText || "Confirm";
  xbtn.textContent = cancelText || "Cancel";

  modal.classList.remove("hidden");
  const close = () => modal.classList.add("hidden");
  cbtn.onclick = () => {
    close();
    if (onConfirm) onConfirm();
  };
  xbtn.onclick = () => {
    close();
  };
}

// ═══════════════════════════════════════
//  TOAST
// ═══════════════════════════════════════
function toast(msg) {
  const el = document.getElementById("toast");
  const txt = document.getElementById("toast-message");
  if (!el || !txt) return;
  txt.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 3000);
}

// ═══════════════════════════════════════
//  THEME
// ═══════════════════════════════════════
function setTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  const btn = document.getElementById("theme-toggle");
  if (btn) {
    btn.innerHTML =
      theme === "dark"
        ? '<i data-lucide="moon" class="w-18 h-18"></i>'
        : '<i data-lucide="sun" class="w-18 h-18"></i>';
    if (window.lucide) window.lucide.createIcons();
  }
}

// ═══════════════════════════════════════
//  LANGUAGE
// ═══════════════════════════════════════
function setLanguage(lang) {
  if (!translations[lang]) lang = "en";
  currentLang = lang;
  localStorage.setItem("appLang", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-lang-key]").forEach((el) => {
    const key = el.getAttribute("data-lang-key");
    if (translations[lang][key]) el.innerHTML = translations[lang][key];
  });
  if (startDropdown) startDropdown.refreshTranslations();
  if (endDropdown) endDropdown.refreshTranslations();

  // Reset view rendering flags to force re-render on next visit
  document
    .querySelectorAll("[data-rendered]")
    .forEach((el) => el.removeAttribute("data-rendered"));

  // Refresh current active view if it's one of the rendered ones
  const activeView = document.querySelector(".view.active-view");
  if (activeView) {
    if (activeView.id === "stations-view") renderStations();
    if (activeView.id === "safety-view") renderSafety();
    if (activeView.id === "timings-view") renderTimings();
    if (activeView.id === "explore-view") renderExplore();
    if (activeView.id === "explore-detail-view" && window.lastExploreStation) {
      showExploreDetail(window.lastExploreStation);
    }
  }
}

window.lastExploreStation = null;

// ═══════════════════════════════════════
//  GRAPH
// ═══════════════════════════════════════
function buildGraph() {
  Object.keys(metroData).forEach((lineKey) => {
    const line = metroData[lineKey];
    if (!line.stations) return;
    line.stations.forEach((s, i) => {
      precomputed.stations[s.id] = {
        ...s,
        lineKey,
        color: line.color,
        lineName: line.name,
        index: i,
      };
      if (!precomputed.graph[s.id]) precomputed.graph[s.id] = [];
      if (i > 0) {
        const prev = line.stations[i - 1];
        precomputed.graph[s.id].push({
          node: prev.id,
          weight: prev.timeToNext,
          distance: prev.distanceToNext,
          line: lineKey,
        });
      }
      if (i < line.stations.length - 1) {
        const next = line.stations[i + 1];
        precomputed.graph[s.id].push({
          node: next.id,
          weight: s.timeToNext,
          distance: s.distanceToNext,
          line: lineKey,
        });
      }
    });
  });
}

// ═══════════════════════════════════════
//  DIJKSTRA
// ═══════════════════════════════════════
function calcJourney(startId, endId) {
  const dist = {};
  const prev = {};
  const q = [];
  Object.keys(precomputed.stations).forEach((id) => (dist[id] = Infinity));
  dist[startId] = 0;
  q.push({ id: startId, cost: 0 });

  while (q.length) {
    q.sort((a, b) => a.cost - b.cost);
    const { id, cost } = q.shift();
    if (id === endId) break;
    if (cost > dist[id]) continue;
    (precomputed.graph[id] || []).forEach((nb) => {
      const nc = cost + nb.weight;
      if (nc < dist[nb.node]) {
        dist[nb.node] = nc;
        prev[nb.node] = { id, line: nb.line, distance: nb.distance };
        q.push({ id: nb.node, cost: nc });
      }
    });
  }
  if (dist[endId] === Infinity) return null;

  const path = [];
  let c = endId;
  let totalDist = 0;
  while (c) {
    path.unshift(c);
    if (prev[c]) {
      totalDist += prev[c].distance || 0;
      c = prev[c].id;
    } else c = null;
  }

  const parts = [];
  let part = null;
  for (let i = 0; i < path.length; i++) {
    const sd = precomputed.stations[path[i]];
    const nid = path[i + 1];
    let lot = null;
    if (nid) {
      const edge = precomputed.graph[path[i]].find((e) => e.node === nid);
      lot = edge ? edge.line : sd.lineKey;
    } else if (part) lot = part.stations[0].lineKey;

    if (!part || part.stations[0].lineKey !== lot) {
      let dir = "forward";
      if (nid) {
        const nd = precomputed.stations[nid];
        if (nd && nd.index < sd.index) dir = "backward";
      }
      const plat = sd.platforms ? sd.platforms[dir] || 1 : 1;
      let term = "Terminus";
      if (metroData[lot]) {
        const ls = metroData[lot].stations;
        term = dir === "forward" ? ls[ls.length - 1].name : ls[0].name;
      }
      part = {
        stations: [sd],
        startPlatform: plat,
        journeyDirectionName: T_STATION(term),
      };
      parts.push(part);
    } else part.stations.push(sd);
  }

  const dep = new Date(Math.ceil(Date.now() / 300000) * 300000);
  const stops = path.length - 1;
  return {
    id: `${startId}-${endId}`,
    parts,
    totalTime: dist[endId],
    fare: calculateFare(stops),
    distanceKm: totalDist.toFixed(1),
    departureTime: dep,
    stops,
  };
}

// ═══════════════════════════════════════
//  DISPLAY RESULT
// ═══════════════════════════════════════
function showResult(journey) {
  if (!journey) return;
  currentJourney = journey;

  const sum = document.getElementById("journey-summary");
  const board = document.getElementById("board-train-btn");
  if (!sum || !board) return;

  const mins = Math.ceil(journey.totalTime / 60);
  const startName = T_STATION(journey.parts[0].stations[0].name);
  const lastP = journey.parts[journey.parts.length - 1];
  const endName = T_STATION(lastP.stations[lastP.stations.length - 1].name);

  sum.innerHTML = `
        <p style="font-size:12px;font-weight:700;color:var(--text-muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:12px">${T("route")}</p>
        <p style="font-size:18px;font-weight:800;color:var(--text);margin-bottom:16px;line-height:1.3">${startName} → ${endName}</p>
        <div class="info-row">
            <div class="info-cell"><div class="info-label">${T("totalTime")}</div><div class="info-value">${mins} <span style="font-size:12px;font-weight:500">${T("minutes")}</span></div></div>
            <div class="info-cell" style="position:relative;">
                <div class="info-label">${T("estFare")}</div>
                <div class="info-value" style="color:var(--green)">₹${journey.fare}</div>
                <div class="discount-pill">-${Math.floor(journey.fare * 0.1)} Card</div>
            </div>
            <div class="info-cell"><div class="info-label">${T("numStops")}</div><div class="info-value">${journey.stops}</div></div>
        </div>
        
        <div class="fare-details">
            <div class="fare-row"><span>${T("smartCardFare")}</span><span>₹${Math.floor(journey.fare * 0.9)}</span></div>
            <div class="fare-row"><span>${T("seniorCitizenFare")} (-25%)</span><span>₹${Math.floor(journey.fare * 0.75)}</span></div>
        </div>

        <div style="display:flex;align-items:center;gap:8px;font-size:12px;color:var(--accent);background:var(--accent-soft);padding:10px 14px;border-radius:10px;font-weight:600;margin-top:16px">
            <i data-lucide="clock" class="w-16 h-16"></i>
            ${T("nextTrain")}: ${formatTime(journey.departureTime)}
        </div>`;

  // Add Top Nearby Attraction for Destination
  const destStation = lastP.stations[lastP.stations.length - 1];
  const attrs = stationAttractions[destStation.name] || [];
  if (attrs.length > 0) {
    const top = attrs[0];
    const topCard = document.createElement("div");
    topCard.className = "top-nearby-box";
    topCard.innerHTML = `
            <img src="${top.image}" class="top-nearby-thumb" alt="${top.name}">
            <div class="top-nearby-info">
                <div class="top-nearby-title">${top.name}</div>
                <div class="top-nearby-sub">${top.distance_km} km · ${top.walk_time_min} min walk</div>
            </div>
            <i data-lucide="chevron-right" class="w-16 h-16 muted"></i>
        `;
    topCard.onclick = () => showAttractionDetail(destStation.name, top.id);
    sum.appendChild(topCard);
  }

  board.textContent = T("startLiveJourney");
  board.classList.remove("hidden");

  showView("results-view");
  if (window.lucide) window.lucide.createIcons();
}

// ═══════════════════════════════════════
//  VIEW MANAGEMENT
// ═══════════════════════════════════════
function showView(viewId) {
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active-view"));
  const target = document.getElementById(viewId);
  if (target) {
    // Track history for back buttons, but don't track detail view itself as "last"
    const currentActive = document.querySelector(".view.active-view");
    if (
      currentActive &&
      currentActive.id !== "station-detail-view" &&
      viewId === "station-detail-view"
    ) {
      lastView = currentActive.id;
    } else if (viewId !== "station-detail-view") {
      lastView = viewId;
    }
    target.classList.add("active-view");
  }

  const content = document.getElementById("app-content");
  if (content) content.scrollTop = 0;

  // Update nav
  document
    .querySelectorAll(".nav-item")
    .forEach((b) => b.classList.remove("active"));
    const navMap = { 
        'plan-view': 'nav-plan', 
        'results-view': 'nav-plan', 
        'stations-view': 'nav-stations', 
        'timings-view': 'nav-timings', 
        'explore-view': 'nav-explore',
        'station-info-view': 'nav-stations',
        'explore-detail-view': 'nav-explore',
        'attraction-detail-view': 'nav-explore',
        'safety-view': 'nav-safety' 
    };
    const nb = document.getElementById(navMap[viewId]);
    if (nb) nb.classList.add('active');

    // Lazy render
    if (viewId === 'stations-view') renderStations();
    if (viewId === 'safety-view') renderSafety();
    if (viewId === 'timings-view') renderTimings();
    if (viewId === 'explore-view') renderExplore();

    if (window.lucide) window.lucide.createIcons();
}
window.showView = showView;

function showStationInfo(stationName) {
    const meta = stationsMeta.find(m => m.name === stationName) || {};
    const header = document.getElementById('station-info-header');
    const facilitiesEl = document.getElementById('info-facilities');
    const connectivityEl = document.getElementById('info-connectivity');
    const metroInfoEl = document.getElementById('info-metro');

    if (!header) return;

    // Clean white header
    header.style.background = 'white';
    header.style.backgroundImage = 'none';
    
    const hiName = meta.name_hi || stationTranslations[stationName]?.hi || '';
    header.innerHTML = `
        <div class="hero-line-badge" style="background:var(--accent-soft); color:var(--accent)">${meta.line || 'Pink Line'} • ${meta.code || ''}</div>
        <h2 style="color:var(--text)">${T_STATION(stationName)}</h2>
        <div class="stn-hi-title" style="color:var(--text-muted)">${hiName}</div>
        <p style="color:var(--text-sub)">${meta.type || 'Elevated'} Station</p>
    `;

    // Facilities
    if (facilitiesEl) {
        const facilities = meta.facilities || [];
        facilitiesEl.innerHTML = facilities.map(f => {
            let icon = 'sparkles';
            if (f.includes('Toilet')) icon = 'users';
            if (f.includes('Escalator')) icon = 'arrow-up';
            if (f.includes('Elevator')) icon = 'arrow-up-down';
            if (f.includes('Ticket')) icon = 'ticket';
            if (f.includes('Recharge')) icon = 'zap';
            if (f.includes('Wheelchair')) icon = 'accessibility';
            if (f.includes('Parking')) icon = 'parking-circle';
            return `<div class="tag-badge"><i data-lucide="${icon}" class="w-12 h-12"></i> ${f}</div>`;
        }).join('') || '<p class="muted">Information not available</p>';
    }

    // Connectivity
    if (connectivityEl) {
        const connectivity = meta.connectivity || [];
        connectivityEl.innerHTML = connectivity.map(c => {
            let icon = 'map-pin';
            if (c.includes('Bus')) icon = 'bus';
            if (c.includes('Auto')) icon = 'navigation';
            if (c.includes('Taxi') || c.includes('Cab')) icon = 'car';
            if (c.includes('Cycle') || c.includes('Bike')) icon = 'bike';
            if (c.includes('Walking')) icon = 'footprints';
            if (c.includes('rail')) icon = 'train';
            return `<div class="tag-badge connectivity-tag"><i data-lucide="${icon}" class="w-12 h-12"></i> ${c}</div>`;
        }).join('') || '<p class="muted">Information not available</p>';
    }

    // Metro Travel Info
    if (metroInfoEl) {
        const info = meta.metroInfo || {};
        const items = [
            { label: 'Line', value: meta.line || 'Pink Line' },
            { label: 'Station Type', value: meta.type || 'Elevated' },
            { label: 'Platforms', value: meta.platforms || '2' },
            { label: 'Opened', value: info.opened || '2015' },
            { label: 'Operator', value: info.operator || 'JMRC' }
        ];
        metroInfoEl.innerHTML = items.map(it => `
            <div class="meta-list-item">
                <span class="meta-it-label">${it.label}</span>
                <span class="meta-it-value">${it.value}</span>
            </div>
        `).join('');
    }

    showView('station-info-view');
    if (window.lucide) window.lucide.createIcons();
}
window.showStationInfo = showStationInfo;

function showExploreDetail(stationName) {
    window.lastExploreStation = stationName;
    const data = stationAttractions[stationName] || [];
    const meta = stationsMeta.find(m => m.name === stationName) || {};
    const header = document.getElementById('explore-detail-header');
    const carousel = document.getElementById('explore-attractions-carousel');
    const label = document.getElementById('explore-label');
    const aCount = document.getElementById('exp-attr-count');
    const aWalk = document.getElementById('exp-avg-walk');

    if (!header || !carousel) return;

    // Clean white header
    header.style.background = 'white';
    header.style.backgroundImage = 'none';

    // Header
    header.innerHTML = `
        <div class="hero-line-badge" style="background:var(--accent-soft); color:var(--accent)">${meta.line || 'Pink Line'} • ${meta.code || ''}</div>
        <h2 style="color:var(--text)">${T_STATION(stationName)}</h2>
        <p style="color:var(--text-sub)">Nearby Attractions & Places</p>
    `;

    // Carousel
    if (data.length === 0) {
        carousel.innerHTML = '<p style="padding:20px;color:var(--text-muted);font-size:13px">No major attractions listed nearby.</p>';
        label.textContent = 'Explore';
    } else {
        label.textContent = `Explore Near ${T_STATION(stationName)}`;
        carousel.innerHTML = data.map(a => `
            <div class="attr-card" onclick="showAttractionDetail('${stationName}', '${a.id}')">
                <div class="attr-img-container">
                    <img src="${a.image}" class="attr-img" alt="${a.name}">
                    <div class="attr-type-badge">${currentLang === 'hi' && a.typeHi ? a.typeHi : a.type}</div>
                </div>
                <div class="attr-body">
                    <div class="attr-name">${currentLang === 'hi' && a.nameHi ? a.nameHi : a.name}</div>
                    <div class="attr-desc">${currentLang === 'hi' && a.summaryHi ? a.summaryHi : (a.summary || a.description)}</div>
                    <div class="attr-meta">
                        <div class="meta-item"><i data-lucide="navigation"></i> ${a.distance_km} km</div>
                        <div class="meta-item"><i data-lucide="clock"></i> ${a.walk_time_min}m</div>
                    </div>
                    <div class="attr-card-actions">
                        <button class="btn-attr-small" onclick="event.stopPropagation(); window.open('${a.maps_link}', '_blank')">
                            <i data-lucide="map-pin"></i> Navigate
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Stats
    if (aCount) aCount.textContent = data.length;
    let totalWalk = 0;
    data.forEach(a => totalWalk += a.walk_time_min);
    if (aWalk) aWalk.textContent = data.length > 0 ? Math.round(totalWalk / data.length) + ' min' : '-';

    showView('explore-detail-view');
    if (window.lucide) window.lucide.createIcons();
}
window.showExploreDetail = showExploreDetail;

function showAttractionDetail(stationName, attrId) {
    const list = stationAttractions[stationName] || [];
    const a = list.find(it => it.id === attrId);
    if (!a) return;

    const content = document.getElementById('attr-detail-content');
    if (!content) return;

    const name = currentLang === 'hi' && a.nameHi ? a.nameHi : a.name;
    const desc = currentLang === 'hi' && a.descriptionHi ? a.descriptionHi : a.description;
    const type = currentLang === 'hi' && a.typeHi ? a.typeHi : a.type;

    content.innerHTML = `
        <div class="full-attr-hero">
            <img src="${a.image}" class="full-attr-img" alt="${name}">
            <div class="full-attr-overlay">
                <div class="attr-type-badge">${type}</div>
                <h2>${name}</h2>
            </div>
        </div>
        
        <div class="full-attr-body">
            <div class="attr-quick-meta">
                <div class="q-meta-item"><i data-lucide="navigation"></i> <span>${a.distance_km} km</span></div>
                <div class="q-meta-item"><i data-lucide="clock"></i> <span>${a.walk_time_min}m</span></div>
                ${a.entry_fee ? `<div class="q-meta-item"><i data-lucide="ticket"></i> <span>${a.entry_fee}</span></div>` : ''}
            </div>

            <div class="attr-detail-text">
                <h3>About</h3>
                <p>${desc}</p>
            </div>

            ${a.best_time ? `
            <div class="attr-detail-info-card">
                <i data-lucide="sun"></i>
                <div>
                    <strong>Best Time to Visit</strong>
                    <p>${a.best_time}</p>
                </div>
            </div>
            ` : ''}

            <div class="full-attr-actions">
                <button class="btn-big btn-primary" onclick="window.open('${a.maps_link}', '_blank')">
                    <i data-lucide="map-pin"></i> Start Navigation
                </button>
            </div>
        </div>
    `;

    showView('attraction-detail-view');
    if (window.lucide) window.lucide.createIcons();
}
window.showAttractionDetail = showAttractionDetail;

// ═══════════════════════════════════════
//  RENDERERS
// ═══════════════════════════════════════
function renderStations() {
  const el = document.getElementById("stations-content");
  if (!el || el.dataset.rendered) return;
  el.dataset.rendered = "1";

  let html = "";
  Object.values(metroData).forEach((line) => {
    html += `<div class="section-label" style="display:flex;align-items:center;gap:8px"><span style="width:10px;height:10px;border-radius:50%;background:${line.color}"></span>${T_STATION(line.name)}</div>`;
    line.stations.forEach((s, i) => {
      const isFirst = i === 0,
        isLast = i === line.stations.length - 1;
      const dotClass = isFirst ? "first" : isLast ? "last" : "mid";
      const hi = stationTranslations[s.name]?.hi || "";
      html += `<div class="stn-card" onclick="showStationInfo('${s.name}')"><span class="stn-dot ${dotClass}"></span><div><div class="stn-name">${T_STATION(s.name)}</div><div class="stn-name-hi">${hi}</div></div><i data-lucide="chevron-right" class="w-16 h-16 muted" style="margin-left:auto; opacity:0.5"></i></div>`;
    });
  });
  el.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

function renderExplore() {
  const el = document.getElementById("explore-content");
  if (!el || el.dataset.rendered) return;
  el.dataset.rendered = "1";

  let html = "";
  const stations = metroData.pink.stations;

  html = stations
    .map((s) => {
      const attrs = stationAttractions[s.name] || [];
      const count = attrs.length;
      const hi = stationTranslations[s.name]?.hi || "";

      // Pick first attraction image for the station card if available
      const thumb = count > 0 ? attrs[0].image : "assets/images/logo1.png";

      return `
            <div class="card station-explore-card" onclick="showExploreDetail('${s.name}')">
                <div class="explore-card-img">
                    <img src="${thumb}" alt="${s.name}" class="explore-thumb">
                    <div class="explore-badge">${count} ${T("places")}</div>
                </div>
                <div class="explore-card-body">
                    <div class="explore-card-title">${T_STATION(s.name)}</div>
                    <div class="explore-card-sub">${hi}</div>
                    <div class="explore-card-action">Explore Nearby <i data-lucide="chevron-right" class="w-14 h-14"></i></div>
                </div>
            </div>
        `;
    })
    .join("");

  el.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

function renderTimings() {
  const el = document.getElementById("timings-content");
  if (!el || el.dataset.rendered) return;
  el.dataset.rendered = "1";

  el.innerHTML = `
        <div class="info-row">
            <div class="info-cell"><div class="info-label">First Train</div><div class="info-value">5:50 AM</div></div>
            <div class="info-cell"><div class="info-label">Last Train</div><div class="info-value">11:00 PM</div></div>
            <div class="info-cell"><div class="info-label">Frequency</div><div class="info-value">7-10 min</div></div>
        </div>
        <div class="section-label">Peak Hours</div>
        <table class="timetable">
            <thead><tr><th>Period</th><th>Time</th><th>Frequency</th></tr></thead>
            <tbody>
                <tr><td>Morning Peak</td><td>8:00 – 10:00 AM</td><td>5–7 min</td></tr>
                <tr><td>Midday</td><td>10:00 AM – 5:00 PM</td><td>8–10 min</td></tr>
                <tr><td>Evening Peak</td><td>5:00 – 8:00 PM</td><td>5–7 min</td></tr>
                <tr><td>Night</td><td>8:00 – 11:00 PM</td><td>10–15 min</td></tr>
            </tbody>
        </table>
        <div class="section-label">Station-wise First / Last Train</div>
        <table class="timetable">
            <thead><tr><th>Station</th><th>First ↓</th><th>First ↑</th></tr></thead>
            <tbody>
                <tr><td>Mansarovar</td><td>5:50 AM</td><td>6:10 AM</td></tr>
                <tr><td>Sindhi Camp</td><td>6:04 AM</td><td>5:56 AM</td></tr>
                <tr><td>Badi Chaupar</td><td>6:10 AM</td><td>5:50 AM</td></tr>
            </tbody>
        </table>
        <p class="disclaimer">Timings are approximate · Verify at station</p>`;
}

function renderSafety() {
  const el = document.getElementById("safety-content");
  if (!el || el.dataset.rendered) return;
  el.dataset.rendered = "1";

  let html = '<div class="section-label">Emergency Contacts</div>';
  safetyData.emergencyNumbers.forEach((c) => {
    const name = currentLang === "hi" ? c.nameHi : c.name;
    html += `<a href="tel:${c.number}" class="contact-card"><div class="contact-icon"><i data-lucide="phone" class="w-18 h-18"></i></div><div><div class="contact-name">${name}</div><div class="contact-num">${c.number}</div></div><span class="contact-badge">${c.available}</span></a>`;
  });

  html += `
        <div class="section-label">Metro Info</div>
        <div class="info-row">
            <div class="info-cell"><div class="info-label">First Train</div><div class="info-value">5:50 AM</div></div>
            <div class="info-cell"><div class="info-label">Last Train</div><div class="info-value">11:00 PM</div></div>
            <div class="info-cell"><div class="info-label">Frequency</div><div class="info-value">7–10 min</div></div>
        </div>
        <div class="section-label">Travel Tips</div>
        <div class="card" style="font-size:13px;color:var(--text-sub);line-height:1.7">
            <p style="margin-bottom:10px">• Women's coach is the <b>first coach</b> from Mansarovar end</p>
            <p style="margin-bottom:10px">• Keep token ready at exit gates</p>
            <p style="margin-bottom:10px">• No photography inside trains</p>
            <p style="margin-bottom:10px">• Carry water in summer (May–Sept)</p>
            <p>• Prepaid autos available at Railway Station exit</p>
        </div>
        <p class="disclaimer">Unofficial app · Not affiliated with JMRC</p>`;

  el.innerHTML = html;
  if (window.lucide) window.lucide.createIcons();
}

// ═══════════════════════════════════════
//  SIMULATION
// ═══════════════════════════════════════
function makeTimeline(journey) {
  const tl = [];
  let t = 0;
  journey.parts.forEach((part) => {
    part.stations.forEach((s, i) => {
      const travel = i < part.stations.length - 1 ? s.timeToNext || 90 : 0;
      tl.push({
        stationId: s.id,
        stationName: T_STATION(s.name),
        stationNameRaw: s.name,
        arrivalTime: t,
        color: s.color,
        lat: s.lat,
        lon: s.lon,
      });
      t += travel + 30;
    });
  });
  return tl;
}

function startSim(journey) {
  if (!journey) return;
  simulationState.isActive = true;
  simulationState.startTime = Date.now();
  simulationState.timeline = makeTimeline(journey);

  const overlay = document.getElementById("journey-overlay");
  if (overlay) overlay.classList.remove("hidden");

  renderLiveRoute(
    journey,
    document.getElementById("sim-route-list"),
    simulationState,
  );

  const lastP = journey.parts[journey.parts.length - 1];
  const dest = lastP
    ? T_STATION(lastP.stations[lastP.stations.length - 1].name)
    : "";
  const mins = Math.ceil(journey.totalTime / 60);
  const dirEl = document.getElementById("jv-direction");
  const etaEl = document.getElementById("jv-eta");
  if (dirEl) dirEl.textContent = T("towards") + " " + dest;
  if (etaEl) etaEl.textContent = mins + " " + T("minRemaining");

  const loop = () => {
    if (!simulationState.isActive) return;
    const res = updateRouteVisuals(simulationState);

    // Update Attractions Link for current station
    const nbLink = document.getElementById("jv-nearby-link");
    if (nbLink && res.currentStationName) {
      const attrs = stationAttractions[res.currentStationName] || [];
      if (attrs.length > 0) {
        nbLink.textContent = `See nearby (${attrs.length})`;
        nbLink.classList.remove("hidden");
        nbLink.onclick = () => showExploreDetail(res.currentStationName);
      } else {
        nbLink.classList.add("hidden");
      }
    }

    const elapsed = (Date.now() - simulationState.startTime) / 1000;
    const total =
      simulationState.timeline[simulationState.timeline.length - 1]
        ?.arrivalTime || 1;
    const bar = document.getElementById("jv-progress-bar");
    if (bar) bar.style.width = Math.min((elapsed / total) * 100, 100) + "%";
    simulationState.animFrameId = requestAnimationFrame(loop);
  };
  loop();
  if (window.lucide) window.lucide.createIcons();
}

function stopSim() {
  simulationState.isActive = false;
  if (simulationState.animFrameId)
    cancelAnimationFrame(simulationState.animFrameId);
  const overlay = document.getElementById("journey-overlay");
  if (overlay) overlay.classList.add("hidden");
  showView("plan-view");
}

// ═══════════════════════════════════════
//  GEOLOCATION — "I am at..."
// ═══════════════════════════════════════
function locateMe() {
  if (!navigator.geolocation) {
    toast(T("locationUnavailable"));
    return;
  }
  toast(T("detectingLocation"));

  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      let nearest = null;
      let minDist = Infinity;

      Object.values(metroData).forEach((line) => {
        line.stations.forEach((s) => {
          const d = getDistance(lat, lon, s.lat, s.lon);
          if (d < minDist) {
            minDist = d;
            nearest = s;
          }
        });
      });

      if (nearest) {
        // Show distance: meters if < 1km, km otherwise
        const distLabel =
          minDist < 1
            ? `~${Math.round(minDist * 1000)} m`
            : `~${minDist.toFixed(1)} km`;

        const stationName = T_STATION(nearest.name);
        toast(`${T("nearest")}: ${stationName} (${distLabel})`);

        if (startDropdown) startDropdown.select(nearest.id);

        // Use station's pre-verified Maps pin
        const url =
          nearest.maps_link ||
          `https://www.google.com/maps/search/?api=1&query=${nearest.lat},${nearest.lon}`;

        setTimeout(() => {
          showModal({
            title: T("navigate"),
            body: `${T("navigateModalBody")} <b>${stationName}</b> ${T("metroStation")}<br>
                           <small style="color:var(--text-muted);font-size:12px">${distLabel} ${T("away")}</small>`,
            confirmText: T("openMaps"),
            cancelText: T("cancel"),
            onConfirm: () => window.open(url, "_blank"),
          });
        }, 500);
      } else {
        toast(T("noNearbyStation"));
      }
    },
    (err) => {
      if (err.code === 1) toast(T("locAccessDenied"));
      else if (err.code === 2) toast(T("locationUnavailable"));
      else toast(T("locationTimeout"));
    },
    { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 },
  );
}

// ═══════════════════════════════════════
//  FARE CALCULATOR
// ═══════════════════════════════════════
function showFareCalc() {
  const sv = document.getElementById("start-station")?.value;
  const ev = document.getElementById("end-station")?.value;
  if (!sv || !ev) {
    toast(T("selectBothStations"));
    return;
  }
  if (sv === ev) {
    toast(T("startAndEndDifferent"));
    return;
  }
  const j = calcJourney(sv, ev);
  if (j) showResult(j);
  else toast(T("noRouteFound"));
}

// ═══════════════════════════════════════
//  INIT
// ═══════════════════════════════════════
function init() {
  console.log("JaipurRide: Starting...");
  buildGraph();

  // Theme
  setTheme(currentTheme);

  // Dropdowns
  startDropdown = new CustomDropdown(
    "start-station-container",
    "fromPlaceholder",
    "start",
    (val) => {
      const el = document.getElementById("start-station");
      if (el) el.value = val;
    },
  );
  endDropdown = new CustomDropdown(
    "end-station-container",
    "toPlaceholder",
    "end",
    (val) => {
      const el = document.getElementById("end-station");
      if (el) el.value = val;
    },
  );

  // Language
  setLanguage(currentLang);

  // Wire everything
  wire();

  // Clock
  setInterval(() => {
    const now = new Date();
    const el = document.getElementById("live-clock");
    if (el)
      el.textContent = now
        .toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .toUpperCase();
    const jvC = document.getElementById("jv-clock");
    if (jvC)
      jvC.textContent = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
  }, 1000);

  if (window.lucide) window.lucide.createIcons();
  console.log("JaipurRide: Ready!");
}

function wire() {
  // Theme
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn)
    themeBtn.addEventListener("click", () =>
      setTheme(currentTheme === "light" ? "dark" : "light"),
    );

  // Lang
  const langBtn = document.getElementById("lang-toggle");
  if (langBtn)
    langBtn.addEventListener("click", () => {
      const next = currentLang === "en" ? "hi" : "en";
      setLanguage(next);
      langBtn.textContent = next.toUpperCase();
    });

  // Swap
  const swapBtn = document.getElementById("swap-stations-btn");
  if (swapBtn)
    swapBtn.addEventListener("click", () => {
      if (!startDropdown || !endDropdown) return;
      const s = startDropdown.selectedValue,
        e = endDropdown.selectedValue;
      if (s && e) {
        startDropdown.select(e);
        endDropdown.select(s);
        document.getElementById("start-station").value = e;
        document.getElementById("end-station").value = s;
      }
    });

  // Find route
  const findBtn = document.getElementById("find-route-btn");
  if (findBtn)
    findBtn.addEventListener("click", () => {
      const sv = document.getElementById("start-station")?.value;
      const ev = document.getElementById("end-station")?.value;
      if (!sv || !ev) {
        toast(T("selectBothStations"));
        return;
      }
      if (sv === ev) {
        toast(T("startAndEndDifferent"));
        return;
      }
      const j = calcJourney(sv, ev);
      if (j) showResult(j);
      else toast(T("noRouteFound"));
    });

  // Back from results
  const backBtn = document.getElementById("results-back");
  if (backBtn) backBtn.addEventListener("click", () => showView("plan-view"));

  const infoBackBtn = document.getElementById("info-back");
  if (infoBackBtn)
    infoBackBtn.addEventListener("click", () => {
      showView("stations-view");
    });

  const expDetailBackBtn = document.getElementById("explore-detail-back");
  if (expDetailBackBtn)
    expDetailBackBtn.addEventListener("click", () => {
      showView("explore-view");
    });

  const attrDetailBackBtn = document.getElementById("attr-detail-back");
  if (attrDetailBackBtn)
    attrDetailBackBtn.addEventListener("click", () => {
      showView("explore-detail-view");
    });

  // Board train
  const boardBtn = document.getElementById("board-train-btn");
  if (boardBtn)
    boardBtn.addEventListener("click", () => {
      if (currentJourney) startSim(currentJourney);
    });

  // Exit journey
  const exitBtn = document.getElementById("exit-journey-btn");
  if (exitBtn) exitBtn.addEventListener("click", stopSim);

  // Bottom nav
  document.querySelectorAll(".nav-item[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => showView(btn.dataset.view));
  });

  // Quick links
  const ql = {
    "ql-fare": showFareCalc,
    "ql-timings": () => showView("timings-view"),
    "ql-map": () => showView("stations-view"),
    "ql-safety": () => showView("safety-view"),
    "ql-explore": () => showView("explore-view"),
  };
  Object.entries(ql).forEach(([id, fn]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", fn);
  });

  // Locate me
  const locBtn = document.getElementById("locate-me-btn");
  if (locBtn) locBtn.addEventListener("click", locateMe);
}

document.addEventListener("DOMContentLoaded", init);
