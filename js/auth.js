document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
});

async function handleLogin(e) {
    e.preventDefault();
    
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
        // Здесь в реальном приложении был бы запрос к API
        await simulateApiCall({ email, password });

        // Сохраняем информацию о входе
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);

        // Показываем сообщение об успехе
        showMessage('success-message', 'Вход выполнен успешно!');
        
        // Перенаправляем на главную страницу
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } catch (error) {
        showMessage('error-message', error.message);
    }
}

async function handleRegister(e) {
    e.preventDefault();
    
    const username = e.target.username.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    try {
        // Проверяем совпадение паролей
        if (password !== confirmPassword) {
            throw new Error('Пароли не совпадают');
        }

        // Здесь в реальном приложении был бы запрос к API
        await simulateApiCall({ username, email, password });

        // Сохраняем информацию о регистрации
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email);
        localStorage.setItem('username', username);

        // Показываем сообщение об успехе
        showMessage('success-message', 'Регистрация успешна!');
        
        // Перенаправляем на главную страницу
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    } catch (error) {
        showMessage('error-message', error.message);
    }
}

function showMessage(className, message) {
    // Скрываем все сообщения
    document.querySelectorAll('.error-message, .success-message').forEach(el => {
        el.classList.remove('show');
    });

    // Показываем нужное сообщение
    const messageElement = document.querySelector(`.${className}`);
    if (messageElement) {
        messageElement.textContent = message;
        messageElement.classList.add('show');
    }
}

// Имитация API-запроса (удалить в продакшене)
function simulateApiCall(data) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (data.email && data.email.includes('@')) {
                resolve({ success: true });
            } else {
                reject(new Error('Неверный формат email'));
            }
        }, 500);
    });
}