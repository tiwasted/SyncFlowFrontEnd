// import React, { useState, useCallback } from "react";
// import { useParams } from "react-router-dom";
// import { fetchOrders } from "../services/OrderService";
// import OrderFilterForm from "../components/OrderFilterForm";
// import "../styles/HistoryOfOrders.css";

// const STATUS_TRANSLATION = {
//   completed: "Выполнен",
//   cancelled: "Отменен",
// };

// const HistoryOfOrders = () => {
//   const { orderType } = useParams();
//   const [orders, setOrders] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//   });

//   const loadOrders = useCallback(
//     async (page = 1, appliedFilters = filters) => {
//       setLoading(true);
//       setError(null);

//       try {
//         const data = await fetchOrders(orderType, page, appliedFilters);
//         setOrders(data.results);
//         setPagination({
//           currentPage: page,
//           totalPages: Math.ceil(data.count / 10),
//         });
//       } catch (err) {
//         setError("Ошибка загрузки заказов");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [filters, orderType]
//   );

//   const handleFilterSubmit = (filters) => {
//     setFilters(filters);
//     setPagination({ ...pagination, currentPage: 1 });
//     loadOrders(1, filters);
//   };

//   const handlePageChange = (direction) => {
//     const newPage =
//       direction === "next"
//         ? pagination.currentPage + 1
//         : pagination.currentPage - 1;
//     if (newPage > 0 && newPage <= pagination.totalPages) {
//       setPagination({ ...pagination, currentPage: newPage });
//       loadOrders(newPage, filters);
//     }
//   };

//   return (
//     <div className="history-of-orders__container">
//       <h1 className="history-of-orders__title">
//         {orderType === "b2b" ? "История B2B заказов" : "История заказов"}
//       </h1>
//       <OrderFilterForm onSubmit={handleFilterSubmit} />

