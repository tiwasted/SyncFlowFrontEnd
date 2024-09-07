import axios from "axios";
import { jwtDecode } from "jwt-decode";

const apiUrl = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const isTokenExpired = (token) => {
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

const refreshToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken || isTokenExpired(refreshToken)) {
    // console.error("Рефреш токен отсутствует или истек.");
    logout();
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
    // console.error("Ошибка при обновлении токена:", error);
    logout();
    return null;
  }
};

const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  window.location.href = "/login";
};

api.interceptors.request.use(
  async (config) => {
    let accessToken = localStorage.getItem("access_token");

    if (accessToken && !isTokenExpired(accessToken)) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    } else {
      try {
        accessToken = await refreshToken();
        if (accessToken) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
      } catch (error) {
        // console.error("Ошибка при обновлении токена:", error);
        throw error;
      }
    }

    return config;
  },
  (error) => {
    // console.error("Ошибка в интерцепторе запроса:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
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
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
