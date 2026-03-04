/**
 * Handlers for the Profile Recognition and Auth mockups
 */

const ProfileAuthHandlers = {
    // Basic state for the mock PIN pad
    currentPin: "",
    maxPinLength: 4,

    /**
     * Simulate a 2-second Face ID scan, then identify as Parent
     */
    simulateFaceScan() {
        const scanStatus = document.getElementById('scanStatus');
        const scanSubtext = document.getElementById('scanSubtext');
        const faceMock = document.querySelector('.face-scanner-mock');
        const identifiedState = document.getElementById('identifiedState');
        const actionArea = document.querySelector('.auth-actions');

        // Initial state is scanning
        setTimeout(() => {
            if (scanStatus) scanStatus.textContent = "Analyzing...";
        }, 1200);

        // After 2.5 seconds, simulate successful identification of mother
        setTimeout(() => {
            if (faceMock && identifiedState) {
                // Hide scanner, show success
                faceMock.style.display = 'none';
                actionArea.style.display = 'none';
                identifiedState.style.display = 'flex';

                // Update the button text to match the identified name
                const btnConfirm = document.getElementById('btnConfirmProfile');
                const name = document.getElementById('recognizedName').textContent;
                if (btnConfirm) btnConfirm.textContent = `Continue as ${name}`;

                // We no longer auto-redirect here. We wait for the user to click "Continue".
            }
        }, 3000);
    },

    /**
     * Handle user confirming their detected profile
     */
    confirmProfile() {
        const btnConfirm = document.getElementById('btnConfirmProfile');
        if (btnConfirm) {
            btnConfirm.innerHTML = '<span class="material-symbols-outlined spin" style="font-size: 20px;">progress_activity</span> Signing in...';
            btnConfirm.style.opacity = '0.8';
            btnConfirm.style.pointerEvents = 'none';
        }

        setTimeout(() => {
            window.location.href = 'parent-dashboard-childcard-layout1.html';
        }, 800);
    },

    /**
     * Handle key press on PIN pad
     * @param {number} num 
     */
    pressKey(num) {
        if (this.currentPin.length >= this.maxPinLength) return;

        this.currentPin += num;
        this.updateDots();

        // If full, verify
        if (this.currentPin.length === this.maxPinLength) {
            this.verifyPin();
        }
    },

    /**
     * Delete last entered PIN digit
     */
    deleteKey() {
        if (this.currentPin.length > 0) {
            this.currentPin = this.currentPin.slice(0, -1);
            this.updateDots();
        }
    },

    /**
     * Update visual dot indicators
     */
    updateDots() {
        const dotsContainer = document.getElementById('pinDots');
        if (!dotsContainer) return;

        // Remove error state if typing
        dotsContainer.classList.remove('error');

        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index < this.currentPin.length) {
                dot.classList.add('filled');
            } else {
                dot.classList.remove('filled');
            }
        });
    },

    /**
     * Mock Verification Logic
     * 1234 -> Parent
     * 0000 -> Child (Leo)
     * Other -> Error
     */
    verifyPin() {
        const dotsContainer = document.getElementById('pinDots');
        const successOverlay = document.getElementById('passcodeSuccessOverlay');
        const avatarImg = document.getElementById('passcodeRecognizedAvatar');
        const nameText = document.getElementById('passcodeRecognizedName');

        // Slight delay to allow dot to fill visually before processing
        setTimeout(() => {
            if (this.currentPin === "0000") {
                // Success Child
                avatarImg.src = 'assets/child-leo.png';
                nameText.textContent = "Leo";
                successOverlay.style.display = "flex";

                setTimeout(() => {
                    window.location.href = 'child-details.html';
                }, 1500);

            } else {
                // Error Shake
                if (dotsContainer) dotsContainer.classList.add('error');

                // Reset after shake animation
                setTimeout(() => {
                    this.currentPin = "";
                    this.updateDots();
                }, 600);
            }
        }, 100);
    }
};
