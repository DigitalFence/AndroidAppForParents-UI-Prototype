/* ===================================
   Monitor Screen JavaScript - Simplified
   =================================== */

const MonitorHandlers = {
    currentChild: null,

    /**
     * Initialize monitor screen
     */
    init() {
        this.loadChildData();
        this.animateCategoryBars();
        console.log('Monitor screen initialized');
    },

    /**
     * Load child-specific data from URL parameter
     */
    loadChildData() {
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child') || 'Leo';
        this.currentChild = childName;

        // Update header with child name
        const childNameElement = document.querySelector('.child-name');
        if (childNameElement) {
            childNameElement.textContent = `${childName}'s Activity`;
        }

        // Update avatar if different child
        const avatarImg = document.querySelector('.child-avatar-img');
        if (avatarImg && childName === 'Mia') {
            avatarImg.src = 'assets/child-mia.png';
            avatarImg.alt = 'Mia';
        }

        console.log(`Loaded data for ${childName}`);
    },

    /**
     * Animate category bars on load
     */
    animateCategoryBars() {
        const categoryFills = document.querySelectorAll('.category-fill');
        categoryFills.forEach((fill, index) => {
            const targetWidth = fill.style.width;
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = targetWidth;
            }, 300 + (index * 150));
        });
    },

    goBack() {
        const urlParams = new URLSearchParams(window.location.search);
        const childName = urlParams.get('child');
        let targetUrl = 'child-details.html';
        if (childName) targetUrl += `?child=${encodeURIComponent(childName)}`;
        window.location.href = targetUrl;
    },

    /**
     * Start Date Logic
     */
    currentDate: new Date(),
    currentViewMode: 'daily',

    formatDate(date) {
        if (this.currentViewMode === 'daily') return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
        if (this.currentViewMode === 'weekly') {
            // Mock week range
            return "Oct 24 - Oct 30";
        }
        if (this.currentViewMode === 'monthly') return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        return "";
    },

    changeView(mode) {
        this.currentViewMode = mode;
        // Update buttons
        const btns = document.querySelectorAll('.view-mode-btn');
        btns.forEach(b => {
            if (b.textContent.toLowerCase() === mode) b.classList.add('active');
            else b.classList.remove('active');
        });

        // Update labels
        const badge = document.querySelector('.date-badge');
        if (badge) {
            if (mode === 'daily') badge.textContent = 'TODAY';
            else if (mode === 'weekly') badge.textContent = 'THIS WEEK';
            else if (mode === 'monthly') badge.textContent = 'THIS MONTH';
        }

        this.updateDateDisplay();
    },

    updateDateDisplay() {
        document.getElementById('current-date-display').textContent = this.formatDate(this.currentDate);

        // Update Badge logic
        if (this.currentViewMode === 'daily') {
            const badge = document.querySelector('.date-badge');
            if (badge) {
                const now = new Date();
                const isToday = this.currentDate.getDate() === now.getDate() &&
                    this.currentDate.getMonth() === now.getMonth() &&
                    this.currentDate.getFullYear() === now.getFullYear();

                // Check if yesterday (approximate check for prototype)
                const yesterday = new Date();
                yesterday.setDate(now.getDate() - 1);
                const isYesterday = this.currentDate.getDate() === yesterday.getDate() &&
                    this.currentDate.getMonth() === yesterday.getMonth() &&
                    this.currentDate.getFullYear() === yesterday.getFullYear();

                if (isToday) badge.textContent = 'TODAY';
                else if (isYesterday) badge.textContent = 'YESTERDAY';
                else badge.textContent = this.currentDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
            }
        }

        this.simulateUsageData();
    },

    previousDay() {
        // Simple logic: doesn't handle week/month jumps realistically for prototype
        this.currentDate.setDate(this.currentDate.getDate() - 1);
        this.updateDateDisplay();
    },

    nextDay() {
        this.currentDate.setDate(this.currentDate.getDate() + 1);
        this.updateDateDisplay();
    },

    openDatePicker() {
        // Simple prompt for prototype
        const input = prompt("Enter date (YYYY-MM-DD):");
        if (input) {
            const d = new Date(input);
            if (!isNaN(d.getTime())) {
                this.currentDate = d;
                this.updateDateDisplay();
            }
        }
    },

    switchTab(tabName) {
        // Update Tabs
        const buttons = document.querySelectorAll('.stats-tab');
        buttons.forEach(btn => {
            const txt = btn.textContent.toLowerCase();
            if (txt === tabName || (tabName === 'all' && txt === 'all') || (tabName === 'app' && txt === 'apps')) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Show/Hide Sub-filters
        const subFilters = document.getElementById('yt-source-filters');
        if (subFilters) {
            if (tabName === 'youtube') {
                subFilters.classList.remove('hidden');
            } else {
                subFilters.classList.add('hidden');
            }
        }

        // Reset Source Filter UI to 'Both' when switching tabs, effectively showing all
        if (tabName === 'youtube') {
            this.filterSource('all');
            // return; // NO RETURN, we want to filter types too if any logic exists below
            // Actually my previous implementation had return. If I return, I need to make sure youtube item filter logic runs inside filterSource.
            // filterSource checks class .youtube-type.
            // But we also need to hide .app-type and .web-type!
            // My previous filterSource ONLY touches .youtube-type. It does NOT hide .app-type.

            // So I MUST NOT return early, I must proceed to hide non-youtube items.
            // Wait, my previous `switchTab` logic filter loop was:
            /*
            const items = document.querySelectorAll('.stat-item');
            items.forEach(item => { ... hides if not matching tab ... });
            */
            // If I return early, that loop doesn't run, so apps stay visible. 
            // I should fix that logic flaw from previous step if relevant.
        }

        // Filter List (Normal Tabs)
        const items = document.querySelectorAll('.stat-item');
        items.forEach(item => {
            if (tabName === 'all') {
                item.classList.remove('hidden');
            } else {
                if (item.classList.contains(`${tabName}-type`)) {
                    item.classList.remove('hidden');
                    // If we just showed it, we might need to apply sub-filter again?
                    // If tab is youtube, we just showed ALL youtube items.
                    // But we called filterSource('all') above, so all youtube items should be shown.
                    // Correct.
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    },

    filterSource(source) {
        // Update Chips matching the source
        const chips = document.querySelectorAll('.sub-filter-chip');
        chips.forEach(chip => {
            // Check text or logic. My HTML button for 'all' says "Both"
            const txt = chip.textContent.toLowerCase();
            if ((source === 'all' && txt === 'both') || txt === source) {
                chip.classList.add('active');
            } else {
                chip.classList.remove('active');
            }
        });

        // Filter YouTube Items
        // Start by ensuring all YT items are candidates (if we are in YT tab)
        const items = document.querySelectorAll('.youtube-type');
        items.forEach(item => {
            const itemSource = item.getAttribute('data-source');
            if (source === 'all') {
                item.classList.remove('hidden');
            } else {
                if (itemSource === source) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    },

    /**
     * Simulate Data for Prototype
     */
    simulateUsageData() {
        let multiplier = 1;
        if (this.currentViewMode === 'weekly') multiplier = 6;
        if (this.currentViewMode === 'monthly') multiplier = 25;

        // Randomize Total Time
        const h = (Math.floor(Math.random() * 4) + 1) * multiplier;
        const m = Math.floor(Math.random() * 60);
        document.getElementById('total-time').textContent = `${h}h ${m}m`;

        // Update Stat Times randomly
        const times = document.querySelectorAll('.stat-time');
        times.forEach(t => {
            const rm = (Math.floor(Math.random() * 59) + 5) * multiplier;
            // Format nicer if huge
            if (rm > 120) {
                t.textContent = `${Math.floor(rm / 60)}h ${rm % 60}m`;
            } else {
                t.textContent = `${rm}m`;
            }
        });

        // Update Category Bars
        const barTimes = document.querySelectorAll('.bar-time');
        barTimes.forEach(bt => {
            const baseH = Math.floor(Math.random() * 2);
            const baseM = Math.floor(Math.random() * 59);
            let totalM = (baseH * 60 + baseM) * multiplier;

            const finalH = Math.floor(totalM / 60);
            const finalM = totalM % 60;
            bt.textContent = finalH > 0 ? `${finalH}h ${finalM}m` : `${finalM}m`;
        });

        const bars = document.querySelectorAll('.progress-fill');
        bars.forEach(bar => {
            const width = Math.floor(Math.random() * 70) + 15; // 15% to 85%
            bar.style.width = `${width}%`;
        });

        console.log("Updated usage stats for " + this.formatDate(this.currentDate));
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initialize();
    MonitorHandlers.init();
});
