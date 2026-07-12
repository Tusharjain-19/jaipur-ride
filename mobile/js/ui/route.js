import { T, T_STATION } from '../main.js';
import { stationAttractions } from '../data/stationAttractions.js';

export function renderLiveRoute(journey, routeListElement) {
    if (!routeListElement || !journey) return;
    let html = '';
    let idx = 0;

    journey.parts.forEach((part, pi) => {
        part.stations.forEach((s, si) => {
            const isFirst = (pi === 0 && si === 0);
            const isLast = (pi === journey.parts.length - 1 && si === part.stations.length - 1);
            const name = T_STATION(s.name);
            let meta = '';

            if (isFirst) {
                meta = `<div class="info-strip">${T('boardAt')} ${T('platform')} ${part.startPlatform} <span style="font-size:10px;opacity:.7">(${T('towards')} ${part.journeyDirectionName})</span></div>`;
            } else if (isLast) {
                meta = `<div class="station-meta">${T('arrive')}</div>`;
            }

            const hasAttractions = (isFirst || isLast) && stationAttractions[s.name] && stationAttractions[s.name].length > 0;
            html += `
                <li id="station-li-${idx}" data-station-id="${s.id}" class="station-item-dark line-pink">
                    <div class="station-dot"></div>
                    <div class="station-content" style="display: flex; justify-content: space-between; align-items: center; width: 100%; gap: 16px;">
                        <div class="station-info-stack" style="display: flex; flex-direction: column; gap: 4px; flex: 1; min-width: 0;">
                            <div class="station-name">${name}</div>
                            ${meta}
                        </div>
                        ${hasAttractions ? `<div class="attractions-link" onclick="showNearbyPopup('${s.name}')" style="flex-shrink: 0;"><i data-lucide="sparkles" class="w-12 h-12"></i> ${stationAttractions[s.name].length} nearby</div>` : ''}
                    </div>
                </li>`;
            idx++;
        });
    });

    routeListElement.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
}

export function updateRouteVisuals(routeStations, activeIdx) {
    const items = document.querySelectorAll('.station-item-dark');
    items.forEach((item, idx) => {
        if (activeIdx === undefined || activeIdx === -1) {
            item.classList.remove('current', 'completed');
        } else if (idx < activeIdx) {
            item.classList.add('completed');
            item.classList.remove('current');
        } else if (idx === activeIdx) {
            item.classList.add('current');
            item.classList.remove('completed');
        } else {
            item.classList.remove('current', 'completed');
        }
    });

    const bar = document.getElementById("jv-progress-bar");
    if (bar) {
        if (activeIdx !== undefined && activeIdx !== -1 && routeStations.length > 1) {
            const pct = (activeIdx / (routeStations.length - 1)) * 100;
            bar.style.width = pct + "%";
        } else {
            bar.style.width = "0%";
        }
    }
}
