import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../services/TokenService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true); // Новое состояние
  
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('access_token') || null,
    isAuthenticated: !!localStorage.getItem('access_token') && !isTokenExpired(localStorage.getItem('access_token')),
  });

  const logout = useCallback(() => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setAuthState({ token: null, isAuthenticated: false });
    navigate('/login'); // Перенаправление на страницу логина
  }, [navigate]);

  const login = useCallback((token) => {
    if (isTokenExpired(token)) {
      logout();
      return;
    }
    localStorage.setItem('access_token', token);
    setAuthState({ token, isAuthenticated: true });
    setAuthLoading(false); // Сброс загрузки после входа
  }, [logout]);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        if (isTokenExpired(token)) {
          logout(); // Выход из системы, если токен истек
        } else {
          setAuthState({ token, isAuthenticated: true });
        }
      } else {
        setAuthState({ token: null, isAuthenticated: false });
      }
      setAuthLoading(false); // Сброс загрузки после проверки токена
    };
    checkToken();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ ...authState, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
