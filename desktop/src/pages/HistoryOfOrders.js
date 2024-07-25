// // HistoryOfOrders.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// const ordersMock = Array.from({ length: 200 }, (_, index) => ({
//   id: index + 1,
//   title: `Заказ ${index + 1}`,
// }));

// const ORDERS_PER_PAGE = 15;
// const MAX_VISIBLE_PAGES = 5;

// const HistoryOfOrders = () => {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = Math.ceil(ordersMock.length / ORDERS_PER_PAGE);
//   const lastOrderIndex = currentPage * ORDERS_PER_PAGE;
//   const firstOrderIndex = lastOrderIndex - ORDERS_PER_PAGE;
//   const currentOrders = ordersMock.slice(firstOrderIndex, lastOrderIndex);

//   const startPage = Math.floor((currentPage - 1) / MAX_VISIBLE_PAGES) * MAX_VISIBLE_PAGES + 1;
//   const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div className='history-of-orders-container'>
//       <h1 className='history-of-orders-header'>История заказов</h1>
//       <ul className='history-of-orders-order-list'>
//         {currentOrders.map((order) => (
//           <li key={order.id} className='history-of-orders-order-item'>
//             <Link to={`/order/${order.id}`}>{order.title}</Link>
//           </li>
//         ))}
//       </ul>
//       <div className='history-of-orders-pagination'>
//         {startPage > 1 && (
//           <button className='history-of-orders-page-button' onClick={() => paginate(startPage - 1)}>
//             Предыдущая страница
//           </button>
//         )}
//         {Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index).map((page) => (
//           <button
//             key={page}
//             className={`history-of-orders-page-button ${currentPage === page ? 'history-of-orders-current-page' : ''}`}
//             onClick={() => paginate(page)}
//           >
//             {page}
//           </button>
//         ))}
//         {endPage < totalPages && (
//           <button className='history-of-orders-page-button' onClick={() => paginate(endPage + 1)}>
//             Следующая страница
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HistoryOfOrders;


import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/tokenService'
import OrderFilterForm from '../components/OrderFilter'; // Импортируйте ваш компонент формы фильтрации

const HistoryOfOrders = () => {
    const { orderType } = useParams();
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Функция для отправки фильтров и получения данных
    const fetchOrders = useCallback(async (filters) => {
      setLoading(true);
      setError(null);
      try {
          const url = orderType === 'b2b' ? '/order-history/b2b-history/' : '/order-history/b2c-history/';
          const response = await api.get(url, { params: filters });
          setOrders(response.data);
      } catch (err) {
          setError('Ошибка загрузки заказов');
          console.error('Error fetching orders:', err);
      } finally {
          setLoading(false);
      }
  }, [orderType]);

    // Обработчик отправки фильтров
    const handleFilterSubmit = (filters) => {
        setFilters(filters);
        fetchOrders(filters);
    };

    // Используйте эффект для загрузки данных при изменении фильтров
    useEffect(() => {
        if (Object.keys(filters).length) {
            fetchOrders(filters);
        }
    }, [filters, fetchOrders]);

    return (
        <div>
            <h1>{orderType === 'b2b' ? 'История B2B заказов' : 'История B2C заказов'}</h1>
            <OrderFilterForm onSubmit={handleFilterSubmit} />
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        <p>Наименование: {order.order_name}</p>
                        <p>Компания: {order.company_name}</p>
                        <p>Дата заказа: {order.order_date}</p>
                        <p>Время заказа: {order.order_time}</p>
                        <p>Цена: {order.price}</p>
                        <p>Адрес: {order.address}</p>
                        <p>Статус заказа: {order.status}</p>
                        <p>Сотрудник: {order.assigned_employee}</p>
                        {/* Добавьте другие детали заказа по необходимости */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryOfOrders;
