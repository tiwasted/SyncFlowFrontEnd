import axios from "axios";
import jwt_decode from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;

const TokenService = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const isTokenExpired = (token) => {
  if (!token) return true;
  const decodedToken = jwt_decode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken || isTokenExpired(refreshToken)) {
    console.error("Рефреш токен отсутствует или истек.");
    logout(); // Добавлено для выхода из системы
    return null;
  }

  try {
    const response = await axios.post(`${apiUrl}/users/api/token/refresh/`, {
      refresh: refreshToken,
    });
    const newToken = response.data.access;
    localStorage.setItem("access_token", newToken);
    return newToken;
  } catch (error) {
    console.error("Ошибка при обновлении токена:", error);
    logout(); // Добавлено для выхода из системы
    return null;
  }
};

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login"; // Перенаправление на страницу логина
};

TokenService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token && !isTokenExpired(token)) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

TokenService.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      if (newToken) {
        TokenService.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return TokenService(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default TokenService;
