import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import AssignEmployee from "../components/AssignEmployee";
import api from "../services/TokenService";
import { useOrders } from "../context/OrderProvider";
import ModalForDelete from "../components/ModalForDelete";
import '@fortawesome/fontawesome-free/css/all.min.css';


const OrderList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orders, setOrders, loading, error } = useOrders();
  const [showModal, setShowModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      await api.delete(`/orders/b2c-orders/${orderToDelete}/`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderToDelete)
      );
      setShowModal(false);
    } catch (error) {
      console.error("Ошибка при удалении заказа", error);
    }
  };

  // const handleEmployeeAssigned = (updatedOrder) => {
  //   setOrders((prevOrders) =>
  //     prevOrders.map((order) =>
  //       order.id === updatedOrder.id ? updatedOrder : order
  //     )
  //   );
  // };

  const handleDeleteClick = (id) => {
    setOrderToDelete(id);
    setShowModal(true);
  };

  const handleEditClick = (orderId) => {
    navigate(`/edit-order/${orderId}`, { state: { from: location.pathname } });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!orders || orders.length === 0) {
    return null;
  }

  // return (
  //   <div className="order-container-dashboard">
  //     {orders.map((order) => (
  //       <div className="order-item-dashboard" key={order.id}>
  //         <div className="order-item-grid-dashboard">
  //           <p>{order.order_name}</p>
  //           {/* <p>{order.price}</p> */}
  //           <p>{order.order_date}</p>
  //           <p>{order.order_time}</p>
  //           <p>{order.address}</p>
  //         </div>
  //         <div className="order-btns-dashboard">
  //           <button
  //             className="order-list-btn-dashboard"
  //             onClick={() => handleEditClick(order.id)}
  //           >
  //             Редактировать
  //           </button>
  //           <button
  //             className="order-delete-btn-dashboard"
  //             onClick={() => handleDeleteClick(order.id)}
  //           >
  //             Удалить
  //           </button>
  //           <AssignEmployee
  //             orderId={order.id}
  //             onEmployeeAssigned={handleEmployeeAssigned}
  //           />

  //           <ModalForDelete
  //             show={showModal}
  //             onClose={closeModal}
  //             onConfirm={handleDelete}
  //           >
  //             Вы точно хотите удалить заказ?
  //           </ModalForDelete>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );


  // return (
  //   <div className="order-container-dashboard">
  //     {orders.map((order) => (
  //       <div className="order-item-dashboard" key={order.id}>
  //         <div className="order-item-details">
  //           <div className="order-item-info">
  //             <p className="order-item-name">Наименование: {order.order_name}</p>
  //             <p className="order-item-date">Дата: {order.order_date}</p>
  //             <p className="order-item-time">Время: {order.order_time}</p>
  //             <p className="order-item-address">Адрес: {order.address}</p>
  //           </div>
  //           <div className="order-item-actions">
  //             <button
  //               className="order-list-btn-dashboard"
  //               onClick={() => handleEditClick(order.id)}
  //             >
  //               Редактировать
  //             </button>
  //             <button
  //               className="order-delete-btn-dashboard"
  //               onClick={() => handleDeleteClick(order.id)}
  //             >
  //               Удалить
  //             </button>
  //           </div>
  //         </div>
          
  //       </div>
  //     ))}
  //     <ModalForDelete
  //           show={showModal}
  //           onClose={closeModal}
  //           onConfirm={handleDelete}
  //         >
  //           Вы точно хотите удалить заказ?
  //         </ModalForDelete>
  //   </div>
  // );
  

  return (
    <div className="order-container-dashboard">
      {orders.map((order) => (
        <div className="order-item-dashboard" key={order.id}>
          <div className="order-item-details">
            <div className="order-item-info">
              <p className="order-item-name">Наименование: {order.order_name}</p>
              <p className="order-item-date">{order.order_date}, {order.order_time}, {order.address}</p>
              {/* <p className="order-item-time">Время: {order.order_time}</p>
              <p className="order-item-address">Адрес: {order.address}</p> */}
              
            </div>
            <div className="order-item-actions">
              <button
                className="order-list-btn-dashboard"
                onClick={() => handleEditClick(order.id)}
                aria-label="Редактировать"
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button
                className="order-delete-btn-dashboard"
                onClick={() => handleDeleteClick(order.id)}
                aria-label="Удалить"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <ModalForDelete
            show={showModal}
            onClose={closeModal}
            onConfirm={handleDelete}
          >
            Вы точно хотите удалить заказ?
          </ModalForDelete>
        </div>
      ))}
    </div>
  );
  
};

export default OrderList;
