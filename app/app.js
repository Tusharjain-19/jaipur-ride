/* ─── STATION GPS COORDINATES ───────────────────────────────────────────
   Jaipur Metro Pink Line actual approximate coordinates
   ─────────────────────────────────────────────────────────────────────── */
const STATION_COORDS = {
  JM01: { lat: 26.8535, lng: 75.7483 }, // Mansarovar
  JM02: { lat: 26.8614, lng: 75.7569 }, // New Aatish Market
  JM03: { lat: 26.8658, lng: 75.7626 }, // Vivek Vihar
  JM04: { lat: 26.8707, lng: 75.7681 }, // Shyam Nagar
  JM05: { lat: 26.8769, lng: 75.7754 }, // Ram Nagar Ghat Gate
  JM06: { lat: 26.8840, lng: 75.7837 }, // Civil Lines
  JM07: { lat: 26.9196, lng: 75.7882 }, // Railway Station
  JM08: { lat: 26.9145, lng: 75.7930 }, // Sindhi Camp
  JM09: { lat: 26.9225, lng: 75.8078 }, // Chandpole
  JM10: { lat: 26.9212, lng: 75.8136 }, // Chhoti Chaupar
  JM11: { lat: 26.9200, lng: 75.8183 }, // Badi Chaupar
};

/* ─── STATE ─────────────────────────────────────────────────────────────── */
const state = {
  lang: 'EN', mode: 'COM', tab: 'route',
  from: null, to: null, route: null,
  journeyRoute: null,
  sheet: null,
  tipOpen: null,
  journeyTimer: null, clockTimer: null,
  journeyIndex: 0, journeySecs: 0,
  detailStation: null,
};

/* ─── HELPERS ────────────────────────────────────────────────────────────── */
function t(key) { return T[state.lang][key] || key; }
function sName(s) { return state.lang === 'HI' ? s.nameHi : s.name; }

function calcRoute(fromId, toId) {
  const a = STATIONS.findIndex(s => s.id === fromId);
  const b = STATIONS.findIndex(s => s.id === toId);
  if (a < 0 || b < 0 || a === b) return null;
  const [si, ei] = a < b ? [a, b] : [b, a];
  const stops = STATIONS.slice(si, ei + 1);
  const totalSecs = stops.slice(0,-1).reduce((acc,s) => acc + s.timeToNext, 0);
  const fare = FARE[`${STATIONS[si].zone}-${STATIONS[ei].zone}`] || 10;
  return {
    stops, stopCount: stops.length - 1,
    minutes: Math.round(totalSecs / 60), secs: totalSecs,
    fare, smartFare: Math.round(fare * 0.9),
    forward: a < b,
    direction: a < b ? 'towardsBC' : 'towardsMans',
  };
}

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function fmtDist(km) {
  return km < 1 ? `${Math.round(km*1000)} m` : `${km.toFixed(1)} km`;
}

