/* ===================================
   Add Child Profile JavaScript
   =================================== */

let selectedTemplate = null;
let uploadedAvatar = null;
let selectedGender = null;
let selectedAvatarUrl = null;
let templatesExpanded = false;
let recommendedTemplate = null;

// Age-appropriate realistic avatar images
const avatarImages = {
    boy: {
        young: [
            'assets/avatars/boy-young-1.png',
            'assets/avatars/boy-young-2.png'
        ],
        teen: [
            'assets/avatars/boy-teen-1.png',
            'assets/avatars/boy-teen-2.png'
        ]
    },
    girl: {
        young: [
            'assets/avatars/girl-young-1.png',
            'assets/avatars/girl-young-2.png'
        ],
        teen: [
            'assets/avatars/girl-teen-1.png',
            'assets/avatars/girl-teen-2.png'
        ]
    }
};

const AddChildHandlers = {
    /**
     * Initialize the page
     */
    init() {
        // Avatar upload handling
        document.getElementById('avatar-input').addEventListener('change', this.handleAvatarUpload);

        // Gender selection
        document.querySelectorAll('.gender-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectGender(e.currentTarget));
        });

        // Template card selection with toggle
        document.querySelectorAll('.template-card').forEach(card => {
            card.addEventListener('click', (e) => {
                const template = e.currentTarget.dataset.template;
                this.toggleTemplate(template, e.currentTarget);
            });
        });

        // Auto-update template and avatars based on year of birth
        document.getElementById('child-yob').addEventListener('input', this.handleYOBChange);

        // Check if editing a child
        const urlParams = new URLSearchParams(window.location.search);
        const mode = urlParams.get('mode');
        const childName = urlParams.get('child');

        if (mode === 'edit' && childName) {
            this.setupEditMode(childName);
        }
    },

    setupEditMode(childName) {
        // Update UI Text
        document.querySelector('.header-title').textContent = 'Edit Child Profile';
        document.querySelector('.create-profile-btn span:first-child').textContent = 'Save Changes';

        // Check Local Storage or mock defaults
        const existingProfiles = JSON.parse(localStorage.getItem('childProfiles') || '[]');
        let profile = existingProfiles.find(p => p.name.toLowerCase() === childName.toLowerCase());

        // Default mock fallback if not in local storage
        if (!profile) {
            const currentYear = new Date().getFullYear();
            if (childName === 'Leo') {
                profile = { name: 'Leo', yearOfBirth: currentYear - 8, gender: 'boy', avatar: 'assets/child-leo.png', template: 'moderate' };
            } else if (childName === 'Mia') {
                profile = { name: 'Mia', yearOfBirth: currentYear - 12, gender: 'girl', avatar: 'assets/child-mia.png', template: 'moderate' };
            }
        }

        if (profile) {
            // Populate fields
            document.getElementById('child-name').value = profile.name;
            if (profile.yearOfBirth) {
                document.getElementById('child-yob').value = profile.yearOfBirth;
            }

            // Populate avatar
            if (profile.avatar) {
                const avatarCircle = document.getElementById('avatar-circle');
                avatarCircle.innerHTML = `<img src="${profile.avatar}" alt="Avatar">`;
                selectedAvatarUrl = profile.avatar;
            }

            // Populate gender
            if (profile.gender) {
                const genderBtn = document.querySelector(`.gender-btn[data-gender="${profile.gender}"]`);
                if (genderBtn) this.selectGender(genderBtn);
            }

            // Populate template
            if (profile.template) {
                const templateCard = document.querySelector(`.template-card[data-template="${profile.template}"]`);
                if (templateCard) {
                    // Temporarily mock Age processing if YOB is inputted to display template suggestions implicitly:
                    this.handleYOBChange();
                    this.toggleTemplate(profile.template, templateCard);
                }
            }
        }
    },

    /**
     * Handle avatar photo upload
     */
    handleAvatarUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const avatarCircle = document.getElementById('avatar-circle');
                avatarCircle.innerHTML = `<img src="${e.target.result}" alt="Avatar">`;
                uploadedAvatar = e.target.result;
                selectedAvatarUrl = null;
            };
            reader.readAsDataURL(file);
        }
    },

    /**
     * Select gender
     */
    selectGender(btn) {
        document.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedGender = btn.dataset.gender;

        // Update avatar suggestions
        this.updateAvatarSuggestions();
    },

    updateAvatarSuggestions() {
        const yob = parseInt(document.getElementById('child-yob').value);
        const currentYear = new Date().getFullYear();
        const age = currentYear - yob;

        if (!selectedGender || !yob || age < 5 || age > 17) {
            document.getElementById('avatar-suggestions').classList.remove('show');
            document.getElementById('suggestions-label').classList.remove('show');
            return;
        }

        const ageGroup = age <= 9 ? 'young' : 'teen';
        const images = avatarImages[selectedGender][ageGroup];

        const container = document.getElementById('avatar-suggestions');
        container.innerHTML = '';

        images.forEach(imageUrl => {
            const btn = document.createElement('button');
            btn.className = 'avatar-suggestion';
            btn.innerHTML = `<img src="${imageUrl}" alt="Avatar" style="width: 100%; height: 100%; object-fit: cover; border-radius: 14px;">`;
            btn.onclick = () => this.selectAvatarImage(imageUrl, btn);
            container.appendChild(btn);
        });

        container.classList.add('show');
        document.getElementById('suggestions-label').classList.add('show');
    },

    /**
     * Select avatar image
     */
    selectAvatarImage(imageUrl, btn) {
        // Clear previous selection
        document.querySelectorAll('.avatar-suggestion').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');

        selectedAvatarUrl = imageUrl;
        uploadedAvatar = null;

        // Update avatar circle
        const avatarCircle = document.getElementById('avatar-circle');
        avatarCircle.innerHTML = `<img src="${imageUrl}" alt="Avatar">`;
    },

    /**
     * Toggle template selection (click again to deselect)
     */
    toggleTemplate(template, card) {
        // If clicking the already selected template, deselect it
        if (selectedTemplate === template) {
            card.classList.remove('active');
            selectedTemplate = null;
            NotificationManager.show('Template deselected. You can set up controls manually later.', 'info');
        } else {
            // Remove previous selection
            document.querySelectorAll('.template-card').forEach(c => {
                c.classList.remove('active');
            });

            // Select new template
            card.classList.add('active');
            selectedTemplate = template;
        }
    },

    /**
     * Toggle showing all templates
     */
    toggleAllTemplates() {
        const btn = document.getElementById('expand-templates-btn');
        const allCards = document.querySelectorAll('.template-card');

        templatesExpanded = !templatesExpanded;

        if (templatesExpanded) {
            // Show all templates
            allCards.forEach(card => card.classList.remove('hidden'));
            btn.classList.add('expanded');
            btn.innerHTML = '<span class="material-symbols-outlined">expand_less</span> Show Less';
        } else {
            // Show only recommended
            allCards.forEach(card => {
                if (card.dataset.template !== recommendedTemplate) {
                    card.classList.add('hidden');
                }
            });
            btn.classList.remove('expanded');
            btn.innerHTML = '<span class="material-symbols-outlined">expand_more</span> See Other Templates';
        }
    },

    /**
     * Show template suggestions based on age
     */
    showTemplateSuggestions(age) {
        const templateSection = document.getElementById('template-section');

        if (age >= 5 && age <= 17) {
            templateSection.style.display = 'block';

            // Determine recommended template based on age
            if (age >= 5 && age <= 7) {
                recommendedTemplate = 'conservative';
            } else if (age >= 8 && age <= 12) {
                recommendedTemplate = 'moderate';
            } else if (age >= 13 && age <= 17) {
                recommendedTemplate = 'liberal';
            }

            // Reset expansion state
            templatesExpanded = false;
            const expandBtn = document.getElementById('expand-templates-btn');
            expandBtn.classList.remove('expanded');
            expandBtn.innerHTML = '<span class="material-symbols-outlined">expand_more</span> See Other Templates';

            // Show only recommended template, hide others
            document.querySelectorAll('.template-card').forEach(card => {
                const template = card.dataset.template;

                // Remove all recommended badges first
                const existingBadge = card.querySelector('.recommended-badge');
                if (existingBadge) {
                    existingBadge.remove();
                }
                card.classList.remove('recommended');

                if (template === recommendedTemplate) {
                    // Show and mark as recommended
                    card.classList.remove('hidden');
                    card.classList.add('recommended');

                    // Add recommended badge
                    const badge = document.createElement('div');
                    badge.className = 'recommended-badge';
                    badge.textContent = 'Recommended';
                    card.insertBefore(badge, card.firstChild);

                    // Auto-select if none selected
                    if (!selectedTemplate) {
                        card.classList.add('active');
                        selectedTemplate = recommendedTemplate;
                    }
                } else {
                    // Hide non-recommended
                    card.classList.add('hidden');
                }
            });
        } else {
            templateSection.style.display = 'none';
        }
    },

    /**
     * Handle year of birth change - calculate age, show template suggestions and update avatars
     */
    handleYOBChange() {
        const yob = parseInt(document.getElementById('child-yob').value);
        const currentYear = new Date().getFullYear();
        const age = currentYear - yob;

        // Show template suggestions
        AddChildHandlers.showTemplateSuggestions(age);

        // Update avatar suggestions
        AddChildHandlers.updateAvatarSuggestions();
    },

    /**
     * Skip template selection
     */
    skipTemplate() {
        // Deselect all templates
        document.querySelectorAll('.template-card').forEach(card => {
            card.classList.remove('active');
        });
        selectedTemplate = null;
        NotificationManager.show('You can set up controls manually later', 'info');
    },

    createProfile() {
        const name = document.getElementById('child-name').value.trim();
        const yob = parseInt(document.getElementById('child-yob').value);
        const currentYear = new Date().getFullYear();
        const age = yob ? currentYear - yob : null;

        // Validation
        if (!name) {
            NotificationManager.show('Please enter child\'s name', 'warning');
            return;
        }

        if (!selectedGender) {
            NotificationManager.show('Please select gender', 'warning');
            return;
        }

        if (!yob || yob < 2007 || yob > 2021) {
            NotificationManager.show('Please enter a valid year of birth (2007-2021)', 'warning');
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const isEditMode = urlParams.get('mode') === 'edit';
        const originalChildName = urlParams.get('child');

        // Create profile data
        const profileData = {
            name: name,
            yearOfBirth: yob,
            age: age,
            gender: selectedGender,
            avatar: uploadedAvatar || selectedAvatarUrl,
            template: selectedTemplate,
            updatedAt: new Date().toISOString()
        };

        // Save to localStorage
        let existingProfiles = JSON.parse(localStorage.getItem('childProfiles') || '[]');

        if (isEditMode && originalChildName) {
            const index = existingProfiles.findIndex(p => p.name.toLowerCase() === originalChildName.toLowerCase());
            if (index !== -1) {
                // Keep original creation date
                profileData.createdAt = existingProfiles[index].createdAt || profileData.updatedAt;
                existingProfiles[index] = profileData;
            } else {
                profileData.createdAt = profileData.updatedAt;
                existingProfiles.push(profileData);
            }
        } else {
            profileData.createdAt = profileData.updatedAt;
            existingProfiles.push(profileData);
        }

        localStorage.setItem('childProfiles', JSON.stringify(existingProfiles));

        // Show success and redirect
        const templateMsg = selectedTemplate
            ? `with ${selectedTemplate} template`
            : 'without a template (set up manually later)';

        const actionWord = isEditMode ? 'updated' : 'created';

        NotificationManager.show(`${name}'s profile ${actionWord} ${templateMsg}!`, 'success');

        setTimeout(() => {
            if (isEditMode) {
                window.location.href = `child-details.html?child=${encodeURIComponent(name)}`;
            } else {
                window.location.href = 'parent-dashboard.html';
            }
        }, 1500);
    }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    ThemeManager.initialize();
    AddChildHandlers.init();
});
