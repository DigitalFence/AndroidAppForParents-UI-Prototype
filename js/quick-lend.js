/**
 * Quick Lend Handlers
 * Manages the logic for lending device time.
 */

const QuickLendHandlers = {
    timerInterval: null,
    totalSecondsRemaining: 0,
    selectedMinutes: 30, // Default selected time
    isUnlimited: false,
    isUnlimitedActive: false,

    /**
     * Open the Quick Lend Modal
     */
    openModal() {
        const modal = document.getElementById('quick-lend-modal');
        if (modal) {
            modal.classList.add('active');

            // Re-render UI based on whether there's an ongoing timer or not
            if (this.totalSecondsRemaining > 0 || this.isUnlimitedActive) {
                this.showActiveTimerUI();
            } else {
                this.showSelectionUI();
            }
        }
    },

    /**
     * Close the Quick Lend Modal
     */
    closeModal() {
        const modal = document.getElementById('quick-lend-modal');
        if (modal) {
            modal.classList.remove('active');
        }
    },

    /**
     * Select a predefined time
     * @param {number|string} minutes - Number of minutes or 'unlimited'
     * @param {HTMLElement} btnElement 
     */
    selectTime(minutes, btnElement) {
        if (this.totalSecondsRemaining > 0 || this.isUnlimitedActive) return; // Prevent selection if timer is active

        this.selectedMinutes = minutes;
        this.isUnlimited = (minutes === 'unlimited');

        // Update active class on buttons
        const allBtns = document.querySelectorAll('.ql-time-btn');
        allBtns.forEach(btn => btn.classList.remove('active'));

        if (btnElement) {
            btnElement.classList.add('active');
        } else {
            // Find by data attribute if not passed
            const targetBtn = document.querySelector(`.ql-time-btn[data-minutes="${minutes}"]`);
            if (targetBtn) targetBtn.classList.add('active');
        }

        // Hide custom input if it was visible
        const customWrapper = document.getElementById('ql-custom-input-wrapper');
        if (customWrapper) customWrapper.classList.remove('visible');
    },

    /**
     * Toggle custom time input visibility
     */
    toggleCustomTime() {
        if (this.totalSecondsRemaining > 0 || this.isUnlimitedActive) return;

        // Deselect standard buttons
        const allBtns = document.querySelectorAll('.ql-time-btn');
        allBtns.forEach(btn => btn.classList.remove('active'));

        const customWrapper = document.getElementById('ql-custom-input-wrapper');
        if (customWrapper) {
            customWrapper.classList.toggle('visible');
            if (customWrapper.classList.contains('visible')) {
                const hrInput = document.getElementById('ql-custom-hr-input');
                const minInput = document.getElementById('ql-custom-min-input');
                if (hrInput) hrInput.focus();
                this.onCustomTimeInput();
            } else {
                // Re-select default if hiding custom input without starting
                this.selectTime(30);
            }
        }
    },

    /**
     * Update custom time value
     */
    onCustomTimeInput() {
        const hrInput = document.getElementById('ql-custom-hr-input');
        const minInput = document.getElementById('ql-custom-min-input');

        let hrs = hrInput ? (parseInt(hrInput.value) || 0) : 0;
        let mins = minInput ? (parseInt(minInput.value) || 0) : 0;

        // Basic clamp to avoid negative
        hrs = Math.max(0, hrs);
        mins = Math.max(0, Math.min(59, mins));

        const totalMins = (hrs * 60) + mins;
        if (totalMins > 0) {
            this.selectedMinutes = totalMins;
            this.isUnlimited = false;
        } else {
            this.selectedMinutes = 0; // Indicate no valid time selected
        }
    },

    /**
     * Handle the primary action (Done/Start)
     */
    handleDoneAction() {
        if (this.totalSecondsRemaining > 0 || this.isUnlimitedActive) {
            // If timer is already running, "Done" just closes the modal
            this.closeModal();
            return;
        }

        // Check if custom time is open, make sure we use that value
        const customWrapper = document.getElementById('ql-custom-input-wrapper');
        if (customWrapper && customWrapper.classList.contains('visible')) {
            this.onCustomTimeInput();
            if (this.selectedMinutes === 0) {
                NotificationManager.show('Please enter a valid amount of time.', 'error');
                return;
            }
        }

        if (this.isUnlimited) {
            this.startUnlimitedTime();
        } else {
            this.startTimer(this.selectedMinutes);
        }
    },

    /**
     * Start the countdown timer
     * @param {number} minutes 
     */
    startTimer(minutes) {
        this.totalSecondsRemaining = minutes * 60;
        this.isUnlimitedActive = false;

        this.showActiveTimerUI();
        this.updateTimerDisplay();

        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            this.totalSecondsRemaining--;
            this.updateTimerDisplay();

            if (this.totalSecondsRemaining <= 0) {
                this.stopTimer();
                NotificationManager.show('Lent time has expired.', 'warning');
            }
        }, 1000); // 1-second interval

        NotificationManager.show(`Added ${minutes} minutes of device time.`, 'success');
        this.updateParentDashboardToggles(true);
    },

    /**
     * Start unlimited usage
     */
    startUnlimitedTime() {
        this.isUnlimitedActive = true;
        this.totalSecondsRemaining = 0; // doesn't matter, but helps checks
        clearInterval(this.timerInterval);

        this.showActiveTimerUI();
        this.updateTimerDisplay();

        NotificationManager.show(`Device unblocked with no time limit.`, 'success');
        this.updateParentDashboardToggles(true);
    },

    /**
     * Cancel/Stop current timer
     */
    cancelTimer() {
        this.stopTimer();
        this.showSelectionUI();
        NotificationManager.show('Device access restricted again.', 'info');
    },

    /**
     * Complete reset of timer state
     */
    stopTimer() {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
        this.totalSecondsRemaining = 0;
        this.isUnlimitedActive = false;
        this.updateParentDashboardToggles(false);
    },

    /**
     * Update the timer display DOM
     */
    updateTimerDisplay() {
        const timeDisplay = document.getElementById('ql-active-time-display');
        const timeLabel = document.querySelector('.ql-timer-display .label');
        if (!timeDisplay) return;

        if (this.isUnlimitedActive) {
            timeDisplay.textContent = 'NO LIMIT';
            if (timeLabel) timeLabel.textContent = 'Device Unblocked';
            return;
        }

        if (this.totalSecondsRemaining <= 0) {
            timeDisplay.textContent = '00 : 00';
            if (timeLabel) timeLabel.textContent = 'Time Remaining';
            return;
        }

        if (timeLabel) timeLabel.textContent = 'Time Remaining';

        // Handle displaying HR : MIN : SEC if over an hour, or MIN : SEC
        const hrs = Math.floor(this.totalSecondsRemaining / 3600);
        const mins = Math.floor((this.totalSecondsRemaining % 3600) / 60);
        const secs = this.totalSecondsRemaining % 60;

        if (hrs > 0) {
            timeDisplay.textContent = `${hrs.toString()}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            timeDisplay.textContent = `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
        }
    },

    /**
     * Show UI for selecting time
     */
    showSelectionUI() {
        const selectorContainer = document.getElementById('ql-selector-container');
        const activeContainer = document.getElementById('ql-active-container');

        if (selectorContainer) selectorContainer.style.display = 'flex';
        if (activeContainer) activeContainer.style.display = 'none';

        // Reset to default selection
        this.selectTime(30);
    },

    /**
     * Show UI for active timer countdown
     */
    showActiveTimerUI() {
        const selectorContainer = document.getElementById('ql-selector-container');
        const activeContainer = document.getElementById('ql-active-container');
        const customWrapper = document.getElementById('ql-custom-input-wrapper');

        if (selectorContainer) selectorContainer.style.display = 'none';
        if (activeContainer) activeContainer.style.display = 'flex';
        if (customWrapper) customWrapper.classList.remove('visible');
    },

    /**
     * Reset modal state without stopping timer
     */
    resetModalState() {
        // Do nothing special, UI logic handles based on totalSecondsRemaining
    },

    /**
     * View history (Placeholder)
     */
    viewHistory() {
        console.log('View Quick Lend history clicked');
        NotificationManager.show('History feature coming soon.', 'info');
    },

    /**
     * Helper to sync toggle switches on parent dashboard if they exist
     * @param {boolean} isOn 
     */
    updateParentDashboardToggles(isOn) {
        // This is a naive implementation assuming the clicked child card toggle is the one to update.
        // In a real app, this would be tied to a specific child ID state.
        const toggles = document.querySelectorAll('.child-card .toggle-switch input');
        toggles.forEach(toggle => {
            // Only update if we're on the dashboard
            if (toggle) toggle.checked = isOn;
        });
    }
};

// Expose to window for inline HTML handlers
window.QuickLendHandlers = QuickLendHandlers;
