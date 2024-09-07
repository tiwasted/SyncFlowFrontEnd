import React from "react";
import PencilIcon from "../Icons/Pencil.svg";
import BasketIcon from "../Icons/Basket.svg";
import ReassignEmployeeIcon from "../Icons/ReassignEmployee.png";

const OrderListForScheduleEmployee = ({
  orders,
  selectedEmployeeName,
  handleEditOrder,
  handleDeleteOrder,
  handleReassignOrder,
  formatTime,
}) => {
  if (!orders || orders.length === 0) {
    return (
      <h3 className="employee-schedule-title-orders">Выберите сотрудника</h3>
    );
  }

  // return (
  //   <div>
  //     <h3 className="employee-schedule-title-orders">
  //       Заказы сотрудника: {selectedEmployeeName}
  //     </h3>
  //     <ul className="employee-schedule-ul-orders">
  //       {orders.map((order) => (
  //         <li className="employee-schedule-li-orders" key={order.id}>
  //           <div className="employee-schedule-order-card">
  //             <div className="employee-schedule-order-header">
  //               <span className="employee-schedule-order-name">
  //                 <i className="fa fa-clipboard"></i> {order.order_name}
  //               </span>
  //               <span className="employee-schedule-order-time">
  //                 <i className="fa fa-clock"></i> {formatTime(order.order_time)}
  //               </span>
  //             </div>
  //             <div className="employee-schedule-order-details">
  //               <span className="employee-schedule-order-address">
  //                 <i className="fa fa-map-marker"></i>Адрес: {order.address}, Цена: {order.price} тг
  //               </span>
  //             </div>
  //             <div className="employee-schedule-action-buttons">
  //               <button
  //                 onClick={() => handleEditOrder(order)}
  //                 className="employee-schedule-action-button edit"
  //               >
  //                 <img src={PencilIcon} alt="Редактировать" className="icon" />
  //               </button>
  //               <button
  //                 onClick={() => handleDeleteOrder(order.id)}
  //                 className="employee-schedule-action-button delete"
  //               >
  //                 <img src={BasketIcon} alt="Удалить" className="icon" />
  //               </button>
  //               <button
  //                 onClick={() => handleReassignOrder(order)}
  //                 className="employee-schedule-action-button reassign"
  //               >
  //                 <img src={ReassignEmployeeIcon} alt="Переназначить сотрудника" className="icon" />
  //               </button>
  //             </div>
  //           </div>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  return (
    <div>
      <h3 className="employee-schedule-title-orders">
        Заказы сотрудника: {selectedEmployeeName}
      </h3>
      <div className="order-container-dashboard">
        {orders.map((order) => (
          <div className="order-item-dashboard" key={order.id}>
            <div className="order-item-details-container">
              <div className="order-item-info">
                <p className="order-item-name">
                  Наименование: {order.order_name}
                </p>
                <p className="order-item-details">
                  {formatTime(order.order_time)}, {formatDate(order.order_date)}
                  , {order.address}, Цена: {order.price} тг
                </p>
              </div>
              <div className="order-item-actions">
                <button
                  className="order-list-btn-dashboard"
                  onClick={() => handleEditOrder(order)}
                >
                  <img src={PencilIcon} alt="Редактировать" className="icon" />
                </button>
                <button
                  className="order-delete-btn-dashboard"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  <img src={BasketIcon} alt="Удалить" className="icon" />
                </button>
                <button
                  className="order-assign-btn-dashboard"
                  onClick={() => handleReassignOrder(order)}
                >
                  <img
                    src={ReassignEmployeeIcon}
                    alt="Переназначить сотрудника"
                    className="icon"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderListForScheduleEmployee;
