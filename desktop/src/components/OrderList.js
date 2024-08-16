import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AssignEmployee from "../components/AssignEmployee";
import api from "../services/TokenService";
import { useOrders } from "../context/OrderProvider";
import TruncatedText from "../components/TruncatedText"; // Импортируем TruncatedText
import ModalForDelete from "../components/ModalForDelete";

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
      // console.error("Ошибка при удалении заказа", error);
    }
  };

  const handleEmployeeAssigned = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

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

  return (
    <div className="order-list-container-dashboard">
      <div className="order-item-grid-header">
        <div>Наименование</div>
        <div>Цена</div>
        <div>Дата</div>
        <div>Время</div>
        <div>Адрес</div>
        <div>Имя клиента</div>
        <div>Номер клиента</div>
        <div>Статус</div>
      </div>
      {orders.map((order) => (
        <div className="order-item" key={order.id}>
          <div className="order-item-grid">
            <p>{order.order_name}</p>
            <p>{order.price}</p>
            <p>{order.order_date}</p>
            <p>{order.order_time}</p>
            <p>{order.address}</p>
            <p>{order.name_client}</p>
            <p>{order.phone_number_client}</p>
            <p className="order-list-status">
              {order.status === "in processing" ? "В обработке" : order.status}
            </p>
          </div>
          <p className="order-item-description">
            Описание: <TruncatedText text={order.description} limit={150} />
          </p>
          <div className="order-list-btns">
            <button
              className="order-list-edit-btn"
              onClick={() => handleEditClick(order.id)}
            >
              Редактировать
            </button>
            <button
              className="order-list-delete-btn"
              onClick={() => handleDeleteClick(order.id)}
            >
              Удалить
            </button>
            <AssignEmployee
              orderId={order.id}
              onEmployeeAssigned={handleEmployeeAssigned}
            />
          </div>
        </div>
      ))}
      <ModalForDelete
        show={showModal}
        onClose={closeModal}
        onConfirm={handleDelete}
      >
        Вы точно хотите удалить заказ?
      </ModalForDelete>
    </div>
  );
};

export default OrderList;
