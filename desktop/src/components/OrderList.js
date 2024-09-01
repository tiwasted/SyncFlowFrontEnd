import React, { useState } from "react";
import AssignEmployee from "../components/AssignEmployee";
import api from "../services/TokenService";
import ModalForDelete from "../components/ModalForDelete";
import ModalForEditDashboard from "./ModalForEdit";
import PencilIcon from "../Icons/Pencil.svg";
import BasketIcon from "../Icons/Basket.svg";
import EmployeeIcon from "../Icons/Employee.png"; // Добавьте иконку сотрудника

const OrderList = ({ orders, updateOrders }) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false); // Новое состояние для модального окна назначения
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orderToEdit, setOrderToEdit] = useState(null);
  const [orderToAssign, setOrderToAssign] = useState(null); // Новое состояние для заказа назначения

  const handleDelete = async () => {
    try {
      await api.delete(`/orders/b2c-orders/${orderToDelete}/`);
      updateOrders();
      setShowModal(false);
    } catch (error) {
      console.error("Ошибка при удалении заказа", error);
    }
  };

  const handleEmployeeAssigned = (updatedOrder) => {
    updateOrders();
    setShowAssignModal(false); // Закрываем модальное окно после назначения
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

  const handleAssignClick = (order) => {
    setOrderToAssign(order);
    setShowAssignModal(true);
  };

  const handleEditSave = async (updatedOrder) => {
    try {
      await api.put(`/orders/b2c-orders/${updatedOrder.id}/`, updatedOrder);
      updateOrders();
      setShowEditModal(false);
    } catch (error) {
      console.error("Ошибка при обновлении заказа", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const closeAssignModal = () => {
    setShowAssignModal(false);
  };

  if (!orders || orders.length === 0) {
    return <div>No orders available.</div>;
  }

  return (
    <div className="order-container-dashboard">
      {orders.map((order) => (
        <div className="order-item-dashboard" key={order.id}>
          <div className="order-item-details-container">
            <div className="order-item-info">
              <p className="order-item-name">Наименование: {order.order_name}</p>
              <p className="order-item-details">{order.order_time}, {order.order_date}, {order.address}</p>
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
                className="order-assign-btn-dashboard"
                onClick={() => handleAssignClick(order)}
              >
                <img src={EmployeeIcon} alt="Назначить сотрудника" className="icon" />
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
      {orderToAssign && (
        <AssignEmployee
          orderId={orderToAssign.id}
          onEmployeeAssigned={handleEmployeeAssigned}
          show={showAssignModal}
          onClose={closeAssignModal}
        />
      )}
    </div>
  );
};

export default OrderList;