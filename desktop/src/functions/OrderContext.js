// OrderContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // Убедитесь, что orders инициализирован как пустой массив

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:8000/orders/b2c-orders/', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setOrders(response.data); // Устанавливаем полученные данные
      } catch (error) {
        console.error("Ошибка при получении заказов", error);
        setOrders([]); // Устанавливаем пустой массив в случае ошибки
      }
    };

    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
