// App Configuration JS
const defaultCategoriesData = {
    'education': {
        name: 'Education', icon: 'school', class: 'education',
        apps: [
            { id: 'app-duolingo', name: 'Duolingo', icon: 'assets/app-icons/duolingo.png', ageAppropriate: true },
            { id: 'app-khan', name: 'Khan Academy', icon: 'assets/app-icons/khan.png', ageAppropriate: true },
            { id: 'app-wikipedia', name: 'Wikipedia', icon: 'assets/app-icons/wikipedia.png', ageAppropriate: true },
            { id: 'app-google-classroom', name: 'Google Classroom', icon: 'assets/app-icons/classroom.png', ageAppropriate: true }
        ]
    },
    'entertainment': {
        name: 'Entertainment', icon: 'movie', class: 'entertainment',
        apps: [
            { id: 'app-youtube', name: 'YouTube', icon: 'assets/app-icons/youtube.png', ageAppropriate: true },
            { id: 'app-netflix', name: 'Netflix', icon: 'assets/app-icons/netflix.png', ageAppropriate: true },
            { id: 'app-disney', name: 'Disney+', icon: 'assets/app-icons/disney.png', ageAppropriate: true },
            { id: 'app-spotify', name: 'Spotify', icon: 'assets/app-icons/spotify.png', ageAppropriate: true }
        ]
    },
    'gaming': {
        name: 'Gaming', icon: 'sports_esports', class: 'gaming',
        apps: [
            { id: 'app-roblox', name: 'Roblox', icon: 'assets/app-icons/roblox.png', ageAppropriate: false },
            { id: 'app-minecraft', name: 'Minecraft', icon: 'assets/app-icons/minecraft.png', ageAppropriate: true },
            { id: 'app-amongus', name: 'Among Us', icon: 'assets/app-icons/amongus.png', ageAppropriate: true },
            { id: 'app-subway', name: 'Subway Surfers', icon: 'assets/app-icons/subway.png', ageAppropriate: true },
            { id: 'app-clash', name: 'Clash Royale', icon: 'assets/app-icons/clash.png', ageAppropriate: false }
        ]
    },
    'social': {
        name: 'Social', icon: 'chat_bubble', class: 'social',
        apps: [
            { id: 'app-whatsapp', name: 'WhatsApp', icon: 'assets/app-icons/whatsapp.png', ageAppropriate: true },
            { id: 'app-messenger', name: 'Messenger', icon: 'assets/app-icons/messenger.png', ageAppropriate: true },
            { id: 'app-instagram', name: 'Instagram', icon: 'assets/app-icons/instagram.png', ageAppropriate: false },
            { id: 'app-tiktok', name: 'TikTok', icon: 'assets/app-icons/tiktok.png', ageAppropriate: false }
        ]
    }, // Add Essential/Communication manually for better UX if needed, but categorization logic is key.
    // The user requested tabs like app-limits. 
};

// Essential Apps (System) - Usually separate
const essentialApps = {
    name: 'Essential System Apps',
    icon: 'settings', class: 'system',
    apps: [
        { id: 'sys-phone', name: 'Phone', icon: 'assets/app-icons/default.png', ageAppropriate: true },
        { id: 'sys-maps', name: 'Maps', icon: 'assets/app-icons/default.png', ageAppropriate: true },
        { id: 'sys-camera', name: 'Camera', icon: 'assets/app-icons/default.png', ageAppropriate: true },
        { id: 'sys-settings', name: 'Settings', icon: 'assets/app-icons/default.png', ageAppropriate: true },
        { id: 'sys-clock', name: 'Clock', icon: 'assets/app-icons/default.png', ageAppropriate: true }
    ]
};

