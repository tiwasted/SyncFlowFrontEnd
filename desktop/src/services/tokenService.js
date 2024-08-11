import axios from 'axios';
// import jwtDecode from 'jwt-decode';

// Создаем экземпляр axios
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Функция для обновления токена
const refreshToken = async () => {
  try {
    const response = await axios.post('http://localhost:8000/users/api/token/refresh/', {
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
