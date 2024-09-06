import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const API_URL = `${apiUrl}/users/auth/login/`;

export const login = async (phone, password) => {
  try {
    const response = await axios.post(API_URL, {
      phone,
      password,
    });

    if (
      response.status === 200 &&
      response.data.access &&
      response.data.refresh
    ) {
      // const { access, refresh } = response.data;
      // console.log('Успешный вход. Токен:', access, refresh);
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      return response.data.access;
    } else {
      throw new Error("Не удалось получить токен");
    }
  } catch (error) {
    if (error.response) {
      // console.error('Ошибка ответа сервера:', error.response.data);
      // console.error('Статус:', error.response.status);
      // console.error('Заголовки:', error.response.headers);
    } else if (error.request) {
      // console.error('Ошибка запроса:', error.request);
    } else {
      // console.error('Ошибка:', error.message);
    }
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

export const getCurrentToken = () => {
  return localStorage.getItem("access_token");
};

export const checkTokenValidity = async (token) => {
  try {
    const response = await axios.post(`${API_URL}verify/`, { token });
    return response.status === 200;
  } catch (error) {
    // console.error('Ошибка проверки токена:', error);
    return false;
  }
};

export const setAuthHeader = () => {
  const token = getCurrentToken();
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};
