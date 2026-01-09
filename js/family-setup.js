// ===================================
// Family Setup Screen Handlers
// ===================================
const FamilySetupHandlers = {
    /**
     * Handle create family action
     */
    createFamily() {
        // Navigate to device type selection
        window.location.href = 'device-type-selection.html';
    },

    /**
     * Handle join family action
     */
    joinFamily() {
        // Navigate to join family screen
        window.location.href = 'join-family.html';
    }
};
