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
import {
  isNative,
  hideSplashScreen,
  setStatusBarStyle,
  onBackButton,
  exitApp,
  watchPosition as nativeWatchPosition,
  getCurrentPosition as nativeGetCurrentPosition,
  checkLocationPermission,
  requestLocationPermission,
  hapticImpact,
  onNetworkChange,
  getNetworkStatus,
  openAppSettings,
} from "./native-bridge.js";

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
  userLocation: null,
  watchId: null,
  lastGpsIdx: undefined,
  trackPoints: null,
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
  // Sync Android status bar with theme
  setStatusBarStyle(theme === "dark");
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
    if (activeView.id === "station-info-view" && window.lastSelectedStation) {
      showStationInfo(window.lastSelectedStation);
    }
    if (activeView.id === "attraction-detail-view" && window.lastSelectedStation && window.lastSelectedAttrId) {
      showAttractionDetail(window.lastSelectedStation, window.lastSelectedAttrId);
    }
  }
}

window.lastExploreStation = null;
window.lastSelectedStation = null;
window.lastSelectedAttrId = null;

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
                <div class="top-nearby-title" style="font-weight:800">${T_STATION(top.name)}</div>
                <div class="top-nearby-sub">${top.distance_km} km · ${top.walk_time_min} min walk</div>
                <div class="btn-navigate-small" style="margin-top:8px; padding:4px 12px; font-size:11px">
                    <i data-lucide="map-pin"></i> Navigate
                </div>
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
    window.lastSelectedStation = stationName;
    const meta = stationsMeta.find(m => m.name === stationName) || {};
    const header = document.getElementById('station-info-header');
    const facilitiesEl = document.getElementById('info-facilities');
    const connectivityEl = document.getElementById('info-connectivity');
    const metroInfoEl = document.getElementById('info-metro');

    if (!header) return;

    // Clean header
    header.style.background = '';
    header.style.backgroundImage = 'none';
    
    header.innerHTML = `
        <div class="hero-line-badge" style="background:var(--accent-soft); color:var(--accent)">${meta.line || 'Pink Line'} • ${meta.code || ''}</div>
        <h2 style="color:var(--text)">${T_STATION(stationName)}</h2>
        ${currentLang === 'en' ? `<div class="stn-hi-title" style="color:var(--text-muted)">${meta.name_hi || ''}</div>` : ''}
        <p style="color:var(--text-sub)">${T(meta.type?.toLowerCase() || 'elevated')} ${T('metroStation')}</p>
    `;

    // Facilities Helper
    const tFac = (f) => {
        if (currentLang === 'en') return f;
        const map = {
            'Toilets': 'शौचालय',
            'Escalator': 'एस्केलेटर',
            'Elevator': 'लिफ्ट',
            'Ticket Counter': 'टिकट काउंटर',
            'Smart Card Recharge': 'स्मार्ट कार्ड रिचार्ज',
            'Wheelchair Access': 'व्हीलचेयर एक्सेस',
            'Parking': 'पार्किंग'
        };
        let res = f;
        for (let key in map) {
            if (res.includes(key)) res = res.replace(key, map[key]);
        }
        return res;
    };

    // Connectivity Helper
    const tConn = (c) => {
        if (currentLang === 'en') return c;
        let res = c;
        
        // Translate known landmarks/stations mentioned in the string
        for (let name in stationTranslations) {
            if (res.includes(name)) {
                res = res.replace(name, stationTranslations[name].hi);
            }
        }

        const map = {
            'Bus stop nearby': 'निकटतम बस स्टॉप',
            'Bus stop': 'बस स्टॉप',
            'Auto rickshaw stands': 'ऑटो रिक्शा स्टैंड',
            'Auto rickshaw': 'ऑटो रिक्शा',
            'Taxi / Cab': 'टैक्सी / कैब',
            'Taxi pickup': 'टैक्सी पिकअप',
            'Taxi': 'टैक्सी',
            'Cab': 'कैब',
            'Walking access to': 'पैदल रास्ता:',
            'Cycle/Bike parking': 'साइकिल/बाइक पार्किंग',
            'Cycle parking': 'साइकिल पार्किंग',
            'Bike parking': 'बाइक पार्किंग',
            'Last-mile autos': 'लास्ट-माइल ऑटो',
            'Local buses': 'स्थानीय बसें'
        };
        
        const sortedKeys = Object.keys(map).sort((a,b) => b.length - a.length);
        for (let key of sortedKeys) {
            if (res.includes(key)) res = res.replace(key, map[key]);
        }
        return res;
    }

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
            return `<div class="tag-badge"><i data-lucide="${icon}" class="w-12 h-12"></i> ${tFac(f)}</div>`;
        }).join('') || `<p class="muted">${T('infoUnavailable')}</p>`;
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
            return `<div class="tag-badge connectivity-tag"><i data-lucide="${icon}" class="w-12 h-12"></i> ${tConn(c)}</div>`;
        }).join('') || `<p class="muted">${T('infoUnavailable')}</p>`;
    }

    // Metro Travel Info
    if (metroInfoEl) {
        const info = meta.metroInfo || {};
        const items = [
            { label: T('line'), value: currentLang === 'hi' ? 'पिंक लाइन' : 'Pink Line' },
            { label: T('stationType'), value: T(meta.type?.toLowerCase() || 'elevated') },
            { label: T('platforms'), value: meta.platforms || '2' },
            { label: T('opened'), value: info.opened || '2015' },
            { label: T('operator'), value: info.operator || 'JMRC' }
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

    // Clean header
    header.style.background = '';
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
                        <div class="meta-item"><i data-lucide="clock"></i> ${Math.round(a.walk_time_min || (a.distance_km * 12))} ${T('walkTime')}</div>
                    </div>
                    <div class="attr-card-actions">
                        <button class="btn-navigate-small" onclick="event.stopPropagation(); window.open('${a.maps_link}', '_blank')">
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
    window.lastSelectedStation = stationName;
    window.lastSelectedAttrId = attrId;
    const list = stationAttractions[stationName] || [];
    const a = list.find(it => it.id === attrId);
    if (!a) return;

    const content = document.getElementById('attr-detail-content');
    if (!content) return;

    const name = currentLang === 'hi' && a.nameHi ? a.nameHi : a.name;
    const desc = currentLang === 'hi' && a.descriptionHi ? a.descriptionHi : a.description;
    const history = currentLang === 'hi' && a.historyHi ? a.historyHi : a.history;
    const type = currentLang === 'hi' && a.typeHi ? a.typeHi : a.type;
    const fee = currentLang === 'hi' && a.entry_feeHi ? a.entry_feeHi : a.entry_fee;
    const best = currentLang === 'hi' && a.best_timeHi ? a.best_timeHi : a.best_time;

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
                <div class="q-meta-item"><i data-lucide="clock"></i> <span>${Math.round(a.walk_time_min || (a.distance_km * 12))} ${T('walkTime')}</span></div>
                ${fee ? `<div class="q-meta-item"><i data-lucide="ticket"></i> <span>${fee}</span></div>` : ''}
            </div>

            <div class="attr-detail-text">
                <h3><i data-lucide="info"></i> ${T('about')}</h3>
                <p>${desc}</p>
            </div>

            ${history ? `
            <div class="attr-detail-text">
                <h3><i data-lucide="history"></i> ${T('history')}</h3>
                <p>${history}</p>
            </div>
            ` : ''}

            ${best ? `
            <div class="attr-detail-info-card">
                <i data-lucide="sun"></i>
                <div>
                    <strong>${T('bestTime')}</strong>
                    <p>${best}</p>
                </div>
            </div>
            ` : ''}

            ${fee ? `
            <div class="attr-detail-info-card">
                <i data-lucide="banknote"></i>
                <div>
                    <strong>${T('entryFee')}</strong>
                    <p>${fee}</p>
                </div>
            </div>
            ` : ''}

            <div class="full-attr-actions">
                <button class="btn-navigate" onclick="window.open('${a.maps_link}', '_blank')">
                    <i data-lucide="map-pin"></i> ${T('navigate')}
                </button>
            </div>
        </div>
    `;

    showView('attraction-detail-view');
    if (window.lucide) window.lucide.createIcons();
}
window.showAttractionDetail = showAttractionDetail;

function showNearbyPopup(stationName) {
  const modal = document.getElementById("nearby-popup-modal");
  const titleEl = document.getElementById("nearby-popup-title");
  const bodyEl = document.getElementById("nearby-popup-body");
  if (!modal || !titleEl || !bodyEl) return;

  const attrs = stationAttractions[stationName] || [];
  titleEl.textContent = `${T("nearbyAttractions")} - ${T_STATION(stationName)}`;

  if (attrs.length === 0) {
    bodyEl.innerHTML = `<p class="no-attractions">${T("noAttractions")}</p>`;
  } else {
    bodyEl.innerHTML = attrs.map(a => {
      const name = currentLang === 'hi' && a.nameHi ? a.nameHi : a.name;
      const type = currentLang === 'hi' && a.typeHi ? a.typeHi : a.type;
      const desc = currentLang === 'hi' && a.summaryHi ? a.summaryHi : (a.summary || a.description || '');
      
      const timeVal = a.walk_time_min 
        ? `${a.walk_time_min} ${T('walkTime')}`
        : (a.approx_drive_time_min ? `${a.approx_drive_time_min} min drive` : '');

      return `
        <div class="popup-attr-card">
            <div class="popup-attr-img-container">
                <img src="${a.image}" class="popup-attr-img" alt="${name}" onerror="this.src='assets/images/logo1.png'">
                <div class="popup-attr-type-badge">${type}</div>
            </div>
            <div class="popup-attr-body">
                <h4 class="popup-attr-name">${name}</h4>
                <div class="popup-attr-meta">
                    <span class="popup-meta-item"><i data-lucide="navigation"></i> ${a.distance_km} km</span>
                    ${timeVal ? `<span class="popup-meta-item"><i data-lucide="clock"></i> ${timeVal}</span>` : ''}
                </div>
                <p class="popup-attr-desc">${desc}</p>
                <div class="popup-attr-actions">
                    <button class="btn-navigate-small" onclick="window.open('${a.maps_link}', '_blank')">
                        <i data-lucide="map-pin"></i> ${T('navigate')}
                    </button>
                    <button class="btn-navigate-small" style="background:var(--accent-soft); color:var(--accent) !important; box-shadow:none;" onclick="showAttractionFullDetail('${stationName}', '${a.id}')">
                        <i data-lucide="info"></i> ${currentLang === 'hi' ? 'विवरण' : 'Details'}
                    </button>
                </div>
            </div>
        </div>
      `;
    }).join('');
  }

  modal.classList.remove("hidden");
  if (window.lucide) window.lucide.createIcons();
}
window.showNearbyPopup = showNearbyPopup;

function showAttractionFullDetail(stationName, attrId) {
  const modal = document.getElementById("nearby-popup-modal");
  if (modal) modal.classList.add("hidden");

  const overlay = document.getElementById("journey-overlay");
  if (overlay) overlay.classList.add("hidden");

  showAttractionDetail(stationName, attrId);
}
window.showAttractionFullDetail = showAttractionFullDetail;

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

function interpolatePoints(lat1, lon1, lat2, lon2, stepMeters = 15) {
  const points = [];
  const R = 6371000; // Earth radius in meters

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const lat1Rad = (lat1 * Math.PI) / 180;
  const lat2Rad = (lat2 * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const totalDist = R * c;

  const numSteps = Math.max(1, Math.floor(totalDist / stepMeters));

  for (let i = 0; i <= numSteps; i++) {
    const fraction = i / numSteps;
    const lat = lat1 + (lat2 - lat1) * fraction;
    const lon = lon1 + (lon2 - lon1) * fraction;

    points.push({
      lat,
      lon,
      fraction,
      distance: fraction * totalDist,
    });
  }
  return { points, totalDist };
}

function buildTrackPoints(journey) {
  const track = [];
  let cumulativeDist = 0;

  const stations = [];
  journey.parts.forEach((part) => {
    part.stations.forEach((s) => {
      if (stations.length === 0 || stations[stations.length - 1].id !== s.id) {
        stations.push(s);
      }
    });
  });

  for (let i = 0; i < stations.length - 1; i++) {
    const sA = stations[i];
    const sB = stations[i + 1];

    const { points, totalDist } = interpolatePoints(sA.lat, sA.lon, sB.lat, sB.lon, 15);

    points.forEach((p) => {
      track.push({
        lat: p.lat,
        lon: p.lon,
        segmentId: `${sA.id}-${sB.id}`,
        segmentStartName: sA.name,
        segmentEndName: sB.name,
        segmentStartIndex: i,
        segmentEndIndex: i + 1,
        segmentFraction: p.fraction,
        distanceAlongSegment: p.distance,
        distanceAlongTrack: cumulativeDist + p.distance,
      });
    });
    cumulativeDist += totalDist;
  }
  return { track, totalDistance: cumulativeDist };
}

function startSim(journey) {
  if (!journey) return;

  // Clear any existing active GPS watch to prevent duplicate watchers and battery drain
  if (simulationState.watchId !== null) {
    if (simulationState.watchId.clear) {
      simulationState.watchId.clear();
    } else if (navigator.geolocation) {
      navigator.geolocation.clearWatch(simulationState.watchId);
    }
    simulationState.watchId = null;
  }
  if (simulationState.animFrameId) {
    cancelAnimationFrame(simulationState.animFrameId);
    simulationState.animFrameId = null;
  }

  const nearbyModal = document.getElementById("nearby-popup-modal");
  if (nearbyModal) nearbyModal.classList.add("hidden");

  const activeBar = document.getElementById("active-journey-bar");
  if (activeBar) activeBar.classList.add("hidden");

  simulationState.isActive = true;
  simulationState.startTime = Date.now();
  simulationState.timeline = makeTimeline(journey);
  simulationState.trackPoints = buildTrackPoints(journey).track;
  simulationState.userLocation = null;
  simulationState.lastGpsIdx = undefined;

  // Start GPS watching if available (uses native bridge for Capacitor)
  simulationState.watchId = nativeWatchPosition(
    (position) => {
      if (simulationState.isActive) {
        simulationState.userLocation = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
      }
    },
    (error) => {
      console.warn("Live route GPS watch error:", error);
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
  );

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

    // Calculate nearest station automatically using current GPS or active node fallback
    const closestEl = document.getElementById("jv-closest-station");
    if (closestEl) {
      let nearestStn = null;
      let minDist = Infinity;
      const userLoc = simulationState.userLocation;
      
      if (userLoc) {
        Object.values(metroData).forEach((line) => {
          line.stations.forEach((s) => {
            const d = getDistance(userLoc.lat, userLoc.lon, s.lat, s.lon);
            if (d < minDist) {
              minDist = d;
              nearestStn = s;
            }
          });
        });
      }

      if (nearestStn && minDist !== Infinity) {
        const stationName = T_STATION(nearestStn.name);
        const distLabel = minDist < 1
          ? `${Math.round(minDist * 1000)} m`
          : `${minDist.toFixed(1)} km`;
        const walkTimeMin = Math.max(1, Math.round((minDist / 5) * 60));
        
        if (minDist <= 0.05) {
          closestEl.textContent = currentLang === 'hi'
            ? `आप ${stationName} मेट्रो स्टेशन पर हैं`
            : `You are at ${stationName} Metro Station`;
        } else {
          closestEl.textContent = currentLang === 'hi'
            ? `निकटतम: ${stationName} (${distLabel} · पैदल ${walkTimeMin} मिनट)`
            : `Closest: ${stationName} (${distLabel} · ${walkTimeMin} min walk)`;
        }
      } else if (res.currentStationName) {
        // Fallback: show the active node station in simulation mode
        const stationName = T_STATION(res.currentStationName);
        closestEl.textContent = currentLang === 'hi'
          ? `निकटतम: ${stationName}`
          : `Closest: ${stationName}`;
      } else {
        closestEl.textContent = '';
      }
    }

    // Handle arrival detection: show completion modal, trigger haptic feedback, and stop tracking
    if (res.arrived) {
      stopSim();
      hapticImpact('Heavy');
      const lastP = journey.parts[journey.parts.length - 1];
      const destStation = lastP ? lastP.stations[lastP.stations.length - 1] : null;
      const destName = destStation ? T_STATION(destStation.name) : '';
      
      showModal({
        title: currentLang === 'hi' ? 'यात्रा पूर्ण हुई 🎉' : 'Journey Completed 🎉',
        body: `<div style="text-align:center; padding:10px 0;">
                 <i data-lucide="check-circle" style="width:48px; height:48px; color:var(--green); display:block; margin:0 auto 12px;"></i>
                 <strong style="font-size:18px; color:var(--text);">${currentLang === 'hi' ? 'आप अपने गंतव्य पर पहुंच गए हैं!' : 'You have reached your destination!'}</strong>
                 <p style="margin:8px 0 0; font-size:14px; font-weight:700; color:var(--accent);">${destName}</p>
                 <p style="margin:4px 0 0; font-size:12px; color:var(--text-muted);">${currentLang === 'hi' ? 'जयपुर राइड के साथ यात्रा करने के लिए धन्यवाद।' : 'Thank you for traveling with Jaipur Ride.'}</p>
               </div>`,
        confirmText: currentLang === 'hi' ? 'ठीक है' : 'OK',
        cancelText: '',
        onConfirm: () => {}
      });
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Update Attractions Link for current station
    const nbLink = document.getElementById("jv-nearby-link");
    if (nbLink && res.currentStationName && journey) {
      const isStart = res.currentStationName === journey.parts[0].stations[0].name;
      const lastP = journey.parts[journey.parts.length - 1];
      const isEnd = lastP && res.currentStationName === lastP.stations[lastP.stations.length - 1].name;

      const attrs = stationAttractions[res.currentStationName] || [];
      if ((isStart || isEnd) && attrs.length > 0) {
        nbLink.textContent = `See nearby (${attrs.length})`;
        nbLink.classList.remove("hidden");
        nbLink.onclick = () => showNearbyPopup(res.currentStationName);
      } else {
        nbLink.classList.add("hidden");
      }
    }

    const elapsed = (Date.now() - simulationState.startTime) / 1000;
    
    // Update progress bar width dynamically based on hybrid logic
    const bar = document.getElementById("jv-progress-bar");
    if (bar) {
      const pct = res.progressPercent !== undefined ? res.progressPercent : Math.min((elapsed / (simulationState.timeline[simulationState.timeline.length - 1]?.arrivalTime || 1)) * 100, 100);
      bar.style.width = pct + "%";
    }

    // Dynamic remaining time calculation
    let remaining = Math.max(0, Math.ceil((journey.totalTime - elapsed) / 60));
    if (res.remainingTimeSeconds !== undefined) {
      remaining = Math.max(0, Math.ceil(res.remainingTimeSeconds / 60));
    }

    // Update overlay ETA text in real time
    const etaTextEl = document.getElementById("jv-eta");
    if (etaTextEl) {
      etaTextEl.textContent = remaining + " " + T("minRemaining");
    }

    // Manage Floating Active Journey Bar visibility and content
    const overlayEl = document.getElementById("journey-overlay");
    const activeBarEl = document.getElementById("active-journey-bar");
    if (activeBarEl && overlayEl) {
      if (overlayEl.classList.contains("hidden")) {
        const activeSub = document.getElementById("active-journey-sub");
        if (activeSub) {
          const lastP = journey.parts[journey.parts.length - 1];
          const destName = lastP ? T_STATION(lastP.stations[lastP.stations.length - 1].name) : "";
          activeSub.textContent = `${T("towards")} ${destName} • ${remaining} ${T("minRemaining")}`;
        }
        activeBarEl.classList.remove("hidden");
      } else {
        activeBarEl.classList.add("hidden");
      }
    }

    simulationState.animFrameId = requestAnimationFrame(loop);
  };
  loop();
  if (window.lucide) window.lucide.createIcons();
}

function stopSim() {
  simulationState.isActive = false;
  if (simulationState.animFrameId)
    cancelAnimationFrame(simulationState.animFrameId);

  // Clear GPS watch (native bridge compatible)
  if (simulationState.watchId !== null) {
    if (simulationState.watchId.clear) {
      simulationState.watchId.clear();
    } else if (navigator.geolocation) {
      navigator.geolocation.clearWatch(simulationState.watchId);
    }
    simulationState.watchId = null;
  }
  simulationState.userLocation = null;
  simulationState.lastGpsIdx = undefined;

  const overlay = document.getElementById("journey-overlay");
  if (overlay) overlay.classList.add("hidden");

  const nearbyModal = document.getElementById("nearby-popup-modal");
  if (nearbyModal) nearbyModal.classList.add("hidden");

  const activeBar = document.getElementById("active-journey-bar");
  if (activeBar) activeBar.classList.add("hidden");

  showView("plan-view");
}

// ═══════════════════════════════════════
//  GEOLOCATION — Permissions and Helpers
// ═══════════════════════════════════════
async function checkAndRequestLocationPermission() {
  try {
    const perm = await checkLocationPermission();
    if (perm === 'granted') {
      return 'granted';
    }

    if (perm === 'prompt') {
      return new Promise((resolve) => {
        showModal({
          title: currentLang === 'hi' ? 'स्थान अनुमति' : 'Location Permission',
          body: `<div style="text-align:center; padding:10px 0;">
                   <i data-lucide="map-pin" style="width:36px; height:36px; color:var(--accent); display:block; margin:0 auto 12px;"></i>
                   <strong style="font-size:16px; color:var(--text);">${currentLang === 'hi' ? 'जयपुर राइड को स्थान अनुमति चाहिए' : 'JaipurRide needs Location Permission'}</strong>
                   <p style="margin:12px 0 0; font-size:13px; color:var(--text-sub); line-height:1.5;">
                     ${currentLang === 'hi' ? 'जयपुर मेट्रो के निकटतम स्टेशन को खोजने और आपकी यात्रा को लाइव ट्रैक करने के लिए स्थान अनुमति आवश्यक है।' : 'Location permission is required to detect the nearest station and track your live journey on the Jaipur Metro.'}
                   </p>
                 </div>`,
          confirmText: currentLang === 'hi' ? 'अनुमति दें' : 'Allow',
          cancelText: currentLang === 'hi' ? 'रद्द करें' : 'Cancel',
          onConfirm: async () => {
            const reqResult = await requestLocationPermission();
            if (reqResult === 'granted') {
              resolve('granted');
            } else {
              toast(T("locAccessDenied"));
              resolve('denied');
            }
          },
          onCancel: () => {
            resolve('denied');
          }
        });
        if (window.lucide) window.lucide.createIcons();
      });
    }

    if (perm === 'denied') {
      return new Promise((resolve) => {
        showModal({
          title: currentLang === 'hi' ? 'स्थान अनुमति आवश्यक है' : 'Location Permission Required',
          body: `<div style="text-align:center; padding:10px 0;">
                   <i data-lucide="alert-circle" style="width:36px; height:36px; color:var(--accent); display:block; margin:0 auto 12px;"></i>
                   <strong style="font-size:16px; color:var(--text);">${currentLang === 'hi' ? 'अनुमति अस्वीकृत कर दी गई है' : 'Permission is Denied'}</strong>
                   <p style="margin:12px 0 0; font-size:13px; color:var(--text-sub); line-height:1.5;">
                     ${currentLang === 'hi' ? 'यात्रा को ट्रैक करने के लिए कृपया ऐप सेटिंग्स खोलें और स्थान अनुमति सक्षम करें।' : 'Please open App Settings and enable Location permission to track your journey.'}
                   </p>
                 </div>`,
          confirmText: currentLang === 'hi' ? 'सेटिंग्स खोलें' : 'Open Settings',
          cancelText: currentLang === 'hi' ? 'रद्द करें' : 'Cancel',
          onConfirm: async () => {
            await openAppSettings();
            resolve('denied');
          },
          onCancel: () => {
            resolve('denied');
          }
        });
        if (window.lucide) window.lucide.createIcons();
      });
    }
  } catch (err) {
    console.error("Permission flow error:", err);
    return 'denied';
  }
  return 'denied';
}

function locateMe() {
  checkAndRequestLocationPermission().then((status) => {
    if (status === 'granted') {
      triggerRealLocationAccess();
    }
  });
}

async function triggerRealLocationAccess() {
  toast(T("detectingLocation"));

  try {
    const position = await nativeGetCurrentPosition({ enableHighAccuracy: true, timeout: 12000, maximumAge: 0 });
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
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
      const distLabel =
        minDist < 1
          ? `~${Math.round(minDist * 1000)} m`
          : `~${minDist.toFixed(1)} km`;

      const stationName = T_STATION(nearest.name);
      toast(`${T("nearest")}: ${stationName} (${distLabel})`);
      hapticImpact('Medium');

      if (startDropdown) startDropdown.select(nearest.id);

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
  } catch (err) {
    console.error("GPS position error:", err);
    showModal({
      title: currentLang === 'hi' ? 'स्थान त्रुटि' : 'Location Error',
      body: `<div style="text-align:center; padding:10px 0;">
               <i data-lucide="alert-triangle" style="width:36px; height:36px; color:var(--accent); display:block; margin:0 auto 12px;"></i>
               <strong style="font-size:16px; color:var(--text);">${currentLang === 'hi' ? 'जीपीएस/स्थान अक्षम है' : 'GPS / Location is Disabled'}</strong>
               <p style="margin:12px 0 0; font-size:13px; color:var(--text-sub); line-height:1.5;">
                 ${currentLang === 'hi' ? 'कृपया सुनिश्चित करें कि आपका जीपीएस/लोकेशन चालू है और आप हवाई जहाज मोड में नहीं हैं।' : 'Please ensure that your device location/GPS is turned ON and Airplane mode is disabled.'}
               </p>
             </div>`,
      confirmText: currentLang === 'hi' ? 'ठीक है' : 'OK',
      cancelText: '',
      onConfirm: () => {}
    });
    if (window.lucide) window.lucide.createIcons();
  }
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

  // ── Capacitor Native Setup ──
  // Hide splash screen after app is ready
  hideSplashScreen();

  // Handle Android hardware back button
  onBackButton(({ canGoBack }) => {
    const overlay = document.getElementById("journey-overlay");
    const modal = document.getElementById("custom-modal");
    const nearbyModal = document.getElementById("nearby-popup-modal");

    // Close modals first
    if (modal && !modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
      return;
    }
    if (nearbyModal && !nearbyModal.classList.contains("hidden")) {
      nearbyModal.classList.add("hidden");
      return;
    }
    // Close journey overlay
    if (overlay && !overlay.classList.contains("hidden")) {
      stopSim();
      return;
    }
    // Navigate back through views
    const activeView = document.querySelector(".view.active-view");
    if (activeView) {
      const id = activeView.id;
      if (id === "results-view") {
        showView("plan-view");
        return;
      }
      if (id === "station-info-view") {
        showView("stations-view");
        return;
      }
      if (id === "attraction-detail-view") {
        showView("explore-detail-view");
        return;
      }
      if (id === "explore-detail-view") {
        showView("explore-view");
        return;
      }
      // If on a main tab (not plan), go to plan
      if (id !== "plan-view") {
        showView("plan-view");
        return;
      }
    }
    // On plan view — exit app
    exitApp();
  });

  // Monitor network status
  onNetworkChange((status) => {
    if (!status.connected) {
      toast(currentLang === 'hi' ? 'ऑफ़लाइन मोड' : 'You are offline');
    }
  });

  console.log("JaipurRide: Ready!" + (isNative() ? " (Capacitor)" : " (Browser)"));
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
      if (simulationState.isActive) {
        const overlay = document.getElementById("journey-overlay");
        if (overlay) overlay.classList.remove("hidden");
      } else {
        showView("explore-view");
      }
    });

  const attrDetailBackBtn = document.getElementById("attr-detail-back");
  if (attrDetailBackBtn)
    attrDetailBackBtn.addEventListener("click", () => {
      if (simulationState.isActive) {
        const overlay = document.getElementById("journey-overlay");
        if (overlay) overlay.classList.remove("hidden");
      } else {
        showView("explore-detail-view");
      }
    });

  // Board train
  const boardBtn = document.getElementById("board-train-btn");
  if (boardBtn)
    boardBtn.addEventListener("click", async () => {
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
      
      const permStatus = await checkAndRequestLocationPermission();
      if (permStatus !== 'granted') return;

      if (currentJourney) {
        startSim(currentJourney);
      } else {
        const j = calcJourney(sv, ev);
        if (j) {
          showResult(j);
          startSim(j);
        } else {
          toast(T("noRouteFound"));
        }
      }
    });

  // Exit journey
  const exitBtn = document.getElementById("exit-journey-btn");
  if (exitBtn) exitBtn.addEventListener("click", stopSim);

  // Nearby Popup Close and Backdrop Click
  const closeNearbyBtn = document.getElementById("close-nearby-popup");
  if (closeNearbyBtn) {
    closeNearbyBtn.addEventListener("click", () => {
      const modal = document.getElementById("nearby-popup-modal");
      if (modal) modal.classList.add("hidden");
    });
  }
  const nearbyModal = document.getElementById("nearby-popup-modal");
  if (nearbyModal) {
    nearbyModal.addEventListener("click", (e) => {
      if (e.target === nearbyModal) {
        nearbyModal.classList.add("hidden");
      }
    });
  }

  // Active Journey Bar click events
  const activeJourneyBar = document.getElementById("active-journey-bar");
  const activeJourneyBtn = document.getElementById("active-journey-resume-btn");
  const resumeAction = () => {
    const overlay = document.getElementById("journey-overlay");
    if (overlay) overlay.classList.remove("hidden");
    const activeBar = document.getElementById("active-journey-bar");
    if (activeBar) activeBar.classList.add("hidden");
  };
  if (activeJourneyBar) activeJourneyBar.addEventListener("click", resumeAction);
  if (activeJourneyBtn) activeJourneyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    resumeAction();
  });

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

  // Intercept tel: links to prevent native browser pick-an-app prompts on desktop
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[href^='tel:']");
    if (link) {
      e.preventDefault();
      const phoneNum = link.getAttribute("href").replace("tel:", "");
      let contactName = "Helpline";
      const nameEl = link.querySelector(".contact-name");
      if (nameEl) {
        contactName = nameEl.textContent.trim();
      } else {
        const parent = link.closest(".contact-card");
        if (parent) {
          const innerName = parent.querySelector(".contact-name");
          if (innerName) contactName = innerName.textContent.trim();
        }
      }
      
      showModal({
        title: T("notice") || "Notice",
        body: `<div style="text-align:center; padding:10px 0;"><strong style="font-size:18px; color:var(--text);">${contactName}</strong><br><span style="font-size:16px; color:var(--accent); font-weight:700; display:block; margin:8px 0;">${phoneNum}</span><br><p style="margin:0; font-size:13px; color:var(--text-sub);">${currentLang === 'hi' ? 'क्या आप इस नंबर पर कॉल करना चाहते हैं?' : 'Do you want to make a call to this number?'}</p></div>`,
        confirmText: currentLang === 'hi' ? 'कॉल करें' : 'Call',
        cancelText: currentLang === 'hi' ? 'रद्द करें' : 'Cancel',
        onConfirm: () => {
          navigator.clipboard.writeText(phoneNum).then(() => {
            toast(currentLang === 'hi' ? 'नंबर कॉपी किया गया!' : 'Number copied to clipboard!');
          }).catch(() => {});
          window.location.href = `tel:${phoneNum}`;
        }
      });
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
