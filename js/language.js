function initializeLanguage(language) {
    // Set the page language
    document.documentElement.lang = language || 'ru';
    
    // Update all translations
    updateTranslations(language || 'ru');

    // Add event listeners to language radio buttons if they exist
    const languageInputs = document.querySelectorAll('input[name="language"]');
    languageInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            const newLanguage = e.target.value;
            // Save language selection to sessionStorage
            sessionStorage.setItem('resumeLanguage', newLanguage);
            
            // Add transition effect
            document.body.classList.add('language-transition');
            
            // Wait for fade out
            setTimeout(() => {
                updateTranslations(newLanguage);
                document.documentElement.lang = newLanguage;
                
                // Remove transition class after fade in
                setTimeout(() => {
                    document.body.classList.remove('language-transition');
                }, 300);
            }, 300);
        });
    });
}

function updateTranslations(language) {
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        }
    });

    // Update elements with data-i18n-placeholder attribute
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (translations[language] && translations[language][key]) {
            element.placeholder = translations[language][key];
        }
    });

    // Update page title if it contains translatable elements
    const titleElement = document.querySelector('title span[data-i18n]');
    if (titleElement) {
        const key = titleElement.getAttribute('data-i18n');
        if (translations[language] && translations[language][key]) {
            document.title = `ResumeGen - ${translations[language][key]}`;
        }
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedLanguage = sessionStorage.getItem('resumeLanguage');
    initializeLanguage(savedLanguage);
}); 