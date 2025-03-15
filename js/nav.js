document.addEventListener('DOMContentLoaded', () => {
    // Get current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Highlight current page in navigation
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Initialize language from localStorage
    const savedLanguage = localStorage.getItem('language') || 'ru';
    document.documentElement.setAttribute('lang', savedLanguage);

    updateNavigation();
});

function updateNavigation() {
    const navLinks = document.querySelector('.nav-links');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    if (isLoggedIn && username) {
        navLinks.innerHTML = `
            <a href="index.html" data-i18n="nav_home">Главная</a>
            <a href="about.html" data-i18n="nav_about">О нас</a>
            <span class="username"><span data-i18n="nav_hello">Привет</span>, ${username}</span>
            <a href="#" class="logout-btn" data-i18n="nav_logout">Выход</a>
        `;

        // Добавляем обработчик для кнопки выхода
        const logoutBtn = navLinks.querySelector('.logout-btn');
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // Очищаем данные авторизации
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            localStorage.removeItem('userEmail');
            // Обновляем навигацию
            updateNavigation();
            // Если мы на защищенной странице, перенаправляем на главную
            if (window.location.pathname.includes('protected')) {
                window.location.href = 'index.html';
            }
        });
    } else {
        navLinks.innerHTML = `
            <a href="index.html" data-i18n="nav_home">Главная</a>
            <a href="about.html" data-i18n="nav_about">О нас</a>
            <a href="login.html" data-i18n="nav_login">Вход</a>
            <a href="register.html" data-i18n="nav_register">Регистрация</a>
        `;
    }

    // Update translations after changing navigation
    if (window.langManager) {
        window.langManager.updateContent();
    }
} 