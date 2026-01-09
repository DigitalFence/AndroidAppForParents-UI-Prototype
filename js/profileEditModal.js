// ===================================
// Profile Edit Modal Handler
// ===================================
const ProfileEditModal = {
    open: function () {
        const modal = document.getElementById('profileEditModal');
        const nameInput = document.getElementById('profileName');
        const emailInput = document.getElementById('profileEmail');
        const phoneInput = document.getElementById('profilePhone');

        // Pre-fill with current values
        nameInput.value = 'Parth';
        emailInput.value = 'parth@example.com';
        phoneInput.value = '9876543210';

        // Show modal
        modal.style.display = 'flex';

        // Focus name input
        setTimeout(() => nameInput.focus(), 100);

        // Validate phone on load
        this.validatePhone();
    },

    close: function (event) {
        if (event && event.target.id !== 'profileEditModal' && event.type === 'click') {
            return;
        }

        const modal = document.getElementById('profileEditModal');
        modal.style.display = 'none';
        this.hidePhoneValidation();
    },

    validatePhone: function () {
        const phoneInput = document.getElementById('profilePhone');
        const phoneNumber = phoneInput.value.replace(/\D/g, ''); // Remove non-digits
        const errorDiv = document.getElementById('phoneValidationError');
        const successDiv = document.getElementById('phoneValidationSuccess');
        const saveBtn = document.getElementById('profileSaveBtn');

        // Hide both messages first
        errorDiv.style.display = 'none';
        successDiv.style.display = 'none';
        phoneInput.style.borderColor = 'rgba(0,0,0,0.1)';

        // If empty, disable save
        if (phoneNumber.length === 0) {
            saveBtn.disabled = true;
            return;
        }

        // Validate: exactly 10 digits
        if (phoneNumber.length === 10) {
            // Valid
            successDiv.style.display = 'block';
            phoneInput.style.borderColor = '#6BCF7E';
            saveBtn.disabled = false;
        } else {
            // Invalid
            errorDiv.style.display = 'block';
            phoneInput.style.borderColor = '#EF4444';
            saveBtn.disabled = true;
        }
    },

    hidePhoneValidation: function () {
        const errorDiv = document.getElementById('phoneValidationError');
        const successDiv = document.getElementById('phoneValidationSuccess');
        const phoneInput = document.getElementById('profilePhone');

        if (errorDiv) errorDiv.style.display = 'none';
        if (successDiv) successDiv.style.display = 'none';
        if (phoneInput) phoneInput.style.borderColor = 'rgba(0,0,0,0.1)';
    },

    handlePhoneInput: function (input) {
        // Only allow digits
        input.value = input.value.replace(/[^0-9]/g, '');

        // Limit to 10 digits
        if (input.value.length > 10) {
            input.value = input.value.slice(0, 10);
        }

        // Validate after input
        this.validatePhone();
    },

    save: function () {
        const name = document.getElementById('profileName').value.trim();
        const email = document.getElementById('profileEmail').value.trim();
        const phone = document.getElementById('profilePhone').value.replace(/\D/g, '');

        // Validate all fields
        if (!name || !email || phone.length !== 10) {
            NotificationManager.show('Please fill all fields correctly');
            return;
        }

        // Format phone for display
        const formattedPhone = `+91 ${phone.slice(0, 5)} ${phone.slice(5)}`;

        // Update profile display in settings
        const profileDesc = document.querySelector('.profile-item .setting-desc');
        if (profileDesc) {
            profileDesc.textContent = `${name} • ${email} • ${formattedPhone}`;
        }

        console.log('Profile updated:', { name, email, phone });
        NotificationManager.show('Profile updated successfully');

        // Close modal
        this.close();
    }
};

// Export for global use
window.ProfileEditModal = ProfileEditModal;
