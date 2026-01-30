const WebsiteRules = {
    init() {
        console.log('Website Rules initialized');
        // Load settings if needed
    },

    toggleAddModal() {
        const modal = document.getElementById('add-rule-modal');
        if (modal) {
            const isVisible = modal.style.display === 'flex';
            modal.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                // Focus input
                setTimeout(() => document.getElementById('new-site-url').focus(), 100);
            }
        }
    },

    addRule() {
        const input = document.getElementById('new-site-url');
        const url = input.value.trim();

        if (!url) {
            alert('Please enter a website URL');
            return;
        }

        // Determine list (Blocked vs Allowed) based on segment control
        // Since I didn't implement robust segment logic in HTML, let's assume 'Block' is default or selected.
        const startBlocked = document.querySelector('.segment.active').innerText.includes('Block');
        const listId = startBlocked ? 'blocked-sites-list' : 'allowed-sites-list';
        const list = document.getElementById(listId);

        // Create Item HTML (Simplified for prototype)
        const div = document.createElement('div');
        div.className = `rule-item ${startBlocked ? 'blocked' : ''}`;
        const favicon = url.charAt(0).toUpperCase();

        div.innerHTML = `
            <div class="item-icon">
                ${favicon}
            </div>
            <div class="item-details">
                <h3 class="item-name">${url}</h3>
                <p class="item-meta">User Added</p>
            </div>
            <label class="toggle-switch">
                <input type="checkbox" ${!startBlocked ? 'checked' : ''} onchange="WebsiteRules.toggleSite('${url}')">
                <span class="slider"></span>
            </label>
        `;

        // Add to top
        list.insertBefore(div, list.firstChild);

        // Update counts (Mock logic)
        this.updateCounts();

        // Close modal
        this.toggleAddModal();
        input.value = '';

        if (window.NotificationManager) {
            NotificationManager.show(`Added rule for ${url}`);
        }
    },

    toggleSite(url) {
        console.log('Toggled site:', url);
        // In a real app, we'd move the DOM element between lists
        // For prototype, let's just toggle 'blocked' class visually on the item
        // But finding the specific element might be hard without ID. 
        // Let's assume the event target context helps, but simplest is just visual feedback or full reload.

        // Let's just create a toast
        if (window.NotificationManager) {
            NotificationManager.show('Rule updated');
        }
    },

    updateCounts() {
        // Mock function to update header counts if needed
    }
};

document.addEventListener('DOMContentLoaded', () => WebsiteRules.init());
