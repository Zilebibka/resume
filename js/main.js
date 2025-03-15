// Form handling
document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resumeForm');
    if (resumeForm) {
        // Restore form data if exists
        restoreFormData();
        
        resumeForm.addEventListener('submit', handleFormSubmit);
    }

    // Restore language and style selection if exists
    restorePreferences();

    // Add language change handler
    const languageInputs = document.querySelectorAll('input[name="language"]');
    languageInputs.forEach(input => {
        input.addEventListener('change', () => {
            const selectedLanguage = document.querySelector('input[name="language"]:checked').value;
            
            // Add transition effect
            document.body.classList.add('language-transition');
            
            // Wait for fade out
            setTimeout(() => {
                updateTranslations(selectedLanguage);
                
                // Remove transition class after fade in
                setTimeout(() => {
                    document.body.classList.remove('language-transition');
                }, 300);
            }, 300);
        });
    });
});

function restoreFormData() {
    const savedData = JSON.parse(sessionStorage.getItem('resumeData'));
    if (!savedData) return;

    // Restore personal info
    document.querySelector('input[name="firstName"]').value = savedData.personalInfo.firstName || '';
    document.querySelector('input[name="lastName"]').value = savedData.personalInfo.lastName || '';
    document.querySelector('input[name="email"]').value = savedData.personalInfo.email || '';
    document.querySelector('input[name="phone"]').value = savedData.personalInfo.phone || '';

    // Restore education
    document.querySelector('input[name="institution"]').value = savedData.education.institution || '';
    document.querySelector('input[name="degree"]').value = savedData.education.degree || '';
    document.querySelector('input[name="graduationYear"]').value = savedData.education.graduationYear || '';

    // Restore experience
    document.querySelector('input[name="company"]').value = savedData.experience.company || '';
    document.querySelector('input[name="position"]').value = savedData.experience.position || '';
    document.querySelector('textarea[name="responsibilities"]').value = savedData.experience.responsibilities || '';

    // Restore skills
    document.querySelector('textarea[name="skills"]').value = savedData.skills.join(', ') || '';
}

function restorePreferences() {
    const savedLanguage = sessionStorage.getItem('resumeLanguage');
    const savedStyle = sessionStorage.getItem('resumeStyle');

    if (savedLanguage) {
        const languageInput = document.querySelector(`input[name="language"][value="${savedLanguage}"]`);
        if (languageInput) {
            languageInput.checked = true;
            // Add transition effect
            document.body.classList.add('language-transition');
            
            // Wait for fade out
            setTimeout(() => {
                updateTranslations(savedLanguage);
                
                // Remove transition class after fade in
                setTimeout(() => {
                    document.body.classList.remove('language-transition');
                }, 300);
            }, 300);
        }
    }

    if (savedStyle) {
        const styleInput = document.querySelector(`input[name="style"][value="${savedStyle}"]`);
        if (styleInput) {
            styleInput.checked = true;
        }
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const resumeData = {
        personalInfo: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone')
        },
        education: {
            institution: formData.get('institution'),
            degree: formData.get('degree'),
            graduationYear: formData.get('graduationYear')
        },
        experience: {
            company: formData.get('company'),
            position: formData.get('position'),
            responsibilities: formData.get('responsibilities')
        },
        skills: formData.get('skills').split(',').map(skill => skill.trim())
    };

    // Get resume preferences
    const language = document.querySelector('input[name="language"]:checked').value;
    const style = document.querySelector('input[name="style"]:checked').value;

    // Store data in sessionStorage
    sessionStorage.setItem('resumeData', JSON.stringify(resumeData));
    sessionStorage.setItem('resumeLanguage', language);
    sessionStorage.setItem('resumeStyle', style);

    // Redirect to preview page
    window.location.href = 'preview.html';
}

// Filter handling
document.querySelectorAll('input[name="language"], input[name="style"]').forEach(input => {
    input.addEventListener('change', () => {
        // You can add real-time preview updates here if needed
        console.log('Resume preferences updated');
    });
}); 