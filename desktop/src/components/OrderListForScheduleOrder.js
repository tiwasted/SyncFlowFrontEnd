import React, { useState } from "react";
import ReassignEmployee from "./ReassignEmployee";
import api from "../services/TokenService";
import ModalForDelete from "./ModalForDelete";
import ModalForEditDashboard from "./ModalForEdit";
import PencilIcon from "../Icons/Pencil.svg";
import BasketIcon from "../Icons/Basket.svg";
import EmployeeIcon from "../Icons/Employee.png";

const OrderListForSchedule = ({ orders, setOrders }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [orderToReassign, setOrderToReassign] = useState(null);

  const handleDelete = async () => {
    if (orderToDelete === null) return;

    try {
      await api.delete(`/orders/schedule-orders/${orderToDelete}/`);
      setOrders(orders.filter((order) => order.id !== orderToDelete));
      setShowModal(false);
    } catch (error) {
      // console.error("Ошибка при удалении заказа", error);
    }
  };

  const handleDeleteClick = (id) => {
    setOrderToDelete(id);
    setShowModal(true);
  };

  const handleEditClick = (order) => {
    if (order) {
      setOrderToEdit(order);
      setShowEditModal(true);
    }
  };

  const handleEditSave = async (updatedOrder) => {
    try {
      await api.put(
        `/orders/schedule-orders/${updatedOrder.id}/`,
        updatedOrder
      );
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );
      setShowEditModal(false);
    } catch (error) {
      // console.error("Ошибка при обновлении заказа", error);
    }
  };

  const handleReassignClick = (order) => {
    setOrderToReassign(order);
    setShowReassignModal(true);
  };

  const handleEmployeeAssigned = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
    setShowReassignModal(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const closeReassignModal = () => {
    setShowReassignModal(false);
  };

  if (!orders || orders.length === 0) {
    return null;
  }

  return (
    <div className="order-container-schedule">
      {orders.map((order) => (
        <div
          key={order.id}
          className="order-item-dashboard order-item-schedule"
        >
          <div className="order-item-details-container">
            <h4>{order.service_name}</h4>
            <div className="order-item-info">
              <p className="order-item-name">
                Наименование: {order.order_name}
              </p>
              <p className="order-item-details">
                <b>Время:</b> {order.order_time}, <b>Дата:</b>{" "}
                {order.order_date}, <b>Цена:</b> {order.price}
              </p>
              <p>
                <b>Статус: </b>{" "}
                {order.status === "in_waiting" ? "В ожидании" : order.status}
              </p>
              <p>
                <b>Сотрудник (-и): </b>{" "}
                {order.list_assigned_employees &&
                order.list_assigned_employees.length > 0
                  ? order.list_assigned_employees
                      .map(
                        (employee) =>
                          `${employee.first_name} ${employee.last_name}`
                      )
                      .join(", ")
                  : "Не назначен"}
              </p>
            </div>
            <div className="order-item-actions">
              <button
                className="order-list-btn-dashboard"
                onClick={() => handleEditClick(order)}
              >
                <img src={PencilIcon} alt="Редактировать" className="icon" />
              </button>
              <button
                className="order-delete-btn-dashboard"
                onClick={() => handleDeleteClick(order.id)}
              >
                <img src={BasketIcon} alt="Удалить" className="icon" />
              </button>
              <button
                className="order-reassign-btn-dashboard"
                onClick={() => handleReassignClick(order)}
              >
                <img src={EmployeeIcon} alt="Переназначить" className="icon" />
              </button>
            </div>
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
      <ModalForEditDashboard
        show={showEditModal}
        onClose={closeEditModal}
        order={orderToEdit}
        onSave={handleEditSave}
      />
      {orderToReassign && (
        <ReassignEmployee
          orderId={orderToReassign.id}
          onEmployeeAssigned={handleEmployeeAssigned}
          show={showReassignModal}
          onClose={closeReassignModal}
        />
      )}
    </div>
  );
};

export default OrderListForSchedule;