//       {loading ? (
//         <div className="history-of-orders__loading">
//           <p>Загрузка...</p>
//         </div>
//       ) : error ? (
//         <div className="history-of-orders__error">
//           <p>{error}</p>
//         </div>
//       ) : (
//         <div className="history-of-orders__content">
//           {orders.length === 0 && !loading && (
//             <div className="history-of-orders__no-results">
//               Нет заказов, соответствующих вашему запросу.
//             </div>
//           )}
//           <div className="history-of-orders__cards">
//             {orders.map((order) => (
//               <div key={order.id} className="history-of-orders__card">
//                 <div className="history-of-orders__card-header">
//                   <h2 className="history-of-orders__card-title">
//                     {order.order_name}
//                   </h2>
//                   <span
//                     className={`history-of-orders__card-status history-of-orders__card-status--${order.status}`}
//                   >
//                     {STATUS_TRANSLATION[order.status] || order.status}
//                   </span>
//                 </div>
//                 <div className="history-of-orders__card-body">
//                   <div className="history-of-orders__card-info">
//                     <div className="history-of-orders__card-info-item">
//                       <span className="history-of-orders__card-info-label">
//                         Город:
//                       </span>
//                       <span className="history-of-orders__card-info-value">
//                         {order.city}
//                       </span>
//                     </div>
//                     <div className="history-of-orders__card-info-item">
//                       <span className="history-of-orders__card-info-label">
//                         Дата заказа:
//                       </span>
//                       <span className="history-of-orders__card-info-value">
//                         {order.order_date}
//                       </span>
//                     </div>
//                     <div className="history-of-orders__card-info-item">
//                       <span className="history-of-orders__card-info-label">
//                         Время заказа:
//                       </span>
//                       <span className="history-of-orders__card-info-value">
//                         {order.order_time}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="history-of-orders__card-info">
//                     <div className="history-of-orders__card-info-item">
//                       <span className="history-of-orders__card-info-label">
//                         Имя клиента:
//                       </span>
//                       <span className="history-of-orders__card-info-value">
//                         {order.name_client}
//                       </span>
//                     </div>
//                     <div className="history-of-orders__card-info-item">
//                       <span className="history-of-orders__card-info-label">
//                         Номер клиента:
//                       </span>
//                       <span className="history-of-orders__card-info-value">
//                         {order.phone_number_client}
//                       </span>
//                     </div>
//                     <div className="history-of-orders__card-info-item">
//                       <span className="history-of-orders__card-info-label">
//                         Адрес:
//                       </span>
//                       <span className="history-of-orders__card-info-value">
//                         {order.address}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="history-of-orders__card-info">
//                     <div className="history-of-orders__card-info-item">
//                       <span className="history-of-orders__card-info-label">
//                         Описание заказа:
//                       </span>
//                       <span className="history-of-orders__card-info-value">
//                         {order.description}
//                       </span>
//                     </div>
//                     <div className="history-of-orders__card-info-item">
//                       <span className="history-of-orders__card-info-label">
//                         Отчет:
//                       </span>
//                       <span className="history-of-orders__card-info-value">
//                         {order.report || "Нет отчета"}
//                       </span>
//                     </div>
//                     <div className="history-of-orders__card-info-item">
//                       <span className="history-of-orders__card-info-label">
//                         Цена:
//                       </span>
//                       <span className="history-of-orders__card-info-value">
//                         {order.price}
//                       </span>
//                     </div>
//                   </div>
//                   <div className="history-of-orders__card-employees">
//                     <span className="history-of-orders__card-employees-label">
//                       Сотрудник (-и):
//                     </span>
//                     <div className="history-of-orders__card-employees-info">
//                       {order.employee_info.length ? (
//                         order.employee_info.map((employee, index) => (
//                           <div
//                             key={index}
//                             className="history-of-orders__card-employee"
//                           >
//                             <div className="history-of-orders__card-employee-name">
//                               {employee.first_name} {employee.last_name}
//                             </div>
//                             <div className="history-of-orders__card-employee-phone">
//                               {employee.phone}
//                             </div>
//                           </div>
//                         ))
//                       ) : (
//                         <span className="history-of-orders__card-no-employees">
//                           Нет данных
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="history-of-orders__pagination">
//         <button
//           className="history-of-orders__pagination-button"
//           disabled={pagination.currentPage === 1}
//           onClick={() => handlePageChange("prev")}
//         >
//           Назад
//         </button>
//         <span className="history-of-orders__pagination-info">
//           {pagination.currentPage} / {pagination.totalPages}
//         </span>
//         <button
//           className="history-of-orders__pagination-button"
//           disabled={pagination.currentPage === pagination.totalPages}
//           onClick={() => handlePageChange("next")}
//         >
//           Вперед
//         </button>
//       </div>
//     </div>
//   );
// };

// export default HistoryOfOrders;

