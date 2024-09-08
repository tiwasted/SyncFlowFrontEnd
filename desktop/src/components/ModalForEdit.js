import React, { useState, useEffect } from "react";

const ModalForEditDashboard = ({
  show,
  onClose,
  order,
  onSave,
  fetchOrders,
}) => {
  const [editedOrder, setEditedOrder] = useState(order || {});

  useEffect(() => {
    setEditedOrder(order || {});
  }, [order]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder({ ...editedOrder, [name]: value });
  };

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedOrder = {
      ...editedOrder,
      order_date: editedOrder.order_date
        ? formatDate(editedOrder.order_date)
        : null,
    };
    await onSave(updatedOrder);
    fetchOrders();
    onClose();
  };

  if (!show || !order) {
    return null;
  }

  return (
    <div className="edit-dashboard-modal">
      <div className="edit-dashboard-modal-content">
        <span className="edit-dashboard-close" onClick={onClose}>
          &times;
        </span>
        <h2 className="edit-dashboard-title">Редактировать заказ</h2>
        <form className="edit-dashboard-form" onSubmit={handleSubmit}>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Наименование заказа:</label>
            <input
              type="text"
              name="order_name"
              className="edit-dashboard-input"
              value={editedOrder.order_name || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Цена:</label>
            <input
              type="number"
              name="price"
              className="edit-dashboard-input"
              value={editedOrder.price || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Дата:</label>
            <input
              type="date"
              name="order_date"
              className="edit-dashboard-input"
              value={editedOrder.order_date || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Время:</label>
            <input
              type="time"
              name="order_time"
              className="edit-dashboard-input"
              value={editedOrder.order_time || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Адрес:</label>
            <input
              type="text"
              name="address"
              className="edit-dashboard-input"
              value={editedOrder.address || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Имя клиента:</label>
            <input
              type="text"
              name="name_client"
              className="edit-dashboard-input"
              value={editedOrder.name_client || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">
              Номер телефона клиента:
            </label>
            <input
              type="text"
              name="phone_number_client"
              className="edit-dashboard-input"
              value={editedOrder.phone_number_client || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Описание:</label>
            <textarea
              name="description"
              className="edit-dashboard-textarea"
              value={editedOrder.description || ""}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="edit-dashboard-button">
            Сохранить изменения
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalForEditDashboard;
