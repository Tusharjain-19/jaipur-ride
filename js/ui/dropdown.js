import { metroData, stationTranslations } from '../data/stations.js';
import { stationAttractions } from '../data/stationAttractions.js';

export class CustomDropdown {
    constructor(containerId, placeholder, type, onChangeCallback) {
        this.container = document.getElementById(containerId);
        if (!this.container) { console.error('Dropdown container not found:', containerId); return; }
        this.placeholderKey = placeholder; // Treat as key
        this.type = type;
        this.onChange = onChangeCallback;
        this.stations = [];
        this.filteredStations = [];
        this.selectedValue = null;
        this.isOpen = false;

        this.initData();
        this.render();
        this.attachEventListeners();
    }

    initData() {
        const allStations = [];
        const seen = new Set();
        Object.values(metroData).forEach(line => {
            if (!line.stations) return;
            line.stations.forEach(station => {
                if (!seen.has(station.name)) {
                    const lines = [];
                    Object.values(metroData).forEach(l => {
                        if (l.stations && l.stations.some(s => s.name === station.name)) {
                            lines.push(l.color);
                        }
                    });
                    allStations.push({ id: station.id, name: station.name, lines });
                    seen.add(station.name);
                }
            });
        });
        this.stations = allStations.sort((a, b) => a.name.localeCompare(b.name));
        this.filteredStations = [...this.stations];
    }

    render() {
        const getT = (k) => typeof window.T === 'function' ? window.T(k) : k;
        const dispPlaceholder = this.selectedValue ? document.getElementById(`selected-${this.container.id}`).textContent : getT(this.placeholderKey);
        const dotColor = this.type === 'start' ? '#22C55E' : '#EC4899';

        this.container.innerHTML = `
            <div class="custom-dropdown" style="position:relative;width:100%;">
                <div class="dropdown-trigger" id="trigger-${this.container.id}" tabindex="0">
                    <span class="flex items-center gap-12 overflow-hidden" style="flex-grow:1;">
                        <span class="trigger-dots flex gap-4 shrink-0" id="dots-${this.container.id}">
                            <span style="width:10px;height:10px;border-radius:50%;display:inline-block;background:${dotColor}"></span>
                        </span>
                        <span id="selected-${this.container.id}" class="text-stone font-medium truncate" style="color:#4B5563">${dispPlaceholder}</span>
                    </span>
                    <i data-lucide="chevron-down" class="w-18 h-18 text-stone ml-auto shrink-0" style="color:#9CA3AF"></i>
                </div>
                <div class="dropdown-menu custom-scrollbar" id="menu-${this.container.id}">
                    <div class="search-container">
                        <input type="text" class="search-input" placeholder="${getT('searchPlaceholder') || 'Search station...'}" id="search-${this.container.id}">
                    </div>
                    <div class="station-list" id="list-${this.container.id}"></div>
                </div>
            </div>`;
        this.renderOptions();
        if (window.lucide) window.lucide.createIcons();
    }

