class CustomDropdown {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = options;
        this.stations = [];
        this.filteredStations = [];
        this.selectedStationId = this.container.getAttribute('data-value') || null;
        this.isOpen = false;

        this.placeholder = options.placeholder || "Select Station";
        this.onChange = options.onChange || (() => { });

        this.init();
    }

    init() {
        // Create DOM structure
        this.container.innerHTML = `
            <div class="custom-dropdown">
                <div class="dropdown-trigger" tabindex="0">
                    <div class="flex items-center">
                        <span class="trigger-dots"></span>
                        <span class="selected-text">${this.placeholder}</span>
                    </div>
                    <i data-lucide="chevron-down" class="w-4 h-4 text-gray-400"></i>
                </div>
                <div class="dropdown-menu">
                    <div class="search-container">
                        <input type="text" class="search-input" placeholder="Search station..." onClick="event.stopPropagation()">
                    </div>
                    <div class="station-list custom-scrollbar"></div>
                </div>
            </div>
        `;

        this.trigger = this.container.querySelector('.dropdown-trigger');
        this.menu = this.container.querySelector('.dropdown-menu');
        this.list = this.container.querySelector('.station-list');
        this.searchInput = this.container.querySelector('.search-input');
        this.triggerDots = this.container.querySelector('.trigger-dots');
        this.selectedText = this.container.querySelector('.selected-text');

        // Event Listeners
        this.trigger.addEventListener('click', () => this.toggle());
        this.searchInput.addEventListener('input', (e) => this.filterStations(e.target.value));

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.close();
            }
        });
    }

    setStations(stationsData) {
        // Flatten and process stations from different lines
        // Expecting stationsData to be the metroData object from index.html

        const allStations = [];
        const uniqueIds = new Set();

        Object.values(stationsData).forEach(line => {
            line.stations.forEach(station => {
                // If it's an interchange, we might see it multiple times. 
                // We want to merge the line colors for dots.

                // Use name as unique key for user-facing list, but we need ID for logic.
                // Actually, for the dropdown A-Z list, we want each unique station name.
                // If a station is interchange, it has multiple IDs (one per line).
                // Let's group by name.

                const existing = allStations.find(s => s.name === station.name);
                if (existing) {
                    existing.lines.push(line.color);
                    existing.ids[line.color] = station.id; // Map color/line to ID if needed? 
                    // Simpler: Just allow selecting the station, and logic handles line selection later?
                    // Or keep strictly to IDs? 
                    // The prompt asks for "Interchange stations... show multiple dots". implies single entry.

                    // Let's store available IDs. Logic in app likely expects specific ID (e.g. Purple's Majestic vs Green's Majestic).
                    // Complex part: If user selects "Majestic", which ID do we return?
                    // Typically in pathfinding, either works as start/end if we handle interchanges.
                    // Let's store the 'primary' or first encountered ID, but keep track of lines.
                    if (!existing.ids.includes(station.id)) existing.ids.push(station.id);

                } else {
                    allStations.push({
                        name: station.name,
                        lines: [line.color],
                        ids: [station.id],
                        masterId: station.id // Default to first ID found
                    });
                }
            });
        });

        // Sort Alphabetically
        this.stations = allStations.sort((a, b) => a.name.localeCompare(b.name));
        this.filteredStations = this.stations;
        this.renderList();

        // If there was a pre-selected value, update UI
        if (this.selectedStationId) {
            this.selectById(this.selectedStationId);
        }
    }

    renderList() {
        if (this.filteredStations.length === 0) {
            this.list.innerHTML = `<div class="no-results">No stations found</div>`;
            return;
        }

        this.list.innerHTML = this.filteredStations.map(station => `
            <div class="station-option ${this.isSelected(station) ? 'selected' : ''}" data-id="${station.masterId}">
                <div class="station-dots">
                    ${station.lines.map(color => `<span class="dot" style="background-color: ${color}"></span>`).join('')}
                </div>
                <span>${this.getTranslatedName(station.name)}</span>
            </div>
        `).join('');

        // Add click listeners to options
        this.list.querySelectorAll('.station-option').forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = option.dataset.id;
                this.select(id);
                this.close();
            });
        });
    }

    getTranslatedName(name) {
        // Access global T_STATION function if available, else return name
        if (typeof window.T_STATION === 'function') {
            return window.T_STATION(name);
        }
        return name;
    }

    filterStations(query) {
        const lowerQuery = query.toLowerCase();
        this.filteredStations = this.stations.filter(s =>
            s.name.toLowerCase().includes(lowerQuery) ||
            this.getTranslatedName(s.name).toLowerCase().includes(lowerQuery)
        );
        this.renderList();
    }

    toggle() {
        if (this.isOpen) this.close();
        else this.open();
    }

    open() {
        this.isOpen = true;
        this.menu.classList.add('open');
        this.trigger.querySelector('i').setAttribute('data-lucide', 'chevron-up');
        lucide.createIcons();
        this.searchInput.focus();
    }

    close() {
        this.isOpen = false;
        this.menu.classList.remove('open');
        this.trigger.querySelector('i').setAttribute('data-lucide', 'chevron-down');
        lucide.createIcons();
        this.searchInput.value = '';
        this.filteredStations = this.stations;
        this.renderList();
    }

    select(id) {
        // Find station object by checking if ID is in its ids array
        const station = this.stations.find(s => s.ids.includes(id));
        if (!station) return;

        this.selectedStationId = id;
        this.selectedText.textContent = this.getTranslatedName(station.name);
        this.selectedText.classList.add('text-white', 'font-medium');

        // Update trigger dots
        this.triggerDots.innerHTML = station.lines.map(color =>
            `<span class="trigger-dot" style="background-color: ${color}"></span>`
        ).join('');

        // Re-render list to show selection highlight
        this.renderList();

        // Trigger callback
        this.onChange(id);
    }

    selectById(id) {
        this.select(id);
    }

    // Helper to refresh translations
    refreshTranslations() {
        if (this.selectedStationId) this.select(this.selectedStationId);
        this.renderList();
    }
}

// Export for module usage
window.CustomDropdown = CustomDropdown;
