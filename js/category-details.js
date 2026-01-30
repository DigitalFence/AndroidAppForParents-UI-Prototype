// Category Data Configuration
// Extended with YouTube and Web Data
const defaultCategoriesData = {
    'education': {
        name: 'Education',
        icon: 'school',
        class: 'education',
        limitEnabled: false,
        limitMinutes: 60,
        sessionLimitEnabled: true,
        sessionLimitMinutes: 45,
        apps: [
            { id: 'app-duolingo', name: 'Duolingo', icon: 'assets/app-icons/duolingo.png', allowed: true, ageAppropriate: true, category: 'education' },
            { id: 'app-khan', name: 'Khan Academy', icon: 'assets/app-icons/khan.png', allowed: true, ageAppropriate: true, category: 'education' },
            { id: 'app-wikipedia', name: 'Wikipedia', icon: 'assets/app-icons/wikipedia.png', allowed: true, ageAppropriate: true, category: 'education' },
            { id: 'app-google-classroom', name: 'Google Classroom', icon: 'assets/app-icons/classroom.png', allowed: true, ageAppropriate: true, category: 'education' }
        ],
        youtube: [
            { id: 'yt-khan', name: 'Khan Academy', meta: '8.2M Subscribers', icon: 'K', allowed: true },
            { id: 'yt-crash', name: 'CrashCourse', meta: '14M Subscribers', icon: 'C', allowed: true },
            { id: 'yt-natgeo', name: 'Nat Geo', meta: '22M Subscribers', icon: 'N', allowed: true }
        ],
        web: [
            { id: 'web-wiki', name: 'wikipedia.org', meta: 'Education', icon: 'W', allowed: true },
            { id: 'web-khan', name: 'khanacademy.org', meta: 'Education', icon: 'K', allowed: true },
            { id: 'web-national', name: 'nationalgeographic.com', meta: 'Science', icon: 'N', allowed: true }
        ]
    },
    'entertainment': {
        name: 'Entertainment',
        icon: 'movie',
        class: 'entertainment',
        limitEnabled: true,
        limitMinutes: 60,
        sessionLimitEnabled: true,
        sessionLimitMinutes: 30,
        apps: [
            { id: 'app-youtube', name: 'YouTube', icon: 'assets/app-icons/youtube.png', allowed: true, ageAppropriate: true, category: 'entertainment' },
            { id: 'app-netflix', name: 'Netflix', icon: 'assets/app-icons/netflix.png', allowed: true, ageAppropriate: true, category: 'entertainment' },
            { id: 'app-disney', name: 'Disney+', icon: 'assets/app-icons/disney.png', allowed: true, ageAppropriate: true, category: 'entertainment' },
            { id: 'app-spotify', name: 'Spotify', icon: 'assets/app-icons/spotify.png', allowed: true, ageAppropriate: true, category: 'entertainment' }
        ],
        youtube: [
            { id: 'yt-dude', name: 'Dude Perfect', meta: '59M Subscribers', icon: 'D', allowed: true },
            { id: 'yt-pew', name: 'PewDiePie', meta: '111M Subscribers', icon: 'P', allowed: false }, /* Blocked example */
            { id: 'yt-mrbeast', name: 'MrBeast', meta: '200M Subscribers', icon: 'M', allowed: true }
        ],
        web: [
            { id: 'web-imdb', name: 'imdb.com', meta: 'Movies', icon: 'I', allowed: true },
            { id: 'web-rotten', name: 'rottentomatoes.com', meta: 'Reviews', icon: 'R', allowed: true }
        ]
    },
    'gaming': {
        name: 'Gaming',
        icon: 'sports_esports',
        class: 'gaming',
        limitEnabled: true,
        limitMinutes: 30,
        sessionLimitEnabled: true,
        sessionLimitMinutes: 20,
        apps: [
            { id: 'app-roblox', name: 'Roblox', icon: 'assets/app-icons/roblox.png', allowed: true, ageAppropriate: false, category: 'gaming' },
            { id: 'app-minecraft', name: 'Minecraft', icon: 'assets/app-icons/minecraft.png', allowed: true, ageAppropriate: true, category: 'gaming' },
            { id: 'app-amongus', name: 'Among Us', icon: 'assets/app-icons/amongus.png', allowed: true, ageAppropriate: true, category: 'gaming' },
            { id: 'app-subway', name: 'Subway Surfers', icon: 'assets/app-icons/subway.png', allowed: true, ageAppropriate: true, category: 'gaming' }
        ],
        youtube: [
            { id: 'yt-ign', name: 'IGN', meta: '17M Subscribers', icon: 'I', allowed: true },
            { id: 'yt-ninja', name: 'Ninja', meta: '23M Subscribers', icon: 'N', allowed: true }
        ],
        web: [
            { id: 'web-ign', name: 'ign.com', meta: 'Gaming News', icon: 'I', allowed: true },
            { id: 'web-twitch', name: 'twitch.tv', meta: 'Streaming', icon: 'T', allowed: false }
        ]
    },
    'social': {
        name: 'Social',
        icon: 'chat_bubble',
        class: 'social',
        limitEnabled: true,
        limitMinutes: 0,
        sessionLimitEnabled: true,
        sessionLimitMinutes: 15,
        apps: [
            { id: 'app-whatsapp', name: 'WhatsApp', icon: 'assets/app-icons/whatsapp.png', allowed: false, ageAppropriate: true, category: 'social' },
            { id: 'app-messenger', name: 'Messenger', icon: 'assets/app-icons/messenger.png', allowed: false, ageAppropriate: true, category: 'social' },
            { id: 'app-instagram', name: 'Instagram', icon: 'assets/app-icons/instagram.png', allowed: false, ageAppropriate: false, category: 'social' },
            { id: 'app-tiktok', name: 'TikTok', icon: 'assets/app-icons/tiktok.png', allowed: false, ageAppropriate: false, category: 'social' }
        ],
        youtube: [],
        web: [
            { id: 'web-fb', name: 'facebook.com', meta: 'Social', icon: 'F', allowed: false },
            { id: 'web-twitter', name: 'twitter.com', meta: 'Social', icon: 'T', allowed: false }
        ]
    },
    'creativity': {
        name: 'Creativity', icon: 'brush', class: 'creativity', limitEnabled: true, limitMinutes: 45, sessionLimitEnabled: true, sessionLimitMinutes: 45,
        apps: [],
        youtube: [
            { id: 'yt-5min', name: '5-Minute Crafts', meta: '80M Subscribers', icon: '5', allowed: true }
        ],
        web: [
            { id: 'web-pin', name: 'pinterest.com', meta: 'Ideas', icon: 'P', allowed: true },
            { id: 'web-behance', name: 'behance.net', meta: 'Design', icon: 'B', allowed: true }
        ]
    },
    'utilities': {
        name: 'System & Utilities', icon: 'settings', class: 'utilities', limitEnabled: false, limitMinutes: 0, sessionLimitEnabled: false, sessionLimitMinutes: 0,
        apps: [],
        youtube: [],
        web: [
            { id: 'web-google', name: 'google.com', meta: 'Search', icon: 'G', allowed: true },
            { id: 'web-stack', name: 'stackoverflow.com', meta: 'Dev', icon: 'S', allowed: true }
        ]
    }
};

