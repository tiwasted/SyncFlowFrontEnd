import axios from 'axios';

// Определите базовый URL из переменной окружения
const apiUrl = process.env.REACT_APP_API_URL;

// Создаем экземпляр axios
const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL: 'http://localhost:8000',
=======
  baseURL: apiUrl,  // Используем переменную окружения
>>>>>>> 0380f29a530b5f01df9c4a101d868b78d24790d0
  headers: {
    'Content-Type': 'application/json'
  }
});

// Функция для обновления токена
const refreshToken = async () => {
  try {
<<<<<<< HEAD
    const response = await axios.post('http://localhost:8000/users/api/token/refresh/', {
=======
    const response = await axios.post(`${apiUrl}/users/api/token/refresh/`, {  // Используем переменную окружения
>>>>>>> 0380f29a530b5f01df9c4a101d868b78d24790d0
      refresh: localStorage.getItem('refreshToken')
    });
    const newToken = response.data.access;
    localStorage.setItem('token', newToken);
    return newToken;
  } catch (error) {
    console.error('Ошибка refresh токена:', error);
    return null;
  }
};

// Интерцептор запросов
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Интерцептор ответов
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
