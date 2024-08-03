import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/tokenService';

const OrderContext = createContext();

// export const useOrders = () => useContext(OrderContext);

// export const OrderProvider = ({ children }) => {
//   const [b2cOrders, setB2cOrders] = useState([]);
//   const [b2bOrders, setB2bOrders] = useState([]);

//   useEffect(() => {
//     const fetchB2cOrders = async () => {
//       try {
//         const response = await api.get('http://localhost:8000/orders/b2c-orders/');
//         setB2cOrders(response.data);
//       } catch (error) {
//         console.error("Ошибка при получении B2C заказов", error);
//         setB2cOrders([]);
//       }
//     };

    // const fetchB2bOrders = async () => {
    //   try {
    //     const response = await api.get('http://localhost:8000/orders/b2b-orders/');
    //     setB2bOrders(response.data);
    //   } catch (error) {
    //     console.error("Ошибка при получении B2B заказов", error);
    //     setB2bOrders([]);
    //   }
    // };

  //   fetchB2cOrders();
  //   fetchB2bOrders();
  // }, []);

  export const useOrders = () => useContext(OrderContext);

  export const OrderProvider = ({ children }) => {

  const [orders, setOrders] = useState([]); // Убедитесь, что orders инициализирован как пустой массив

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get('http://localhost:8000/orders/b2c-orders/', {
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