let appData = null;
let currentByCategory = 'entertainment';
let currentFilterMode = 'age-appropriate';
let currentSearchQuery = '';
let currentTab = 'all';

const CategoryHandlers = {
    init() {
        const urlParams = new URLSearchParams(window.location.search);
        currentByCategory = urlParams.get('category') || 'entertainment';

        // 1. Load Data
        const stored = localStorage.getItem('parentApp_categoriesData');
        if (stored) {
            try {
                appData = JSON.parse(stored);
                // Data Migration: Check if youtube/web keys exist
                this.checkAndMigrateData();
            } catch (e) {
                console.error('Error parsing stored data', e);
                appData = JSON.parse(JSON.stringify(defaultCategoriesData));
            }
        } else {
            appData = JSON.parse(JSON.stringify(defaultCategoriesData));
            this.saveState();
        }

        // Setup global click listener for dropdowns
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.menu-popup') && !e.target.closest('.category-chip')) {
                this.closeAllMenus();
            }
        });

        this.loadCategory(currentByCategory);
        this.switchTab('all'); // Default tab
    },

    checkAndMigrateData() {
        // Migration: Check for missing keys, missing categories, or outdated data schema
        let updated = false;
        Object.keys(defaultCategoriesData).forEach(catKey => {
            if (!appData[catKey]) {
                // Category missing entirely? Add it.
                appData[catKey] = JSON.parse(JSON.stringify(defaultCategoriesData[catKey]));
                updated = true;
            } else {
                // Check 1: Missing sub-arrays (youtube/web)
                if (!appData[catKey].youtube) {
                    appData[catKey].youtube = defaultCategoriesData[catKey].youtube;
                    updated = true;
                }
                // Check 2: Outdated Schema (Old video data had 'title' but no 'meta' or 'id' starting with 'yt-')
                else if (appData[catKey].youtube.length > 0 && (appData[catKey].youtube[0].title || !appData[catKey].youtube[0].id)) {
                    console.log(`Migrating ${catKey} from videos to channels...`);
                    appData[catKey].youtube = defaultCategoriesData[catKey].youtube;
                    updated = true;
                }

                if (!appData[catKey].web || appData[catKey].web.length === 0) {
                    // Force populate if empty
                    if (defaultCategoriesData[catKey].web && defaultCategoriesData[catKey].web.length > 0) {
                        appData[catKey].web = defaultCategoriesData[catKey].web;
                        updated = true;
                    }
                } else {
                    // Check for Old Schema or Google Favicons
                    let needsUpdate = false;
                    appData[catKey].web = appData[catKey].web.map(w => {
                        // Fix 1: URL property instead of name
                        if (w.url && !w.name) {
                            needsUpdate = true;
                            return {
                                id: w.id || `web-${Math.random().toString(36).substr(2, 9)}`,
                                name: w.url,
                                meta: 'Website',
                                icon: w.url.charAt(0).toUpperCase(),
                                allowed: w.allowed !== false
                            };
                        }
                        // Fix 2: Google Favicons (undo previous migration if any)
                        if (w.icon && w.icon.startsWith('http')) {
                            needsUpdate = true;
                            w.icon = w.name.charAt(0).toUpperCase();
                        }
                        return w;
                    });
                    if (needsUpdate) updated = true;
                }
            }
        });
        if (updated) this.saveState();
    },

    saveState() {
        localStorage.setItem('parentApp_categoriesData', JSON.stringify(appData));
    },

    loadCategory(categoryId) {
        const data = appData[categoryId];
        if (!data) return;

        // UI Updates
        document.getElementById('hero-name').textContent = data.name;
        document.getElementById('hero-symbol').textContent = data.icon;
        document.getElementById('hero-icon').className = `hero-cat-icon ${data.class}`;

        // Feature Limits (Time/Session)
        this.renderLimitCards(data);

        // Update Tab Counts
        this.updateTabCounts();
    },

    renderLimitCards(data) {
        // Time Limit
        const toggle = document.getElementById('limit-toggle');
        const sliderContainer = document.getElementById('limit-slider-wrapper');
        const slider = document.getElementById('time-range');

        toggle.checked = data.limitEnabled;
        slider.value = data.limitMinutes;

        if (data.limitEnabled) sliderContainer.classList.remove('disabled');
        else sliderContainer.classList.add('disabled');

        this.updateTimeDisplayUI(data.limitMinutes);

        // Session Limit
        const sessionToggle = document.getElementById('session-toggle');
        const sessionContainer = document.getElementById('session-slider-wrapper');
        const sessionSlider = document.getElementById('session-range');

        if (data.sessionLimitEnabled === undefined) data.sessionLimitEnabled = true;
        sessionToggle.checked = data.sessionLimitEnabled;
        sessionSlider.value = data.sessionLimitMinutes || 30;

        if (data.sessionLimitEnabled) sessionContainer.classList.remove('disabled');
        else sessionContainer.classList.add('disabled');

        this.updateSessionDisplayUI(data.sessionLimitMinutes || 30, !data.sessionLimitEnabled);
    },

    updateTabCounts() {
        const data = appData[currentByCategory];
        if (!data) return;

        document.getElementById('tab-count-apps').textContent = `(${data.apps.length})`;
        document.getElementById('tab-count-youtube').textContent = `(${data.youtube ? data.youtube.length : 0})`;
        document.getElementById('tab-count-web').textContent = `(${data.web ? data.web.length : 0})`;

        // Also update sub-headers
        document.getElementById('app-count').textContent = `${data.apps.length} apps`;

        const allowedWeb = (data.web || []).filter(w => w.allowed).length;
        const blockedWeb = (data.web || []).length - allowedWeb;
        const allowedWebEl = document.getElementById('web-allowed-count');
        const blockedWebEl = document.getElementById('web-blocked-count');

        if (allowedWebEl) allowedWebEl.textContent = `(${allowedWeb})`;
        if (blockedWebEl) blockedWebEl.textContent = `(${blockedWeb})`;

        const allowedYT = (data.youtube || []).filter(y => y.allowed).length;
        const blockedYT = (data.youtube || []).length - allowedYT;
        const allowedYTEl = document.getElementById('youtube-allowed-count');
        const blockedYTEl = document.getElementById('youtube-blocked-count');

        if (allowedYTEl) allowedYTEl.textContent = `(${allowedYT})`;
        if (blockedYTEl) blockedYTEl.textContent = `(${blockedYT})`;
    },

    switchTab(tabName) {
        currentTab = tabName;
        // Update Tabs UI
        document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('active'));
        // Find by text content or index? I used onclick so no ref. Let's use attribute if I added it, or simple text check.
        // Better: I passed onclick="switchTab('all')". I should select by index or data attr. 
        // I will re-implement using querySelector logic.

        // Simpler: Just refresh all tabs logic on every switch for now
        // Let's assume the DOM elements match order: All, Apps, YouTube, Web
        const tabs = ['all', 'apps', 'youtube', 'web'];
        const index = tabs.indexOf(tabName);
        const tabItems = document.querySelectorAll('.tab-item');
        if (tabItems[index]) tabItems[index].classList.add('active');

        // Show Content
        document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
        document.getElementById(`tab-${tabName}`).classList.remove('hidden');

        this.renderCurrentTab();
    },

    renderCurrentTab() {
        if (currentTab === 'all') {
            this.renderAllTab();
        } else if (currentTab === 'apps') {
            this.filterAndRenderApps(); // Existing logic logic
        } else if (currentTab === 'youtube') {
            this.renderYouTubeTab();
        } else if (currentTab === 'web') {
            this.renderWebTab();
        }
    },

    // --- RENDERERS ---

    renderAllTab() {
        const data = appData[currentByCategory];
        const query = (document.querySelector('.global-search input') || {}).value || '';
        const qLower = query.toLowerCase();

        // 1. Filter Apps
        const filteredApps = data.apps.filter(x => x.name.toLowerCase().includes(qLower));
        // Render simple apps list (re-using renderApps logic but targeting Different Container and maybe Simpler view?)
        // Transcript says "Apps Management app list in All tab is fully functional".
        // So I'll recycle renderApps generation but point to 'all-apps-list'.
        this.generateAppsListHTML(filteredApps, 'all-apps-list');

        // 2. Filter YouTube
        const filteredYT = (data.youtube || []).filter(x => x.name.toLowerCase().includes(qLower));
        this.generateRulesListHTML(filteredYT, 'all-youtube-list', 'toggleYouTube');

        // 3. Filter Web
        const filteredWeb = (data.web || []).filter(x => x.name.toLowerCase().includes(qLower));
        this.generateRulesListHTML(filteredWeb, 'all-web-list', 'toggleWeb');
    },

    filterAndRenderApps() {
        // Main Apps Tab Logic
        const data = appData[currentByCategory];
        let filteredApps = data.apps.filter(app => {
            if (currentSearchQuery && !app.name.toLowerCase().includes(currentSearchQuery.toLowerCase())) return false;
            // Note: In "Apps" tab we use 'currentSearchQuery' from that specific search box.
            // In "All" tab we use global search. 
            // This function is for the "Apps" tab.
            if (currentFilterMode === 'age-appropriate' && !app.ageAppropriate) return false;
            return true;
        });

        this.generateAppsListHTML(filteredApps, 'apps-list');
    },

    renderYouTubeTab() {
        const data = appData[currentByCategory];
        const list = data.youtube || [];

        const allowed = list.filter(x => x.allowed);
        const blocked = list.filter(x => !x.allowed);

        this.generateRulesListHTML(allowed, 'youtube-allowed-list', 'toggleYouTube');
        this.generateRulesListHTML(blocked, 'youtube-blocked-list', 'toggleYouTube');

        this.updateTabCounts();
    },

    renderWebTab() {
        const data = appData[currentByCategory];
        const webList = data.web || [];

        const allowed = webList.filter(w => w.allowed);
        const blocked = webList.filter(w => !w.allowed);

        this.generateRulesListHTML(allowed, 'web-allowed-list', 'toggleWeb');
        this.generateRulesListHTML(blocked, 'web-blocked-list', 'toggleWeb');

        // Update Counts since we are here
        this.updateTabCounts();
    },

    // --- GENERATORS ---

    generateAppsListHTML(apps, containerId) {
        const list = document.getElementById(containerId);
        if (!list) return;
        list.innerHTML = '';

        if (apps.length === 0) {
            list.innerHTML = `<div class="empty-state">No apps found</div>`;
            return;
        }

        apps.forEach(app => {
            const item = document.createElement('div');
            item.className = 'app-item';
            const iconSrc = app.icon || 'assets/app-icons/default.png';
            const dropdownId = `dd-${containerId}-${app.id}`; // Unique ID per container

            // Category options logic (simplified for brevity)
            const targetCategories = ['education', 'entertainment', 'gaming', 'social', 'creativity'];
            let menuOptions = targetCategories.map(catKey => {
                const catData = appData[catKey];
                const isSelected = app.category === catKey;
                return `<div class="menu-item dropdown-item ${isSelected ? 'selected' : ''}" 
                            onclick="CategoryHandlers.changeAppCategory('${app.id}', '${catKey}')">
                            ${catData.name} 
                            <span class="material-symbols-outlined check-icon">check</span>
                        </div>`;
            }).join('');

            item.innerHTML = `
                <div class="app-left">
                    <img src="${iconSrc}" class="app-icon" onerror="this.src='https://ui-avatars.com/api/?name=${app.name}&background=random&color=fff&size=80'">
                    <div class="app-details">
                        <span class="app-name">
                            ${app.name}
                            ${!app.ageAppropriate ? '<span class="not-age-appropriate-badge">13+</span>' : ''}
                        </span>
                        <div class="chip-wrapper">
                            <div class="category-chip" onclick="CategoryHandlers.toggleDropdown(event, '${dropdownId}')">
                                <span class="material-symbols-outlined">edit</span>
                                <span class="chip-text">Change Category</span>
                                <span class="material-symbols-outlined" style="font-size: 16px;">arrow_drop_down</span>
                            </div>
                            <div class="menu-popup" id="${dropdownId}">
                                ${menuOptions}
                            </div>
                        </div>
                    </div>
                </div>
                <label class="app-toggle">
                    <input type="checkbox" ${app.allowed ? 'checked' : ''} onchange="CategoryHandlers.toggleApp('${app.id}')">
                    <span class="slider"></span>
                </label>
            `;
            list.appendChild(item);
        });
    },

    generateRulesListHTML(items, containerId, toggleFunc) {
        const list = document.getElementById(containerId);
        if (!list) return;
        list.innerHTML = '';

        if (items.length === 0) {
            list.innerHTML = `<div class="empty-state">No items</div>`;
            return;
        }

        items.forEach(item => {
            const div = document.createElement('div');
            // Class: rule-item [blocked]
            div.className = `rule-item ${!item.allowed ? 'blocked' : ''}`;

            // Icon logic: Handle images (URLs) vs Material Symbols vs Single Char
            let iconHtml = '';
            if (item.icon.includes('/') || item.icon.startsWith('http')) {
                iconHtml = `<img src="${item.icon}" style="width:100%; height:100%; border-radius:50%; object-fit:cover;">`;
            } else if (item.icon.length === 1) {
                iconHtml = item.icon;
            } else {
                iconHtml = `<span class="material-symbols-outlined">${item.icon}</span>`;
            }

            div.innerHTML = `
                <div class="item-icon">
                    ${iconHtml}
                </div>
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                    <p class="item-meta">${item.meta}</p>
                </div>
                <label class="toggle-switch">
                    <input type="checkbox" ${item.allowed ? 'checked' : ''} onchange="CategoryHandlers.${toggleFunc}('${item.id}')">
                    <span class="slider"></span>
                </label>
            `;
            list.appendChild(div);
        });
    },

    // --- ACTIONS ---

    searchGlobal(val) {
        this.renderAllTab();
    },

    searchApps(val) {
        currentSearchQuery = val;
        this.filterAndRenderApps();
    },

    setFilterMode(mode) {
        currentFilterMode = mode;
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.remove('active');
            if (tab.id.includes(mode === 'age-appropriate' ? 'age' : 'all')) {
                tab.classList.add('active');
            }
        });
        this.filterAndRenderApps();
    },

    toggleApp(appId) {
        const list = appData[currentByCategory].apps;
        const app = list.find(a => a.id === appId);
        if (app) {
            app.allowed = !app.allowed;
            this.saveState();
            // Refresh to update UI state in other tabs if needed
            if (currentTab === 'all') this.renderAllTab(); // Refresh All tab?
            // Actually renderCurrentTab is safer
            // this.renderCurrentTab(); // Might lose focus/scroll
        }
    },

    toggleYouTube(id) {
        const list = appData[currentByCategory].youtube;
        const item = list.find(x => x.id === id);
        if (item) {
            item.allowed = !item.allowed;
            this.saveState();
            if (currentTab === 'all') this.renderAllTab();
            else this.renderYouTubeTab();

            // Sync problem: If I toggle in 'All' tab, it re-renders and I lose focus. 
            // Ideally we just update the DOM class, but re-render is safer for prototype consistency.
        }
    },

    toggleWeb(id) {
        const list = appData[currentByCategory].web;
        const item = list.find(x => x.id === id);
        if (item) {
            item.allowed = !item.allowed;
            this.saveState();

            // Special handling for Web Tab (Split Lists)
            if (currentTab === 'web') {
                this.renderWebTab(); // Will move item between lists
            } else {
                this.renderAllTab();
            }
        }
    },

    toggleDropdown(event, id) {
        event.stopPropagation();
        this.closeAllMenus();
        const menu = document.getElementById(id);
        const appItem = event.currentTarget.closest('.app-item');
        if (appItem) {
            appItem.style.zIndex = '100';
            appItem.style.position = 'relative';
        }
        menu.style.display = 'block';
        setTimeout(() => menu.classList.add('visible'), 10);
    },

    closeAllMenus() {
        document.querySelectorAll('.app-item').forEach(item => {
            item.style.zIndex = '';
            item.style.position = '';
        });
        document.querySelectorAll('.menu-popup').forEach(menu => {
            menu.classList.remove('visible');
            setTimeout(() => { if (!menu.classList.contains('visible')) menu.style.display = 'none'; }, 150);
        });
    },

    changeAppCategory(appId, newCategoryKey) {
        // ... (Same logic as before, just search & splice)
        // Simplification for prototype: Find app, remove, add to target.
        let foundApp = null;
        Object.keys(appData).forEach(catKey => {
            const list = appData[catKey].apps;
            const idx = list.findIndex(a => a.id === appId);
            if (idx > -1) {
                foundApp = list[idx];
                list.splice(idx, 1);
            }
        });

        if (foundApp) {
            foundApp.category = newCategoryKey;
            appData[newCategoryKey].apps.push(foundApp);
            this.saveState();
            if (window.NotificationManager) NotificationManager.show(`Moved app to ${appData[newCategoryKey].name}`);
            this.renderCurrentTab();
        }
    },

    // Limit Handlers (Same as previous file mostly)
    toggleLimit() {
        const toggle = document.getElementById('limit-toggle');
        appData[currentByCategory].limitEnabled = toggle.checked;
        document.getElementById('limit-slider-wrapper').classList.toggle('disabled', !toggle.checked);
        this.saveState();
    },

    updateTimeDisplay() {
        const val = parseInt(document.getElementById('time-range').value);
        appData[currentByCategory].limitMinutes = val;
        this.updateTimeDisplayUI(val);
        this.saveState();
    },

    updateTimeDisplayUI(val) {
        const display = document.getElementById('time-value');
        if (val == 0) display.textContent = 'Blocked';
        else if (val >= 240) display.textContent = '4h+';
        else {
            const h = Math.floor(val / 60);
            const m = val % 60;
            display.textContent = h > 0 ? `${h}h ${m}m` : `${m}m`;
        }
    },

    toggleSessionLimit() {
        const toggle = document.getElementById('session-toggle');
        appData[currentByCategory].sessionLimitEnabled = toggle.checked;
        document.getElementById('session-slider-wrapper').classList.toggle('disabled', !toggle.checked);
        this.saveState();
    },

    updateSessionDisplay() {
        const val = parseInt(document.getElementById('session-range').value);
        appData[currentByCategory].sessionLimitMinutes = val;
        this.updateSessionDisplayUI(val, false);
        this.saveState();
    },

    addWebsite() {
        // Simple prompt for prototype
        const url = prompt("Enter website URL (e.g., example.com):");
        if (url) {
            let cleanUrl = url.toLowerCase().replace(/^https?:\/\//, '').replace(/^www\./, '');
            if (cleanUrl.endsWith('/')) cleanUrl = cleanUrl.slice(0, -1);

            if (cleanUrl.length < 3) return;

            const newSite = {
                id: `web-${Date.now()}`,
                name: cleanUrl,
                meta: 'Website', // Default meta
                icon: cleanUrl.charAt(0).toUpperCase(),
                allowed: true
            };

            if (!appData[currentByCategory].web) appData[currentByCategory].web = [];
            appData[currentByCategory].web.unshift(newSite);
            this.saveState();

            if (window.NotificationManager) NotificationManager.show(`Added ${cleanUrl}`);
            this.renderCurrentTab();
        }
    },

    updateSessionDisplayUI(val, isDisabled) {
        const display = document.getElementById('session-value');
        if (isDisabled) {
            display.innerHTML = '<span style="font-size: 16px; opacity: 0.8;">Matches Daily Limit</span>';
            return;
        }
        if (val >= 120) display.textContent = '2h';
        else {
            const h = Math.floor(val / 60);
            const m = val % 60;
            display.textContent = h > 0 ? `${h}h ${m}m` : `${m}m`;
        }
    },

    save() {
        window.history.back();
    }
};

document.addEventListener('DOMContentLoaded', () => CategoryHandlers.init());
