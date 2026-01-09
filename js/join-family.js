// ===================================
// Join Family Screen Handlers - Redesigned
// ===================================
const JoinFamilyHandlers = {
    /**
     * Switch between tabs
     */
    switchTab(tabName) {
        // Remove active class from all tabs
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });

        // Remove active class from all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });

        // Add active class to selected tab
        const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
        if (selectedTab) {
            selectedTab.classList.add('active');
        }

        // Show corresponding content
        const content = document.getElementById(`${tabName}-content`);
        if (content) {
            content.classList.add('active');
        }

        console.log('Switched to tab:', tabName);
    },

    /**
     * Validate 6-digit invitation code
     */
    validateCode(input) {
        // Only allow alphanumeric characters
        input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, '');

        const code = input.value;
        const hint = document.getElementById('codeHint');
        const submitBtn = document.getElementById('submitBtn');

        // Reset
        hint.textContent = '';
        hint.style.color = '';
        input.style.borderColor = '';

        // If empty
        if (code.length === 0) {
            submitBtn.disabled = true;
            return;
        }

        // Validate: exactly 6 characters
        if (code.length === 6) {
            // Valid
            hint.textContent = '✓ Valid invitation code';
            hint.style.color = '#059669';
            input.style.borderColor = '#6BCF7E';
            submitBtn.disabled = false;
        } else {
            // Invalid - red border only
            input.style.borderColor = '#EF4444';
            submitBtn.disabled = true;
        }
    },

    /**
     * Submit join request
     */
    submit() {
        const code = document.getElementById('invitationCode').value;

        // Final validation
        if (code.length !== 6) {
            NotificationManager.show('Please enter a valid 6-digit code');
            return;
        }

        console.log('Join request submitted with code:', code);
        NotificationManager.show('Join request sent! Waiting for approval...');

        // In production: Send request to backend
        // Simulate approval and navigate to device setup
        setTimeout(() => {
            window.location.href = 'device-type-selection.html';
        }, 1500);
    },

    /**
     * Select existing family to manage
     */
    selectFamily(familyId) {
        console.log('Selected family:', familyId);
        NotificationManager.show('Loading family...');

        // Navigate to device setup
        setTimeout(() => {
            window.location.href = 'family-management.html';
        }, 500);
    }
};

// Export for global use
window.JoinFamilyHandlers = JoinFamilyHandlers;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initialize();
    console.log('Join Family Screen - Redesigned');
});
