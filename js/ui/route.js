import { T, T_STATION, formatTime } from '../main.js';
import { stationAttractions } from '../data/stationAttractions.js';

export function renderLiveRoute(journey, routeListElement, simulationState) {
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

            html += `
                <li id="station-li-${idx}" data-station-id="${s.id}" class="station-item-dark line-pink">
                    <div class="station-dot"></div>
                    <div class="station-content">
                        <div class="station-name">${name}</div>
                        ${meta}
                        ${stationAttractions[s.name] ? `<div class="attractions-link" onclick="showStationDetail('${s.name}')"><i data-lucide="sparkles" class="w-12 h-12"></i> ${stationAttractions[s.name].length} nearby</div>` : ''}
                    </div>
                </li>`;
            idx++;
        });
    });

    routeListElement.innerHTML = html;
    if (window.lucide) window.lucide.createIcons();
}

export function updateRouteVisuals(simulationState) {
    if (!simulationState.isActive || !simulationState.timeline) return {};

    const elapsed = (Date.now() - simulationState.startTime) / 1000;
    const timeline = simulationState.timeline;
    let activeIdx = 0;
    for (let i = 0; i < timeline.length; i++) {
        if (elapsed >= timeline[i].arrivalTime) activeIdx = i;
        else break;
    }

    const currentId = timeline[activeIdx]?.stationId;
    const items = document.querySelectorAll('.station-item-dark');
    let found = false;

    items.forEach(item => {
        const id = item.getAttribute('data-station-id');
        if (id === currentId && !found) {
            item.classList.add('current');
            item.classList.remove('completed');
            found = true;
        } else if (found) {
            item.classList.remove('current', 'completed');
        } else {
            item.classList.add('completed');
            item.classList.remove('current');
        }
    });

    return {
        currentStationName: timeline[activeIdx]?.stationNameRaw, // Need to add raw name to timeline
        nextStationName: timeline[activeIdx + 1]?.stationName,
        arrived: elapsed >= timeline[timeline.length - 1].arrivalTime
    };
}
