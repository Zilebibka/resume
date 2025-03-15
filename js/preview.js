document.addEventListener('DOMContentLoaded', () => {
    // Load resume data from sessionStorage
    const resumeData = JSON.parse(sessionStorage.getItem('resumeData'));
    const language = sessionStorage.getItem('resumeLanguage');
    const style = sessionStorage.getItem('resumeStyle');

    if (!resumeData) {
        window.location.href = 'index.html';
        return;
    }

    // Update page language
    document.documentElement.lang = language;

    // Generate resume
    generateResume(resumeData, language, style);

    // Add export button handler
    const exportBtn = document.getElementById('exportPdf');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportToPdf);
    }

    // Generate tips
    generateTips(resumeData, language);

    // Initialize language switcher
    initializeLanguage(language);
});

function generateResume(data, language, style) {
    const preview = document.getElementById('resumePreview');
    preview.className = `resume-preview resume-${style}`;

    const template = language === 'ru' ? generateRussianTemplate(data) : generateEnglishTemplate(data);
    preview.innerHTML = template;
}

function generateRussianTemplate(data) {
    return `
        <h1>${data.personalInfo.firstName} ${data.personalInfo.lastName}</h1>
        
        <section class="contact-info">
            <p>Email: ${data.personalInfo.email}</p>
            ${data.personalInfo.phone ? `<p>Телефон: ${data.personalInfo.phone}</p>` : ''}
        </section>

        <section class="education">
            <h2 data-i18n="education_section">Образование</h2>
            <p>${data.education.institution}</p>
            <p>${data.education.degree}</p>
            <p>Год окончания: ${data.education.graduationYear}</p>
        </section>

        <section class="experience">
            <h2 data-i18n="experience_section">Опыт работы</h2>
            <h3>${data.experience.position}</h3>
            <p>${data.experience.company}</p>
            <p>${data.experience.responsibilities}</p>
        </section>

        <section class="skills">
            <h2 data-i18n="skills_section">Навыки</h2>
            <p>${data.skills.join(', ')}</p>
        </section>
    `;
}

function generateEnglishTemplate(data) {
    return `
        <h1>${data.personalInfo.firstName} ${data.personalInfo.lastName}</h1>
        
        <section class="contact-info">
            <p>Email: ${data.personalInfo.email}</p>
            ${data.personalInfo.phone ? `<p>Phone: ${data.personalInfo.phone}</p>` : ''}
        </section>

        <section class="education">
            <h2 data-i18n="education_section">Education</h2>
            <p>${data.education.institution}</p>
            <p>${data.education.degree}</p>
            <p>Graduation Year: ${data.education.graduationYear}</p>
        </section>

        <section class="experience">
            <h2 data-i18n="experience_section">Work Experience</h2>
            <h3>${data.experience.position}</h3>
            <p>${data.experience.company}</p>
            <p>${data.experience.responsibilities}</p>
        </section>

        <section class="skills">
            <h2 data-i18n="skills_section">Skills</h2>
            <p>${data.skills.join(', ')}</p>
        </section>
    `;
}

function generateTips(data, language) {
    const tips = document.getElementById('tips');
    const tipsList = [];

    // Generate tips based on data
    if (data.skills.length < 5) {
        tipsList.push(translations[language].tip_add_more_skills);
    }

    if (data.experience.responsibilities.length < 100) {
        tipsList.push(translations[language].tip_expand_responsibilities);
    }

    // Display tips
    if (tipsList.length > 0) {
        tips.innerHTML = `<ul>${tipsList.map(tip => `<li>${tip}</li>`).join('')}</ul>`;
    }
}

async function exportToPdf() {
    const element = document.getElementById('resumePreview');
    const opt = {
        margin: 1,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    try {
        await html2pdf().set(opt).from(element).save();
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    }
}