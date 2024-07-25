import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/users/auth/login/';

export const login = async (phone, password) => {
    try {
        const response = await axios.post(API_URL, {
            phone,
            password,
        });

        if (response.status === 200 && response.data.access && response.data.refresh) {
            const { access, refresh } = response.data;
            console.log('Успешный вход. Токен:', access, refresh);
            // Возвращение токенов в localStorage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            return response.data.access;
        } else {
            throw new Error('Не удалось получить токен');
        }
    } catch (error) {
        if (error.response) {
            console.error('Ошибка ответа сервера:', error.response.data);
            console.error('Статус:', error.response.status);
            console.error('Заголовки:', error.response.headers);
        } else if (error.request) {
            console.error('Ошибка запроса:', error.request);
        } else {
            console.error('Ошибка:', error.message);
        }
        throw error;
    }
};

// Функция для выхода (удаление токенов)
export const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
};

// Функция для получения текущего JWT токена из localStorage
export const getCurrentToken = () => {
    return localStorage.getItem('access_token');
};

export const checkTokenValidity = async (token) => {
    try {
        // Здесь должен быть запрос к вашему API для проверки токена
        // Например:
        const response = await axios.post(`${API_URL}verify/`, { token });
        return response.status === 200;
    } catch (error) {
        console.error('Ошибка проверки токена:', error);
        return false;
    }
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
