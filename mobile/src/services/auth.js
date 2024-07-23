import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/users/auth/login/';

export const login = async (phone, password) => {
    try {
        const responce = await axios.post(API_URL, {
            phone,
            password,
        });
        
        if (responce.status === 200 && responce.data.access) {
            const { access, refresh } = responce.data;
            console.log('Успешный вход. Токен:', access, refresh);
            // Возвращение токена в localStorage
            localStorage.setItem('refresh_token', refresh);
            // Возвращение токена для дальнейшего использования
            return access;
        } else {
            throw new Error('Не удалось получить токен')
        }
    } catch (error) {
        console.error('Ошибка входа:', error);
        throw error; // Обработка ошибок при входе
    }
};

// Функция для выхода (удаление токена)
export const logout = () => {
    localStorage.removeItem('token');
};

// Функция для получения текущего JWT токена из localStorage
export const getCurrentToken = () => {
    return localStorage.getItem('token');
};

// Функция для отправки JWT токена в заголовке Authorization
export const setAuthHeader = () => {
    const token = getCurrentToken();
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};