import React, { useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { fetchOrders } from "../services/OrderService";
import OrderFilterForm from "../components/OrderFilterForm";
import "../styles/HistoryOfOrders.css";

const STATUS_TRANSLATION = {
  completed: "Выполнен",
  cancelled: "Отменен",
};

const HistoryOfOrders = () => {
  const { orderType } = useParams();
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const [searchPerformed, setSearchPerformed] = useState(false);

  const loadOrders = useCallback(
    async (page = 1, appliedFilters = filters) => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchOrders(orderType, page, appliedFilters);
        setOrders(data.results);
        setPagination({
          currentPage: page,
          totalPages: Math.ceil(data.count / 10),
        });
        setSearchPerformed(true);
      } catch (err) {
        setError("Ошибка загрузки заказов");
      } finally {
        setLoading(false);
      }
    },
    [filters, orderType]
  );

  const handleFilterSubmit = (filters) => {
    setFilters(filters);
    setPagination({ ...pagination, currentPage: 1 });
    loadOrders(1, filters);
  };

  const handlePageChange = (direction) => {
    const newPage =
      direction === "next"
        ? pagination.currentPage + 1
        : pagination.currentPage - 1;
    if (newPage > 0 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, currentPage: newPage });
      loadOrders(newPage, filters);
    }
  };

  return (
    <div className="history-of-orders__container">
      <h1 className="history-of-orders__title">
        {orderType === "b2b" ? "История B2B заказов" : "История заказов"}
      </h1>
      <OrderFilterForm onSubmit={handleFilterSubmit} />

      {loading ? (
        <p className="history-of-orders__loading">Загрузка...</p>
      ) : error ? (
        <p className="history-of-orders__error">{error}</p>
      ) : (
        <>
          {searchPerformed && orders.length === 0 && (
            <p className="history-of-orders__no-results">Заказы отсутствуют.</p>
          )}
          <ul className="history-of-orders__list">
            {orders.map((order) => (
              <li key={order.id} className="history-of-orders__item">
                <div className="history-of-orders__item-header">
                  <h2 className="history-of-orders__item-title">
                    {order.order_name}
                  </h2>
                  <span
                    className={`history-of-orders__item-status history-of-orders__item-status--${order.status}`}
                  >
                    {STATUS_TRANSLATION[order.status] || order.status}
                  </span>
                </div>
                <div className="history-of-orders__item-body">
                  <div className="history-of-orders__item-details">
                    <div className="history-of-orders__item-detail">
                      <span className="history-of-orders__item-detail-label">
                        Город:
                      </span>
                      <span className="history-of-orders__item-detail-value">
                        {order.city}
                      </span>
                    </div>

                    <div className="history-of-orders__item-detail">
                      <span className="history-of-orders__item-detail-label">
                        Имя клиента:
                      </span>
                      <span className="history-of-orders__item-detail-value">
                        {order.name_client}
                      </span>
                    </div>

                    <div className="history-of-orders__item-detail">
                      <span className="history-of-orders__item-detail-label">
                        Дата заказа:
                      </span>
                      <span className="history-of-orders__item-detail-value">
                        {order.order_date}
                      </span>
                    </div>

                    <div className="history-of-orders__item-detail">
                      <span className="history-of-orders__item-detail-label">
                        Номер клиента:
                      </span>
                      <span className="history-of-orders__item-detail-value">
                        {order.phone_number_client}
                      </span>
                    </div>

                    <div className="history-of-orders__item-detail">
                      <span className="history-of-orders__item-detail-label">
                        Время заказа:
                      </span>
                      <span className="history-of-orders__item-detail-value">
                        {order.order_time}
                      </span>
                    </div>

                    <div className="history-of-orders__item-detail">
                      <span className="history-of-orders__item-detail-label">
                        Описание заказа:
                      </span>
                      <span className="history-of-orders__item-detail-value">
                        {order.description}
                      </span>
                    </div>

                    <div className="history-of-orders__item-detail">
                      <span className="history-of-orders__item-detail-label">
                        Адрес:
                      </span>
                      <span className="history-of-orders__item-detail-value">
                        {order.address}
                      </span>
                    </div>

                    <div className="history-of-orders__item-detail">
                      <span className="history-of-orders__item-detail-label">
                        Отчет:
                      </span>
                      <span className="history-of-orders__item-detail-value">
                        {order.report || "Нет отчета"}
                      </span>
                    </div>

                    <div className="history-of-orders__item-detail">
                      <span className="history-of-orders__item-detail-label">
                        Сотрудник (-и):
                      </span>
                      <span className="history-of-orders__item-detail-value">
                        {order.employee_info.map((employee, index) => (
                          <span
                            key={index}
                            className="history-of-orders__employee"
                          >
                            {employee.first_name} {employee.last_name} (
                            {employee.phone})
                            {index < order.employee_info.length - 1 && ", "}
                          </span>
                        ))}
                      </span>
                    </div>

                    <div className="history-of-orders__item-detail">
                      <span className="history-of-orders__item-detail-label">
                        Цена:
                      </span>
                      <span className="history-of-orders__item-detail-value">
                        {order.price}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      <div className="history-of-orders__pagination">
        <button
          className="history-of-orders__pagination-button"
          disabled={pagination.currentPage === 1}
          onClick={() => handlePageChange("prev")}
        >
          Назад
        </button>
        <span className="history-of-orders__pagination-info">
          {pagination.currentPage} / {pagination.totalPages}
        </span>
        <button
          className="history-of-orders__pagination-button"
          disabled={pagination.currentPage === pagination.totalPages}
          onClick={() => handlePageChange("next")}
        >
          Вперед
        </button>
      </div>
    </div>
  );
};

export default HistoryOfOrders;
