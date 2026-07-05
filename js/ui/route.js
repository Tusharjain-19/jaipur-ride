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

export function updateRouteVisuals(simulationState) {
    if (!simulationState.isActive || !simulationState.timeline) return {};

    const elapsed = (Date.now() - simulationState.startTime) / 1000;
    const timeline = simulationState.timeline;
    const totalTime = timeline[timeline.length - 1]?.arrivalTime || 1;

    let activeIdx = 0;
    let usingGps = false;

    // 1. Hybrid GPS tracking logic using densified track centerline
    simulationState.currentTrackPt = null;
    if (simulationState.userLocation && simulationState.trackPoints && simulationState.trackPoints.length > 0) {
        const { lat, lon } = simulationState.userLocation;
        let minDistance = Infinity;
        let nearestPt = null;

        // Find the nearest point on our densified track path
        for (let i = 0; i < simulationState.trackPoints.length; i++) {
            const pt = simulationState.trackPoints[i];
            const dist = getDistance(lat, lon, pt.lat, pt.lon); // returns distance in km
            if (dist < minDistance) {
                minDistance = dist;
                nearestPt = pt;
            }
        }

        // If the user is within 1.5 km of our track centerline, snap them to it!
        if (nearestPt && minDistance < 1.5) {
            usingGps = true;
            activeIdx = nearestPt.segmentStartIndex;
            simulationState.currentTrackPt = nearestPt; // Store in state for other indicators if needed

            // Ensure activeIdx only moves forward to prevent jumping backward due to GPS noise
            if (simulationState.lastGpsIdx !== undefined) {
                activeIdx = Math.max(simulationState.lastGpsIdx, activeIdx);
            }
            simulationState.lastGpsIdx = activeIdx;
        }
    } else if (simulationState.userLocation) {
        // Fallback to basic nearest-station GPS if trackPoints is not available
        const { lat, lon } = simulationState.userLocation;
        let minDistance = Infinity;
        let nearestIdx = -1;

        for (let i = 0; i < timeline.length; i++) {
            const node = timeline[i];
            if (node.lat !== undefined && node.lon !== undefined) {
                const dist = getDistance(lat, lon, node.lat, node.lon);
                if (dist < minDistance) {
                    minDistance = dist;
                    nearestIdx = i;
                }
            }
        }

        if (nearestIdx !== -1 && minDistance < 1.5) {
            usingGps = true;
            activeIdx = nearestIdx;
            if (simulationState.lastGpsIdx !== undefined) {
                activeIdx = Math.max(simulationState.lastGpsIdx, activeIdx);
            }
            simulationState.lastGpsIdx = activeIdx;
        }
    }

    // 2. Fallback to timer-based simulation if not using GPS
    if (!usingGps) {
        for (let i = 0; i < timeline.length; i++) {
            if (elapsed >= timeline[i].arrivalTime) {
                activeIdx = i;
            } else {
                break;
            }
        }
    }

    // 3. Calculate remaining travel time in seconds
    let remainingTimeSeconds = 0;
    if (activeIdx >= timeline.length - 1) {
        remainingTimeSeconds = 0;
    } else {
        if (usingGps) {
            const currentStation = timeline[activeIdx];
            const nextStation = timeline[activeIdx + 1];
            const segmentTime = nextStation.arrivalTime - currentStation.arrivalTime;

            let currentSegmentRemaining = segmentTime;
            
            if (simulationState.currentTrackPt && simulationState.currentTrackPt.segmentStartIndex === activeIdx) {
                // Highly accurate remaining time based on densified segment fraction!
                const fraction = simulationState.currentTrackPt.segmentFraction;
                currentSegmentRemaining = (1 - fraction) * segmentTime;
            } else {
                // Fallback to simple distance ratio if not matched perfectly
                const segmentDist = getDistance(currentStation.lat, currentStation.lon, nextStation.lat, nextStation.lon) || 1;
                const userLat = simulationState.userLocation.lat;
                const userLon = simulationState.userLocation.lon;
                const distToNext = getDistance(userLat, userLon, nextStation.lat, nextStation.lon);
                const ratio = Math.min(1, Math.max(0, distToNext / segmentDist));
                currentSegmentRemaining = ratio * segmentTime;
            }

            // Remaining time for future segments
            const futureSegmentsTime = totalTime - nextStation.arrivalTime;
            remainingTimeSeconds = currentSegmentRemaining + futureSegmentsTime;
        } else {
            // Time remaining based on timeline
            remainingTimeSeconds = Math.max(0, totalTime - elapsed);
        }
    }

    // 4. Calculate progress percentage
    let progressPercent = 0;
    if (totalTime > 0) {
        if (usingGps) {
            progressPercent = Math.min(100, Math.max(0, ((totalTime - remainingTimeSeconds) / totalTime) * 100));
        } else {
            progressPercent = Math.min(100, Math.max(0, (elapsed / totalTime) * 100));
        }
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
        currentStationName: timeline[activeIdx]?.stationNameRaw,
        nextStationName: timeline[activeIdx + 1]?.stationName,
        arrived: activeIdx >= timeline.length - 1,
        progressPercent,
        remainingTimeSeconds
    };
}
