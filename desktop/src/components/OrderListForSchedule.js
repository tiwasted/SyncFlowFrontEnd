import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ReassignEmployee from "./ReassignEmployee";
import api from "../services/TokenService";
import ModalForDelete from "./ModalForDelete";

const OrderList = ({ orders, setOrders }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);

  const handleDelete = async () => {
    if (orderToDelete === null) return;

    try {
      await api.delete(`/orders/b2c-orders/${orderToDelete}/`);
      setOrders(orders.filter((order) => order.id !== orderToDelete));
      setShowModal(false);
    } catch (error) {
      // console.error("Ошибка при удалении заказа", error);
    }
  };

  const handleDeleteClick = (id) => {
    setOrderToDelete(id); // Сохраняем ID заказа, который хотим удалить
    setShowModal(true); // Открываем модальное окно
  };

  const handleEmployeeAssigned = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  const handleEditClick = (orderId) => {
    navigate(`/edit-order/${orderId}`, { state: { from: location.pathname } });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  if (!orders || orders.length === 0) {
    return null;
  }

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className="order-item-schedule">
          <h4>{order.service_name}</h4>
          <p className="box-pic">
            <b>Наименование: </b> {order.order_name}
          </p>
          <p>
            <b>Цена: </b> {order.price}
          </p>
          <p>
            <b>Дата: </b> {order.order_date}
          </p>
          <p>
            <b>Время: </b> {order.order_time}
          </p>
          <p>
            <b>Адрес: </b> {order.address}
          </p>
          <p>
            <b>Имя клиента: </b> {order.name_client}
          </p>
          <p>
            <b>Номер клиента: </b> {order.phone_number_client}
          </p>
          <p>
            <b>Описание: </b> {order.description}
          </p>
          <p>
            <b>Статус: </b>{" "}
            {order.status === "in waiting" ? "В ожидании" : order.status}
          </p>
          <p>
            <b>Сотрудник: </b>{" "}
            {order.assigned_employee_name
              ? `${order.assigned_employee_name}`
              : "Не назначен"}
          </p>
          <p>
            <b>Телефон сотрудника: </b> {order.assigned_employee_phone}
          </p>
          <button
            className="order-list-schedule-edit-btn"
            onClick={() => handleEditClick(order.id)}
          >
            Редактировать
          </button>
          <button
            className="order-list-schedule-delete-btn"
            onClick={() => handleDeleteClick(order.id)}
          >
            Удалить
          </button>
          <ReassignEmployee
            orderId={order.id}
            onEmployeeAssigned={handleEmployeeAssigned}
          />
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
