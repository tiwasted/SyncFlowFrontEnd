import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/tokenService';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [b2cOrders, setB2cOrders] = useState([]);
  const [b2bOrders, setB2bOrders] = useState([]);

  useEffect(() => {
    const fetchB2cOrders = async () => {
      try {
        const response = await api.get('http://localhost:8000/orders/b2c-orders/');
        setB2cOrders(response.data);
      } catch (error) {
        console.error("Ошибка при получении B2C заказов", error);
        setB2cOrders([]);
      }
    };

    const fetchB2bOrders = async () => {
      try {
        const response = await api.get('http://localhost:8000/orders/b2b-orders/');
        setB2bOrders(response.data);
      } catch (error) {
        console.error("Ошибка при получении B2B заказов", error);
        setB2bOrders([]);
      }
    };

    fetchB2cOrders();
    fetchB2bOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ b2cOrders, b2bOrders, setB2cOrders, setB2bOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
