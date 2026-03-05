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
    },

    /**
     * Initialize Pattern Lock Interaction
     */
    initPatternLock() {
        const grid = document.getElementById('patternGrid');
        const svgLines = document.getElementById('patternLines');
        const feedback = document.getElementById('patternFeedback');

        if (!grid || !svgLines || !feedback) return;

        let isDrawing = false;
        let patternSequence = []; // Will hold node IDs
        let nodesMap = new Map(); // id -> DOM element

        // Cache node positions
        document.querySelectorAll('.pattern-node').forEach(node => {
            const id = node.getAttribute('data-id');
            nodesMap.set(id, node);
        });

        // Helper to update SVG lines
        const drawLines = () => {
            let html = '';
            for (let i = 0; i < patternSequence.length - 1; i++) {
                const n1 = nodesMap.get(patternSequence[i]);
                const n2 = nodesMap.get(patternSequence[i + 1]);

                // Get coords relative to grid
                const gridRect = grid.getBoundingClientRect();
                const r1 = n1.getBoundingClientRect();
                const r2 = n2.getBoundingClientRect();

                const x1 = r1.left + r1.width / 2 - gridRect.left;
                const y1 = r1.top + r1.height / 2 - gridRect.top;
                const x2 = r2.left + r2.width / 2 - gridRect.left;
                const y2 = r2.top + r2.height / 2 - gridRect.top;

                html += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="rgba(255,255,255,0.8)" stroke-width="4" />`;
            }
            svgLines.innerHTML = html;
        };

        const getNodeFromEvent = (e) => {
            let clientX, clientY;
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else if (e.changedTouches && e.changedTouches.length > 0) {
                clientX = e.changedTouches[0].clientX;
                clientY = e.changedTouches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }

            if (clientX === undefined || clientY === undefined) return null;

            // Use mathematical bounds checking instead of elementFromPoint
            // as it is much more robust during fast touch drags.
            let foundNode = null;
            nodesMap.forEach((el, id) => {
                const rect = el.getBoundingClientRect();
                // Add a small forgiving padding to the touch hit area (about 20px)
                const hitPadding = 20;

                if (clientX >= (rect.left - hitPadding) && clientX <= (rect.right + hitPadding) &&
                    clientY >= (rect.top - hitPadding) && clientY <= (rect.bottom + hitPadding)) {
                    foundNode = el;
                }
            });

            return foundNode;
        };

        const handleStart = (e) => {
            e.preventDefault();
            const node = getNodeFromEvent(e);

            // Reset previous
            document.querySelectorAll('.pattern-node').forEach(n => n.classList.remove('active', 'error'));
            svgLines.innerHTML = '';
            patternSequence = [];
            feedback.textContent = "Release when done.";
            feedback.style.color = "rgba(255,255,255,0.7)";

            if (node) {
                isDrawing = true;
                const id = node.getAttribute('data-id');
                patternSequence.push(id);
                node.classList.add('active');
            }
        };

        const handleMove = (e) => {
            if (!isDrawing) return;
            e.preventDefault();

            const node = getNodeFromEvent(e);
            if (node) {
                const id = node.getAttribute('data-id');
                // Only add if it's new
                if (patternSequence[patternSequence.length - 1] !== id) {
                    if (!patternSequence.includes(id)) {
                        patternSequence.push(id);
                        node.classList.add('active');
                        drawLines();
                    }
                }
            }
        };

        const handleEnd = (e) => {
            if (!isDrawing) return;
            isDrawing = false;

            if (patternSequence.length < 3) {
                feedback.textContent = "Connect at least 3 dots.";
                feedback.style.color = "#EF4444";
                document.querySelectorAll('.pattern-node').forEach(n => n.classList.remove('active'));
                svgLines.innerHTML = '';
                patternSequence = [];
                return;
            }

            // Verify
            this.verifyPattern(patternSequence.join('-'));
        };

        // Attach events
        grid.addEventListener('mousedown', handleStart);
        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleEnd);

        grid.addEventListener('touchstart', handleStart, { passive: false });
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleEnd);
    },

    /**
     * Mock Verify Pattern
     * Parent: 1-5-9-8-7
     * Child: 1-4-7-8-9
     */
    verifyPattern(sequenceString) {
        const feedback = document.getElementById('patternFeedback');
        const successOverlay = document.getElementById('patternSuccessOverlay');
        const avatarImg = document.getElementById('patternRecognizedAvatar');
        const nameText = document.getElementById('patternRecognizedName');

        if (sequenceString === "1-4-7-8-9") {
            // Child Success
            feedback.textContent = "Pattern Accepted";
            feedback.style.color = "#10B981";
            avatarImg.src = 'assets/child-leo.png';
            nameText.textContent = "Leo";
            setTimeout(() => {
                successOverlay.style.display = "flex";
                setTimeout(() => window.location.href = 'child-details.html', 1500);
            }, 300);
        } else {
            // Error
            feedback.textContent = "Incorrect pattern. Try again.";
            feedback.style.color = "#EF4444";
            const svgLines = document.getElementById('patternLines');

            // Flash red
            document.querySelectorAll('.pattern-node.active').forEach(n => {
                n.classList.remove('active');
                n.classList.add('error');
            });

            if (svgLines.querySelector('line')) {
                svgLines.querySelectorAll('line').forEach(l => l.setAttribute('stroke', '#EF4444'));
            }

            // Reset
            setTimeout(() => {
                document.querySelectorAll('.pattern-node.error').forEach(n => n.classList.remove('error'));
                svgLines.innerHTML = '';
            }, 1000);
        }
    }
};
