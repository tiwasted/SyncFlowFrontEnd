import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Показываем загрузочный индикатор или возвращаем null, пока идет проверка аутентификации
  if (loading) {
    return <div>Loading...</div>;
  }

  // Перенаправляем на страницу логина, если пользователь не авторизован
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