function now12() {
  return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

/* ─── SVGs ───────────────────────────────────────────────────────────────── */
function chevronSVG(size=16, color='currentColor') {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9,6 15,12 9,18"/></svg>`;
}
function checkSVG(color='#22C55E', size=28) {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round"><polyline points="5,12 9,17 19,7"/></svg>`;
}
function phoneSVG(color='currentColor') {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6,3 C4,3 3,5 3,6 C3,11 8,17 13,19 C15,20 17,20 18,18 L20,16 C20,15 19,14 19,14 L16,12 C15,12 15,13 14,13 C12,13 11,11 11,10 C11,9 12,9 12,8 L10,5 C10,4 8,3 6,3 Z"/></svg>`;
}
function walkSVG() {
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="13" cy="4" r="2"/><path d="M13,6 L12,13 M9,11 L12,9 L15,11 M12,13 L10,18 M12,13 L14,18"/></svg>`;
}
function mapsSVG() {
  return `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12,2 C8.7,2 6,4.7 6,8 C6,13 12,22 12,22 C12,22 18,13 18,8 C18,4.7 15.3,2 12,2 Z"/><circle cx="12" cy="8" r="2.5"/></svg>`;
}

/* ─── ROUTE TAB ──────────────────────────────────────────────────────────── */
function renderRouteTab() {
  document.getElementById('route-eyebrow').textContent = t('eyebrow');
  document.getElementById('route-title').textContent = t('planJourney');
  document.getElementById('route-hint-text').textContent = t('selectHint');
  document.getElementById('nearest-cta-title').textContent = t('nearestTitle') || 'Find Nearest Station';
  document.getElementById('nearest-cta-sub').textContent = t('nearestSub') || 'Use GPS to locate you';

  // From/To labels
  document.getElementById('from-btn').innerHTML = state.from
    ? `<span style="color:var(--ink);font-weight:600;font-size:14px">${sName(state.from)}</span>`
    : `<span class="placeholder-text">${t('from')}</span>`;
  document.getElementById('to-btn').innerHTML = state.to
    ? `<span style="color:var(--ink);font-weight:600;font-size:14px">${sName(state.to)}</span>`
    : `<span class="placeholder-text">${t('to')}</span>`;

  // Clear buttons
  document.getElementById('from-clear').classList.toggle('hidden', !state.from);
  document.getElementById('to-clear').classList.toggle('hidden', !state.to);

  // Tourist chips
  const chipsWrap = document.getElementById('tourist-chips');
  if (state.mode === 'TOUR') {
    chipsWrap.classList.remove('hidden');
    document.getElementById('chips-label').textContent = t('popularTourists');
    document.getElementById('chips-scroll').innerHTML = STATIONS
      .filter(s => s.isTourist)
      .map(s => `<button class="chip" onclick="openDetailView('${s.id}')">${sName(s)}</button>`)
      .join('');
  } else {
    chipsWrap.classList.add('hidden');
  }

  // Route result
  const hint = document.getElementById('route-hint');
  const result = document.getElementById('route-result');
  if (state.route) {
    hint.classList.add('hidden');
    result.classList.remove('hidden');
    result.innerHTML = buildRouteResult(state.route);
  } else {
    result.classList.add('hidden');
    hint.classList.remove('hidden');
  }
}

function buildRouteResult(route) {
  const dir = t(route.direction);
  const stopList = route.stops.map((s, i) => {
    const isFirst = i === 0, isLast = i === route.stops.length - 1;
    const dotCls = isFirst ? 'first' : isLast ? 'last' : 'mid';
    const nameCls = isFirst || isLast ? 'end-stop' : '';
    const badge = isFirst
      ? `<span class="stop-badge badge-board">BOARD</span>`
      : isLast ? `<span class="stop-badge badge-exit">EXIT</span>` : '';
    const topConn = i === 0 ? `<div class="stop-conn top" style="background:transparent"></div>` : `<div class="stop-conn top"></div>`;
    const botConn = i === route.stops.length - 1 ? '' : `<div class="stop-conn bot"></div>`;
    const zone = (isFirst || isLast) ? `<div class="stop-zone">Zone ${s.zone}</div>` : '';
    return `
      <div class="stop-row" onclick="openDetailView('${s.id}')">
        <div class="stop-line-col">
          ${topConn}
          <div class="stop-dot ${dotCls}"></div>
          ${botConn}
        </div>
        <div class="stop-name-col">
          <div class="stop-name-text ${nameCls}">${sName(s)}${badge}</div>
          ${zone}
        </div>
      </div>`;
  }).join('');

  return `
    <div class="fade-up">
      <div class="result-summary">
        <div class="result-dir">${dir}</div>
        <div class="result-route">${sName(route.stops[0])} → ${sName(route.stops.at(-1))}</div>
        <div class="stat-chips">
          <div class="stat-chip"><div class="stat-chip-val">${route.stopCount}</div><div class="stat-chip-lbl">${t('stops')}</div></div>
          <div class="stat-chip"><div class="stat-chip-val">~${route.minutes}m</div><div class="stat-chip-lbl">${t('est')}</div></div>
          <div class="stat-chip"><div class="stat-chip-val">₹${route.fare}</div><div class="stat-chip-lbl">${t('token')}</div></div>
          <div class="stat-chip"><div class="stat-chip-val">₹${route.smartFare}</div><div class="stat-chip-lbl">${t('smartCard')}</div></div>
        </div>
      </div>
      <div class="stops-card">${stopList}</div>
      <button class="start-btn" onclick="startJourney()">
        <div class="start-btn-icon"><svg width="10" height="10" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1"><polygon points="5,3 19,12 5,21"/></svg></div>
        ${t('startJourney')}
      </button>
      <p class="est-disclaimer">${t('estimated')}</p>
    </div>`;
}

/* ─── EXPLORE TAB ────────────────────────────────────────────────────────── */
function renderExploreTab() {
  document.getElementById('explore-title').textContent = t('exploreTitle');
  document.getElementById('explore-sub').textContent = t('exploreSub');
  document.getElementById('explore-label').textContent = t('touristStations');
  document.getElementById('explore-list').innerHTML = STATIONS.filter(s => s.isTourist).map(s => {
    const atts = ATTRACTIONS[s.id] || [];
    const names = atts.map(a => state.lang === 'HI' ? a.nameHi : a.name).join(' · ') || 'Station info available';
    return `
      <div class="explore-card" onclick="openDetailView('${s.id}')">
        <div style="flex:1;min-width:0">
          <div class="explore-station-name">${sName(s)}</div>
          <div class="explore-station-zone">Zone ${s.zone}${s.isInterchange ? ' · Interchange' : ''}</div>
          <div class="explore-atts">${names}</div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:6px;margin-left:12px;flex-shrink:0">
          <div class="explore-badge">${atts.length} ${t('spots')}</div>
          <span style="color:var(--stone-l)">${chevronSVG(14)}</span>
        </div>
      </div>`;
  }).join('');
}

/* ─── STATIONS TAB ───────────────────────────────────────────────────────── */
function renderStationsTab() {
  document.getElementById('stations-title').textContent = t('allStations');
  document.getElementById('stations-sub').textContent = t('stationsSub');
  let prevZone = null;
  document.getElementById('stations-list').innerHTML = STATIONS.map((s, i) => {
    let divider = '';
    if (s.zone !== prevZone) {
      divider = `<div class="zone-divider"><div class="zone-line"></div><span class="zone-label">Zone ${s.zone}</span><div class="zone-line"></div></div>`;
      prevZone = s.zone;
    }
    const dotCls = s.isTerminus ? 'terminus' : s.isInterchange ? 'interchange' : 'regular';
    let meta = [];
    if (s.isInterchange) meta.push(`<span class="meta-interchange">Interchange</span>`);
    if (s.isTourist) meta.push(`<span class="meta-tourist">Tourist Station</span>`);
    if (s.isTerminus) meta.push(`<span>Terminus</span>`);
    return `
      ${divider}
      <div class="stn-row" onclick="openDetailView('${s.id}')">
        <div class="stn-line-col">
          ${i > 0 ? '<div class="stn-conn"></div>' : '<div style="height:10px"></div>'}
          <div class="stn-dot ${dotCls}"></div>
          ${i < STATIONS.length-1 ? '<div class="stn-conn"></div>' : ''}
        </div>
        <div class="stn-info">
          <div class="stn-name">${sName(s)}</div>
          ${meta.length ? `<div class="stn-meta">${meta.join(' · ')}</div>` : ''}
        </div>
        <span style="color:var(--border)">${chevronSVG(14)}</span>
      </div>`;
  }).join('');
}

/* ─── SAFETY TAB ─────────────────────────────────────────────────────────── */
function renderSafetyTab() {
  document.getElementById('safety-title').textContent = t('safetyTitle');
  document.getElementById('safety-sub').textContent = t('safetySub');
  document.getElementById('contacts-label').textContent = t('emergencyContacts');
  document.getElementById('tips-label').textContent = t('travelTips');
  document.getElementById('disclaimer-text').innerHTML = t('disclaimer').replace('\n','<br>');

  const contacts = [
    { name:'Metro Helpline',   nameHi:'मेट्रो हेल्पलाइन',   num:'18001806236' },
    { name:'Tourist Helpline', nameHi:'टूरिस्ट हेल्पलाइन',  num:'1364' },
    { name:'Police',           nameHi:'पुलिस',               num:'100' },
    { name:'Ambulance',        nameHi:'एम्बुलेंस',            num:'108' },
    { name:'Women Helpline',   nameHi:'महिला हेल्पलाइन',    num:'1091' },
  ];
  document.getElementById('contacts-list').innerHTML = contacts.map(c => `
    <a href="tel:${c.num}" class="contact-card">
      <div class="contact-icon">${phoneSVG()}</div>
      <div style="flex:1">
        <div class="contact-name">${state.lang==='HI'?c.nameHi:c.name}</div>
        <div class="contact-num">${c.num}</div>
      </div>
      <div class="contact-avail">24/7</div>
    </a>`).join('');

  const tips = [
    { title:'Auto Rickshaw Fares', titleHi:'ऑटो किराया',       body:'Inside old city ₹30–80. Prepaid autos at Railway Station. Always agree on fare before boarding. ₹100 max within Pink City.' },
    { title:'At Metro Stations',   titleHi:'मेट्रो स्टेशन पर',  body:"Keep token ready at exit gates. Women's coach is the first coach from Mansarovar end. No photography inside trains." },
    { title:'Bazaar Shopping',     titleHi:'बाज़ार में खरीदारी', body:'Bargain to 60% of asking price — it is expected. Avoid touts near Hawa Mahal offering free tours.' },
    { title:'Weather & Health',    titleHi:'मौसम और स्वास्थ्य', body:'Carry water May–September. Best months: October–March. Chemists open until 10 PM near Sindhi Camp.' },
  ];
  document.getElementById('tips-list').innerHTML = tips.map((tip,i) => `
    <div class="tip-card">
      <div class="tip-header" onclick="toggleTip(${i})">
        <span class="tip-title">${state.lang==='HI'?tip.titleHi:tip.title}</span>
        <span class="tip-chevron${state.tipOpen===i?' open':''}">${chevronSVG(16)}</span>
      </div>
      ${state.tipOpen===i?`<div class="tip-body">${tip.body}</div>`:''}
    </div>`).join('');
}

/* ─── LIVE JOURNEY ───────────────────────────────────────────────────────── */
function startJourney() {
  if (!state.route) return;
  state.journeyRoute = state.route;
  state.journeyIndex = 0;
  state.journeySecs = state.route.stops[0].timeToNext;
  // Show journey view
  document.getElementById('journey-view').classList.remove('hidden');
  document.getElementById('main-app').classList.add('hidden');
  document.getElementById('end-journey-label').textContent = t('endJourney');
  renderJourneyBody();
  startJourneyClock();
  startJourneyTimer();
}

function startJourneyClock() {
  const el = document.getElementById('jv-clock');
  clearInterval(state.clockTimer);
  const tick = () => { el.textContent = now12(); };
  tick();
  state.clockTimer = setInterval(tick, 1000);
}

function startJourneyTimer() {
  clearInterval(state.journeyTimer);
  state.journeyTimer = setInterval(() => {
    const route = state.journeyRoute;
    if (!route) { clearInterval(state.journeyTimer); return; }
    if (state.journeyIndex >= route.stops.length - 1) {
      clearInterval(state.journeyTimer);
      renderJourneyBody();
      return;
    }
    state.journeySecs--;
    if (state.journeySecs <= 0) {
      state.journeyIndex = Math.min(state.journeyIndex + 1, route.stops.length - 1);
      state.journeySecs = route.stops[state.journeyIndex]?.timeToNext || 0;
    }
    renderJourneyBody();
  }, 1000);
}

function renderJourneyBody() {
  const route = state.journeyRoute;
  const cur = state.journeyIndex;
  const done = cur >= route.stops.length - 1;
  const pct = Math.round((cur / (route.stops.length - 1)) * 100);
  const curStation = route.stops[cur];
  const nextStation = route.stops[cur + 1];

  // Update ring and direction in status bar
  const ringFill = document.getElementById('jv-ring-fill');
  if (ringFill) {
    const circumference = 100;
    ringFill.setAttribute('stroke-dasharray', `${pct} ${circumference}`);
  }
  const pctEl = document.getElementById('jv-ring-pct');
  if (pctEl) pctEl.textContent = `${pct}%`;

  const dirEl = document.getElementById('jv-direction');
  if (dirEl) dirEl.textContent = t(route.direction);

  const remEl = document.getElementById('jv-time-remaining');
  if (remEl) {
    const totalSecsRemaining = route.stops.slice(cur, -1).reduce((acc,s) => acc + s.timeToNext, 0) + state.journeySecs;
    const minsRem = Math.ceil(totalSecsRemaining / 60);
    remEl.textContent = done ? 'Arrived' : `~${minsRem} min remaining`;
  }

  document.getElementById('simulated-label').textContent = t('simulated');

  if (done) {
    const exits = (EXITS[curStation.id] || []).map(e => {
      const [num, dest] = e.split('→');
      return `<div class="jv-exit-r"><span class="jv-exit-num">${num.trim()}</span><span class="jv-exit-dest">→ ${dest?.trim()}</span></div>`;
    }).join('');
    document.getElementById('journey-body').innerHTML = `
      <div class="jv-arrival fade-up">
        <div class="jv-arrival-circle">${checkSVG('#22C55E', 36)}</div>
        <div class="jv-arrival-title">${t('arrived')}</div>
        <div class="jv-arrival-station">${sName(curStation)}</div>
        ${exits ? `<div class="jv-exit-card"><div class="jv-exit-lbl">${t('exitGuidance')}</div>${exits}</div>` : ''}
        <button class="jv-plan-new" onclick="endJourney()">${t('planNew')}</button>
      </div>`;
    return;
  }

  // Build stop list like the reference image
  const stops = route.stops.map((s, i) => {
    const isPast = i < cur, isCur = i === cur, isFut = i > cur;
    const circCls = isPast ? 'past' : isCur ? 'current' : 'future';
    const nameCls = isPast ? 'past' : isCur ? 'current' : 'future';
    const lineAbove = i > 0 ? `<div class="jv-stop-vert-line ${isPast||isCur?'past':''}" style="flex:none;height:16px"></div>` : '';
    const lineBelow = i < route.stops.length - 1 ? `<div class="jv-stop-vert-line ${isPast?'past':isCur?'current':''}" style="flex:none;height:16px"></div>` : '';

    let extra = '';
    if (i === 0) {
      // First station: show board info
      extra = `<div class="jv-board-tag"><span class="jv-board-tag-text">🚉 Board here · Platform 1</span></div>`;
    } else if (isCur && nextStation) {
      // Current station: show next station ETA
      const s2 = state.journeySecs;
      const m = Math.floor(s2/60), sec = s2%60;
      extra = `<div class="jv-next-tag"><span class="jv-next-tag-text">⏱ Next: ${sName(nextStation)} in ${m}:${String(sec).padStart(2,'0')}</span></div>`;
    } else if (isPast) {
      extra = `<div class="jv-past-check">${checkSVG('#4B5563',13)} Passed</div>`;
    }

    return `
      <div class="jv-stop-item">
        <div class="jv-stop-left">
          ${lineAbove}
          <div class="jv-stop-circle-wrap">
            <div class="jv-stop-circle ${circCls}"></div>
          </div>
          ${lineBelow}
        </div>
        <div class="jv-stop-right">
          <div class="jv-stop-name ${nameCls}">${sName(s)}</div>
          ${(i===0||i===route.stops.length-1)?`<div class="jv-stop-zone">Zone ${s.zone}</div>`:''}
          ${extra}
        </div>
      </div>`;
  }).join('');

  document.getElementById('journey-body').innerHTML = stops;
  // Scroll to current stop
  setTimeout(() => {
    const body = document.getElementById('journey-body');
    const items = body.querySelectorAll('.jv-stop-item');
    if (items[cur]) items[cur].scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, 100);
}

function endJourney() {
  clearInterval(state.journeyTimer);
  clearInterval(state.clockTimer);
  state.journeyRoute = null;
  document.getElementById('journey-view').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
}

/* ─── STATION DETAIL ─────────────────────────────────────────────────────── */
function openDetailView(stationId) {
  const s = STATIONS.find(x => x.id === stationId);
  if (!s) return;
  state.detailStation = s;
  // Badge
  const badge = document.getElementById('tourist-badge');
  badge.classList.toggle('hidden', !s.isTourist);
  if (s.isTourist) badge.textContent = t('touristStation');
  document.getElementById('back-label').textContent = t('back');

  const atts = ATTRACTIONS[s.id] || [];
  const exits = EXITS[s.id] || [];
  let metaParts = [`Zone ${s.zone}`];
  if (s.isTerminus) metaParts.push(`<span class="meta-term">· Terminus</span>`);
  if (s.isInterchange) metaParts.push(`<span class="meta-interchange">· Interchange</span>`);

  const exitsHtml = exits.map(e => {
    const [num, dest] = e.split('→');
    return `<div class="exit-row-d"><span class="exit-num-d">${num.trim()}</span><span class="exit-dests-d">→ ${dest?.trim()}</span></div>`;
  }).join('');

  const attsHtml = atts.map(a => `
    <div class="att-card">
      <div class="att-top">
        <div><div class="att-name">${state.lang==='HI'?a.nameHi:a.name}</div><div class="att-cat">${a.category}</div></div>
        <span class="att-exit-badge">${a.exit}</span>
      </div>
      <div class="att-meta-row">${walkSVG()} ${a.walk} ${t('walk')} &nbsp;·&nbsp; ${a.fee}</div>
      <div class="att-tip">${a.tip}</div>
    </div>`).join('');

  // Google Maps directions link for this station
  const coord = STATION_COORDS[s.id];
  const mapsUrl = coord
    ? `https://www.google.com/maps/dir/?api=1&destination=${coord.lat},${coord.lng}`
    : `https://www.google.com/maps/search/${encodeURIComponent(s.name + ' Jaipur Metro')}`;

  document.getElementById('detail-body').innerHTML = `
    <div class="detail-name">${sName(s)}</div>
    <div class="detail-meta">${metaParts.join(' ')}</div>
    <a href="${mapsUrl}" target="_blank" rel="noopener" class="maps-btn" style="margin-bottom:16px">
      ${mapsSVG()} Get Directions to Station
    </a>
    <div class="info-card">
      <div class="info-card-header">${t('metroInfo')}</div>
      <div class="metro-info-row">
        <div class="metro-info-cell"><div class="metro-info-lbl">${t('first')}</div><div class="metro-info-val">5:50 AM</div></div>
        <div class="metro-info-cell"><div class="metro-info-lbl">${t('last')}</div><div class="metro-info-val">11:00 PM</div></div>
        <div class="metro-info-cell"><div class="metro-info-lbl">${t('freq')}</div><div class="metro-info-val">7–10 min</div></div>
      </div>
    </div>
    ${exits.length ? `<div class="info-card"><div class="info-card-header">${t('exitGuide')}</div>${exitsHtml}</div>` : ''}
    ${atts.length ? `<p class="section-label" style="margin-top:18px;margin-bottom:12px">${t('nearbyAtts')}</p>${attsHtml}` : ''}
    <div class="detail-actions">
      <button class="ghost-btn" onclick="routeFromDetail('from')">${t('fromHere')}</button>
      <button class="primary-btn" onclick="routeFromDetail('to')">${t('toHere')}</button>
    </div>`;

  document.getElementById('detail-view').classList.remove('hidden');
  document.getElementById('main-app').classList.add('hidden');
}

function routeFromDetail(type) {
  const s = state.detailStation;
  if (!s) return;
  if (type === 'from') state.from = s;
  else state.to = s;
  state.route = (state.from && state.to) ? calcRoute(state.from.id, state.to.id) : null;
  closeDetail();
  switchTab('route');
}

function closeDetail() {
  state.detailStation = null;
  document.getElementById('detail-view').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
}

/* ─── NEAREST STATION ────────────────────────────────────────────────────── */
function openNearestView() {
  document.getElementById('nearest-view').classList.remove('hidden');
  document.getElementById('main-app').classList.add('hidden');
  document.getElementById('nearest-body').innerHTML = `
    <div class="nearest-loading">
      <div class="gps-spinner"></div>
      <p class="nearest-status">Accessing your location…</p>
      <p class="nearest-hint">Please allow location access when prompted</p>
    </div>`;

  if (!navigator.geolocation) {
    document.getElementById('nearest-body').innerHTML = `
      <div class="nearest-loading">
        <p class="nearest-status" style="color:var(--saffron)">GPS not supported</p>
        <p class="nearest-hint">Your browser does not support geolocation.</p>
      </div>`;
    return;
  }

  navigator.geolocation.getCurrentPosition(
    pos => renderNearestResult(pos.coords.latitude, pos.coords.longitude),
    err => {
      const msg = err.code === 1 ? 'Location access denied. Please allow in browser settings.' : 'Could not get your location. Try again.';
      document.getElementById('nearest-body').innerHTML = `
        <div class="nearest-loading">
          <p class="nearest-status" style="color:var(--saffron)">Location Error</p>
          <p class="nearest-hint">${msg}</p>
          <button class="primary-btn" style="width:100%;margin-top:20px" onclick="openNearestView()">Try Again</button>
        </div>`;
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
}

function renderNearestResult(userLat, userLng) {
  // Compute distance to all stations
  const sorted = STATIONS.map(s => {
    const coord = STATION_COORDS[s.id];
    const dist = coord ? haversineKm(userLat, userLng, coord.lat, coord.lng) : 999;
    return { ...s, dist };
  }).sort((a, b) => a.dist - b.dist);

  const nearest = sorted[0];
  const coord = STATION_COORDS[nearest.id];
  const mapsDir = coord
    ? `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${coord.lat},${coord.lng}&travelmode=walking`
    : `https://www.google.com/maps/search/${encodeURIComponent(nearest.name + ' Jaipur Metro')}`;

  const allRows = sorted.map((s, i) => {
    const c = STATION_COORDS[s.id];
    const mUrl = c ? `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${c.lat},${c.lng}&travelmode=walking` : '#';
    return `
      <div class="nearest-stn-row">
        ${i===0?`<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--green)" stroke-width="2" stroke-linecap="round"><polyline points="5,12 9,17 19,7"/></svg>`:
                `<span style="font-size:12px;color:var(--stone-l);min-width:16px;text-align:center">#${i+1}</span>`}
        <span class="nearest-stn-dist">${fmtDist(s.dist)}</span>
        <span class="nearest-stn-name">${sName(s)}</span>
        <a href="${mUrl}" target="_blank" rel="noopener" class="nearest-stn-maps">Maps ↗</a>
      </div>`;
  }).join('');

  document.getElementById('nearest-body').innerHTML = `
    <div class="nearest-result fade-up">
      <div class="nearest-dist-badge">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M12,2v3M12,19v3M2,12h3M19,12h3"/></svg>
        ${fmtDist(nearest.dist)} away · nearest station
      </div>
      <div class="nearest-station-name">${sName(nearest)}</div>
      <div class="nearest-station-meta">Zone ${nearest.zone}${nearest.isInterchange ? ' · Interchange' : ''}${nearest.isTourist ? ' · Tourist Station' : ''}</div>
      <div class="nearest-actions">
        <a href="${mapsDir}" target="_blank" rel="noopener" class="maps-btn">
          ${mapsSVG()} Get Walking Directions
        </a>
        <button class="use-as-from-btn" onclick="useNearestAsFrom('${nearest.id}')">
          Set as Starting Station
        </button>
        <button class="ghost-outline-btn" onclick="openDetailView('${nearest.id}');closeNearest()">
          View Station Details
        </button>
      </div>
      <div class="all-stations-nearest">
        <div class="all-stations-header">ALL STATIONS BY DISTANCE</div>
        ${allRows}
      </div>
    </div>`;
}

function useNearestAsFrom(stationId) {
  const s = STATIONS.find(x => x.id === stationId);
  if (s) {
    state.from = s;
    state.route = (state.from && state.to) ? calcRoute(state.from.id, state.to.id) : null;
  }
  closeNearest();
  switchTab('route');
}

function closeNearest() {
  document.getElementById('nearest-view').classList.add('hidden');
  document.getElementById('main-app').classList.remove('hidden');
}

/* ─── STATION SHEET ──────────────────────────────────────────────────────── */
function openSheet(type) {
  state.sheet = type;
  const backdrop = document.getElementById('sheet-backdrop');
  const sheet = document.getElementById('station-sheet');
  backdrop.classList.remove('hidden');
  backdrop.classList.add('backdrop-in');
  sheet.classList.remove('hidden');
  sheet.classList.add('sheet-in');
  const input = document.getElementById('sheet-search');
  input.placeholder = t('search');
  input.value = '';
  buildSheetOptions('');
  setTimeout(() => input.focus(), 80);
}

function closeSheet() {
  document.getElementById('sheet-backdrop').classList.add('hidden');
  document.getElementById('station-sheet').classList.add('hidden');
  state.sheet = null;
}

function buildSheetOptions(query) {
  const exclude = state.sheet === 'from' ? state.to?.id : state.from?.id;
  const q = query.toLowerCase();
  const filtered = STATIONS.filter(s =>
    s.id !== exclude &&
    (s.name.toLowerCase().includes(q) || s.nameHi.includes(query))
  );
  if (!filtered.length) {
    document.getElementById('sheet-list').innerHTML = `<div class="sheet-no-results">No stations found for "${query}"</div>`;
    return;
  }
  document.getElementById('sheet-list').innerHTML = filtered.map(s => {
    const sub = `Zone ${s.zone}${s.isTourist?' · Tourist':''} ${s.isInterchange?'· Interchange':''}`.trim();
    const tag = s.isTourist ? `<span class="sheet-tourist-tag">TOURIST</span>` : '';
    return `
      <div class="sheet-option" onclick="selectStation('${s.id}')">
        <span class="sheet-opt-dot"></span>
        <div style="flex:1;min-width:0">
          <div class="sheet-opt-name">${sName(s)}</div>
          <div class="sheet-opt-sub">${sub}</div>
        </div>
        ${tag}
      </div>`;
  }).join('');
}

function selectStation(id) {
  const s = STATIONS.find(x => x.id === id);
  if (!s) return;
  if (state.sheet === 'from') state.from = s;
  else state.to = s;
  state.route = (state.from && state.to) ? calcRoute(state.from.id, state.to.id) : null;
  closeSheet();
  renderRouteTab();
}

/* ─── CLEAR / SWAP ───────────────────────────────────────────────────────── */
function clearStation(type) {
  if (type === 'from') state.from = null;
  else state.to = null;
  state.route = null;
  renderRouteTab();
}

function swapStations() {
  const tmp = state.from;
  state.from = state.to;
  state.to = tmp;
  state.route = (state.from && state.to) ? calcRoute(state.from.id, state.to.id) : null;
  renderRouteTab();
}

/* ─── NAVIGATION ─────────────────────────────────────────────────────────── */
function switchTab(tab) {
  state.tab = tab;
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active-panel'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById(`tab-${tab}`);
  const navBtn = document.getElementById(`nav-${tab}`);
  if (panel) panel.classList.add('active-panel');
  if (navBtn) navBtn.classList.add('active');
  if (tab === 'route') renderRouteTab();
  if (tab === 'explore') renderExploreTab();
  if (tab === 'stations') renderStationsTab();
  if (tab === 'safety') renderSafetyTab();
}

function toggleTip(i) {
  state.tipOpen = state.tipOpen === i ? null : i;
  renderSafetyTab();
}

/* ─── LANG / MODE ────────────────────────────────────────────────────────── */
function setLang(lang) {
  state.lang = lang;
  document.getElementById('lang-btn').textContent = lang === 'EN' ? 'EN' : 'हि';
  updateNavLabels();
  switchTab(state.tab);
}

function updateNavLabels() {
  ['route','explore','stations','safety'].forEach(id => {
    const el = document.getElementById(`nav-${id}-label`);
    if (el) el.textContent = t(id);
  });
}

function setMode(mode) {
  state.mode = mode;
  document.getElementById('btn-com').classList.toggle('active', mode === 'COM');
  document.getElementById('btn-tour').classList.toggle('active', mode === 'TOUR');
  const exploreNav = document.getElementById('nav-explore');
  if (mode === 'TOUR') {
    exploreNav.classList.remove('hidden');
  } else {
    exploreNav.classList.add('hidden');
    if (state.tab === 'explore') switchTab('route');
  }
  if (state.tab === 'route') renderRouteTab();
}

/* ─── BOOT ───────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Header
  document.getElementById('lang-btn').addEventListener('click', () => setLang(state.lang === 'EN' ? 'HI' : 'EN'));
  document.getElementById('btn-com').addEventListener('click', () => setMode('COM'));
  document.getElementById('btn-tour').addEventListener('click', () => setMode('TOUR'));
  // Inputs
  document.getElementById('from-btn').addEventListener('click', () => openSheet('from'));
  document.getElementById('to-btn').addEventListener('click', () => openSheet('to'));
  document.getElementById('swap-btn').addEventListener('click', swapStations);
  // Nearest
  document.getElementById('nearest-cta-btn').addEventListener('click', openNearestView);
  document.getElementById('back-from-nearest').addEventListener('click', closeNearest);
  // Sheet
  document.getElementById('sheet-backdrop').addEventListener('click', closeSheet);
  document.getElementById('sheet-search').addEventListener('input', e => buildSheetOptions(e.target.value));
  // Detail
  document.getElementById('back-from-detail').addEventListener('click', closeDetail);
  // Journey
  document.getElementById('end-journey-btn').addEventListener('click', endJourney);
  // Bottom nav
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => { if (btn.dataset.tab) switchTab(btn.dataset.tab); });
  });
  // Start
  switchTab('route');
});

// Global refs for inline onclick
window.openDetailView = openDetailView;
window.startJourney = startJourney;
window.endJourney = endJourney;
window.toggleTip = toggleTip;
window.routeFromDetail = routeFromDetail;
window.selectStation = selectStation;
window.clearStation = clearStation;
window.useNearestAsFrom = useNearestAsFrom;
window.closeNearest = closeNearest;
