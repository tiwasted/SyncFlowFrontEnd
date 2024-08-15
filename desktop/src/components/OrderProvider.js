import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/TokenService';
import { useAuth } from '../context/AuthProvider'; 

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { isAuthenticated, authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // Изначально false
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (authLoading || !isAuthenticated) return; // Ждем окончания authLoading и проверки аутентификации

      setLoading(true); // Устанавливаем загрузку в true только перед началом загрузки заказов
      setError(null); // Сбрасываем ошибку перед новым запросом

      try {
        const response = await api.get('/orders/b2c-orders/');
        setOrders(response.data);
      } catch (error) {
        console.error('Ошибка при получении заказов', error);
        setError('Ошибка при получении заказов');
        setOrders([]);
      } finally {
        setLoading(false); // Завершаем загрузку
      }
    };

    fetchOrders();
  }, [isAuthenticated, authLoading]);

  return (
    <OrderContext.Provider value={{ orders, setOrders, loading, error }}>
      {children}
    </OrderContext.Provider>
  );
};

