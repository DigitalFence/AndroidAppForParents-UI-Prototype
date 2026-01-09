// ===================================
// Profile Screen Handlers
// ===================================
const ProfileHandlers = {
    selectedRole: 'mother', // Default selection

    /**
     * Select avatar
     */
    selectAvatar(role, event) {
        if (event) {
            event.preventDefault();
        }

        this.selectedRole = role;

        // Save to localStorage for dashboard
        localStorage.setItem('parentRole', role);

        // Update UI - remove selected class from all options
        document.querySelectorAll('.avatar-option').forEach(option => {
            option.classList.remove('selected');
        });

        // Add selected class to clicked option
        const selectedOption = document.querySelector(`.avatar-option[data-role="${role}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
        }

        console.log('Avatar selected:', role);
    },

    /**
     * Validate phone number - must be exactly 10 digits
     */
    validatePhone(input) {
        // Only allow digits
        input.value = input.value.replace(/[^0-9]/g, '');

        const phoneNumber = input.value;
        const hintText = document.getElementById('phoneHint');
        const submitBtn = document.querySelector('.btn-primary[type="submit"]');

        // Reset
        input.style.borderColor = '';
        if (hintText) {
            hintText.textContent = '';
            hintText.style.color = '';
        }

        // If empty
        if (phoneNumber.length === 0) {
            if (submitBtn) submitBtn.disabled = false;
            return;
        }

        // Validate: exactly 10 digits
        if (phoneNumber.length === 10) {
            // Valid - show ONLY this message
            if (hintText) {
                hintText.textContent = '✓ Valid phone number';
                hintText.style.color = '#059669';
            }
            input.style.borderColor = '#6BCF7E';
            if (submitBtn) submitBtn.disabled = false;
        } else {
            // Invalid - show nothing, just red border
            input.style.borderColor = '#EF4444';
            if (submitBtn) submitBtn.disabled = true;
        }
    },

    /**
     * Submit profile form
     */
    submit: function (event) {
        event.preventDefault();

        const phoneInput = document.getElementById('phoneNumber');
        const phoneNumber = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';

        // Final validation - must be exactly 10 digits
        if (!phoneNumber || phoneNumber.length !== 10) {
            NotificationManager.show('Please enter a valid 10-digit phone number');
            if (phoneInput) phoneInput.focus();
            return;
        }

        console.log('Profile form submitted');
        console.log('Selected role:', this.selectedRole);
        console.log('Phone number:', phoneNumber);

        NotificationManager.show('Profile saved! Setting up your family...');

        // Navigate to family setup screen
        setTimeout(() => {
            window.location.href = 'family-setup.html';
        }, 1000);
    }
};

// Export for global use
window.ProfileHandlers = ProfileHandlers;

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initialize();
    console.log('Parental Control Prototype - Profile Screen');

    // Get email from URL parameter if available
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    if (email) {
        const emailInput = document.querySelector('input[type="email"]');
        if (emailInput) {
            emailInput.value = email;
        }
    }
});
