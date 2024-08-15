import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
    baseURL: apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

const isTokenExpired = (token) => {
    if (!token) return true;
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime;
    } catch (error) {
        // console.error('Ошибка при проверке токена:', error);
        return true;
    }
};

const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    try {
        const response = await api.post('/users/api/token/refresh/', {
            refresh: refreshToken
        });
        localStorage.setItem('access_token', response.data.access);
        return response.data.access;
    } catch (error) {
        // console.error('Не удалось обновить токен', error);
        throw error;
    }
};

api.interceptors.request.use(async (config) => {
    // console.log('Интерцептор запроса вызван');
    
    let accessToken = localStorage.getItem('access_token');
    // console.log('Токен из localStorage:', accessToken);

    if (accessToken && !isTokenExpired(accessToken)) {
        config.headers['Authorization'] = `Bearer ${accessToken}`;
        // console.log('Заголовки после добавления токена:', config.headers);
    } else {
        // console.log('Токен отсутствует или истек, попытка обновления');
        try {
            accessToken = await refreshAccessToken();
            config.headers['Authorization'] = `Bearer ${accessToken}`;
            // console.log('Токен обновлен и добавлен в заголовки');
        } catch (error) {
            // console.error('Не удалось обновить токен', error);
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            // Здесь можно добавить редирект на страницу входа
            window.location.href = '/login';
            throw error;
        }
    }

    return config;
}, (error) => {
    // console.error('Ошибка в интерцепторе запроса:', error);
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const accessToken = await refreshAccessToken();
                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