const AppConfig = {
    scheduleId: null,
    childName: null,
    currentFilter: 'age-appropriate',
    allowedApps: new Set(), // Set of App IDs allowed for this schedule

    init() {
        // 1. Get Context
        const urlParams = new URLSearchParams(window.location.search);
        this.scheduleId = parseInt(urlParams.get('schedule'));
        this.childName = urlParams.get('child') || 'Child';

        if (!this.scheduleId) {
            console.error('No schedule ID provided');
            return;
        }

        // 2. Load Data
        this.loadScheduleData();

        // 3. Render
        this.render();
    },

    loadScheduleData() {
        const key = `schedules_${this.childName}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            const schedules = JSON.parse(stored);
            const schedule = schedules.find(s => s.id === this.scheduleId);
            if (schedule) {
                // Initialize Allowed Apps
                // If allowedApps property doesn't exist (new feature), default to ? 
                // For Downtime, default is usually EMPTY (Block all except...).
                // But let's check.
                if (schedule.allowedApps) {
                    this.allowedApps = new Set(schedule.allowedApps);
                } else {
                    this.allowedApps = new Set();
                    // Maybe pre-allow essential apps?
                    essentialApps.apps.forEach(a => this.allowedApps.add(a.id));
                }
            }
        }
    },

    saveScheduleData() {
        const key = `schedules_${this.childName}`;
        const stored = localStorage.getItem(key);
        if (stored) {
            const schedules = JSON.parse(stored);
            const idx = schedules.findIndex(s => s.id === this.scheduleId);
            if (idx > -1) {
                schedules[idx].allowedApps = Array.from(this.allowedApps);
                schedules[idx].allowedAppsCount = this.allowedApps.size;
                localStorage.setItem(key, JSON.stringify(schedules));
            }
        }
    },

    setFilter(mode) {
        this.currentFilter = mode;

        // Update Tabs UI
        const tabAge = document.getElementById('tab-age');
        const tabAll = document.getElementById('tab-all');

        if (mode === 'age-appropriate') {
            tabAge.classList.add('active');
            tabAge.style.background = 'white';
            tabAge.style.color = 'var(--color-primary)';
            tabAge.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';

            tabAll.classList.remove('active');
            tabAll.style.background = 'rgba(255,255,255,0.5)';
            tabAll.style.color = 'var(--color-text-secondary)';
            tabAll.style.boxShadow = 'none';
        } else {
            tabAll.classList.add('active');
            tabAll.style.background = 'white';
            tabAll.style.color = 'var(--color-primary)';
            tabAll.style.boxShadow = '0 2px 4px rgba(0,0,0,0.05)';

            tabAge.classList.remove('active');
            tabAge.style.background = 'rgba(255,255,255,0.5)';
            tabAge.style.color = 'var(--color-text-secondary)';
            tabAge.style.boxShadow = 'none';
        }

        this.render();
    },

    render() {
        const container = document.getElementById('config-app-list');
        container.innerHTML = '';

        // Render Essential Apps first (Always open as it is first)
        this.renderCategoryCard(container, essentialApps, 'system', true);

        // Render Standard Categories (Collapsed by default)
        Object.entries(defaultCategoriesData).forEach(([key, data]) => {
            this.renderCategoryCard(container, data, key, false);
        });
    },

    renderCategoryCard(container, data, type, isOpen = true) {
        // Filter Apps
        const filteredApps = data.apps.filter(app => {
            if (this.currentFilter === 'age-appropriate' && !app.ageAppropriate) return false;
            return true;
        });

        if (filteredApps.length === 0) return; // Don't show empty cards

        const card = document.createElement('div');
        card.className = `card app-group-card ${isOpen ? 'expanded' : ''}`;
        card.style.marginBottom = '16px';

        // Calculate allowed count for this category
        const allowedCount = filteredApps.filter(a => this.allowedApps.has(a.id)).length;

        card.id = `card-${type}`;

        // Header Icon Color
        let iconBg = 'rgba(0,0,0,0.05)';
        let iconColor = '#666';
        if (type === 'entertainment') { iconBg = 'rgba(239, 68, 68, 0.1)'; iconColor = '#EF4444'; }
        if (type === 'gaming') { iconBg = 'rgba(245, 158, 11, 0.1)'; iconColor = '#F59E0B'; }
        if (type === 'social') { iconBg = 'rgba(59, 130, 246, 0.1)'; iconColor = '#3B82F6'; }
        if (type === 'education') { iconBg = 'rgba(16, 185, 129, 0.1)'; iconColor = '#10B981'; }

        const appListHtml = filteredApps.map(app => {
            const isAllowed = this.allowedApps.has(app.id);
            const iconSrc = app.icon || 'assets/app-icons/default.png';

            return `
                <div class="app-row">
                    <div class="app-icon-container">
                         <img src="${iconSrc}" class="app-icon" onerror="this.src='https://ui-avatars.com/api/?name=${app.name}&background=random&color=fff'">
                    </div>
                    <div class="app-details">
                        <span class="app-name">
                            ${app.name}
                            ${!app.ageAppropriate ? '<span style="font-size:10px; background:#eee; padding:2px 4px; border-radius:4px; margin-left:4px;">13+</span>' : ''}
                        </span>
                    </div>
                    <label class="toggle-switch">
                        <input type="checkbox" ${isAllowed ? 'checked' : ''} onchange="AppConfig.toggleApp('${app.id}')">
                        <span class="slider"></span>
                    </label>
                </div>
            `;
        }).join('');

        card.innerHTML = `
            <div class="group-header" onclick="AppConfig.toggleCategory('${type}')" style="cursor: pointer; display: flex; align-items: center;">
                <div class="icon-box" style="background: ${iconBg}; color: ${iconColor};">
                    <span class="material-symbols-outlined">${data.icon}</span>
                </div>
                <div class="group-info" style="flex: 1;">
                    <h3>${data.name}</h3>
                    <p>${allowedCount} of ${filteredApps.length} apps allowed</p>
                </div>
                 <span class="material-symbols-outlined expand-icon" id="icon-${type}" style="transition: transform 0.2s; color: var(--color-text-tertiary);">${isOpen ? 'expand_less' : 'expand_more'}</span>
            </div>
            <div class="app-list" id="list-${type}" style="display: ${isOpen ? 'block' : 'none'};">
                ${appListHtml}
            </div>
        `;

        container.appendChild(card);
    },

    toggleCategory(type) {
        const list = document.getElementById(`list-${type}`);
        const icon = document.getElementById(`icon-${type}`);

        if (list.style.display === 'none') {
            list.style.display = 'block';
            icon.textContent = 'expand_less';
        } else {
            list.style.display = 'none';
            icon.textContent = 'expand_more';
        }
    },

    toggleApp(appId) {
        if (this.allowedApps.has(appId)) {
            this.allowedApps.delete(appId);
        } else {
            this.allowedApps.add(appId);
        }

        this.saveScheduleData();

        // Re-render only to update counts? Or just trust toggle state visually?
        // Updating counts requires re-render of headers.
        // For localized update, we could update the specific text.
        // For simplicity, let's re-render the headers or lists?
        // Re-rendering whole list resets scroll. Better to just update data.
        // User sees toggle moving, that's enough feedback.
        // But "X of Y apps allowed" text will be stale.
        // Let's re-render. If scroll jumps, we'll fix.
        // Optimization: Don't re-render entire list.
        this.render();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    AppConfig.init();
});
