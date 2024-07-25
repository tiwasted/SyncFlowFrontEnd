import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

    // Функция для получения нового access токена
    const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    const response = await axios.post('http://localhost:8000/users/api/token/refresh/', {
        refresh: refreshToken
    });
    localStorage.setItem('access_token', response.data.access);
    return response.data.access;
    };

    // Интерцептор для автоматического обновления токена
    api.interceptors.request.use(async (config) => {
    let accessToken = localStorage.getItem('access_token');

    if (accessToken) {
        const decodedToken = jwtDecode(accessToken);
        const currentTime = Date.now() / 1000;

        // Если токен истекает через менее чем 5 минут, обновляем его
        if (decodedToken.exp < currentTime + 300) {
        accessToken = await refreshAccessToken();
        }

        config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Интерцептор для обработки ошибок аутентификации
api.interceptors.response.use(
    (response) => response,
    async (error) => {
    const originalRequest = error.config;

    // Если ошибка 401 и запрос еще не повторялся
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
            const accessToken = await refreshAccessToken();
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
            return api(originalRequest);
        } catch (refreshError) {
            // Если не удалось обновить токен, перенаправляем на страницу входа
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            window.location.href = '/login'
            // Здесь можно добавить редирект на страницу входа
            return Promise.reject(refreshError);
        }
        }

        return Promise.reject(error);
    }
);

export default api;
