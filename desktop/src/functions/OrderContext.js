// // OrderContext.js
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import axios from 'axios';

// const OrderContext = createContext();

// export const useOrders = () => useContext(OrderContext);

// export const OrderProvider = ({ children }) => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       const token = localStorage.getItem('accessToken');
//       const response = await axios.get('http://127.0.0.1:8000/orders/', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//         },
//       });
//       setOrders(response.data);
//     };

//     fetchOrders();
//   }, []);

//   return (
//     <OrderContext.Provider value={{ orders, setOrders }}>
//       {children}
//     </OrderContext.Provider>
//   );
// };


// OrderContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://127.0.0.1:8000/orders/employer/', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setOrders(response.data);
    };

    fetchOrders();
  }, []);

  return (
    <OrderContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderContext.Provider>
  );
};