    renderOptions() {
        const list = document.getElementById(`list-${this.container.id}`);
        if (!list) return;

        if (this.filteredStations.length === 0) {
            const getT = (k) => typeof window.T === 'function' ? window.T(k) : k;
            list.innerHTML = `<div class="no-results text-stone" style="padding:20px;text-align:center;">${getT('noStationsFound') || 'No stations found'}</div>`;
            return;
        }

        const getHi = (name) => stationTranslations[name] ? stationTranslations[name].hi : '';
        const getDisplay = (name) => typeof window.T_STATION === 'function' ? window.T_STATION(name) : name;

        list.innerHTML = this.filteredStations.map(station => {
            const dots = station.lines.map(c => `<span style="width:10px;height:10px;border-radius:50%;display:inline-block;background:${c}"></span>`).join('');
            const sel = this.selectedValue === station.id ? 'selected bg-pink-50' : '';
            return `
                <div class="station-option ${sel}" data-value="${station.id}">
                    <div class="station-dots">${dots}</div>
                    <div style="display:flex;flex-direction:column;flex:1;overflow:hidden;">
                        <span class="option-name-en font-bold text-ink">${getDisplay(station.name)}</span>
                        <span class="option-name-hi" style="font-size:11px;color:#8A8279;">${getHi(station.name)}</span>
                    </div>
                    ${stationAttractions[station.name] ? `<div class="attr-pill-mini" title="Has Attractions"><i data-lucide="sparkles" class="w-10 h-10"></i> ${stationAttractions[station.name].length}</div>` : ''}
                </div>`;
        }).join('');

        list.querySelectorAll('.station-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                this.select(option.dataset.value);
            });
        });
    }

    select(value) {
        let station = this.stations.find(s => s.id === value);
        if (!station) {
            for (const lineKey in metroData) {
                const s = metroData[lineKey].stations.find(st => st.id === value);
                if (s) { station = this.stations.find(st => st.name === s.name); break; }
            }
        }
        if (!station) return;

        this.selectedValue = station.id;
        const displayName = typeof window.T_STATION === 'function' ? window.T_STATION(station.name) : station.name;
        const sel = document.getElementById(`selected-${this.container.id}`);
        if (sel) { sel.textContent = displayName; sel.style.color = '#1C1C1C'; sel.style.fontWeight = '500'; }

        const dotsC = document.getElementById(`dots-${this.container.id}`);
        if (dotsC) { dotsC.innerHTML = station.lines.map(c => `<span style="width:8px;height:8px;border-radius:50%;display:inline-block;background:${c}"></span>`).join(''); }

        this.close();
        if (this.onChange) this.onChange(station.id);
    }

    selectById(id) { this.select(id); }

    toggle() { this.isOpen ? this.close() : this.open(); }

    open() {
        this.isOpen = true;
        const menu = document.getElementById(`menu-${this.container.id}`);
        if (menu) {
            menu.style.display = 'block';
            setTimeout(() => menu.classList.add('open'), 10);
        }
        this.container.style.zIndex = '10000';
        const search = document.getElementById(`search-${this.container.id}`);
        if (search) { search.value = ''; search.focus(); }
        this.filter('');
    }

    close() {
        this.isOpen = false;
        const menu = document.getElementById(`menu-${this.container.id}`);
        if (menu) {
            menu.classList.remove('open');
            setTimeout(() => { if (!this.isOpen) menu.style.display = 'none'; }, 250);
        }
        setTimeout(() => { if (!this.isOpen) this.container.style.zIndex = '50'; }, 250);
    }

    filter(query) {
        const q = query.toLowerCase();
        this.filteredStations = this.stations.filter(s => {
            const raw = s.name.toLowerCase();
            const translated = typeof window.T_STATION === 'function' ? window.T_STATION(s.name).toLowerCase() : '';
            return raw.includes(q) || translated.includes(q);
        });
        this.renderOptions();
    }

    refreshTranslations() {
        if (this.selectedValue) {
            this.select(this.selectedValue);
        } else {
            const getT = (k) => typeof window.T === 'function' ? window.T(k) : k;
            const sel = document.getElementById(`selected-${this.container.id}`);
            if (sel) sel.textContent = getT(this.placeholderKey);
        }
        
        const searchInput = document.getElementById(`search-${this.container.id}`);
        if (searchInput) {
            const getT = (k) => typeof window.T === 'function' ? window.T(k) : k;
            searchInput.placeholder = getT('searchPlaceholder') || 'Search station...';
        }

        this.renderOptions();
    }

    attachEventListeners() {
        const trigger = document.getElementById(`trigger-${this.container.id}`);
        const searchInput = document.getElementById(`search-${this.container.id}`);

        if (trigger) trigger.addEventListener('click', (e) => { e.stopPropagation(); this.toggle(); });

        document.addEventListener('click', (e) => {
            if (this.isOpen && !this.container.contains(e.target)) this.close();
        });

        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.filter(e.target.value));
            searchInput.addEventListener('click', (e) => e.stopPropagation());
        }

        if (trigger) trigger.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggle(); }
        });
    }
}
