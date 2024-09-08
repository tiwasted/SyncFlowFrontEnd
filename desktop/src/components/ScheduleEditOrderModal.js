import React, { useState } from "react";
import "../styles/ScheduleEditOrderModal.css";

const ScheduleEditOrderModal = ({ order, onClose, onSave }) => {
  const [editedOrder, setEditedOrder] = useState(order ? { ...order } : {});

  if (!order) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedOrder);
    onClose();
  };

  return (
    <div className="schedule-edit-order-modal">
      <div className="schedule-edit-order-modal-content">
        <span className="schedule-edit-order-close" onClick={onClose}>
          &times;
        </span>
        <h2 className="schedule-edit-order-title">Редактировать заказ</h2>
        <form className="schedule-edit-order-form">
          <label className="schedule-edit-order-label">
            Наименование заказа:
            <input
              type="text"
              name="order_name"
              value={editedOrder.order_name}
              onChange={handleChange}
              className="schedule-edit-order-input"
            />
          </label>
          <label className="schedule-edit-order-label">
            Цена:
            <input
              type="number"
              name="price"
              value={editedOrder.price}
              onChange={handleChange}
              className="schedule-edit-order-input"
            />
          </label>
          <label className="schedule-edit-order-label">
            Дата:
            <input
              type="date"
              name="order_date"
              value={editedOrder.order_date}
              onChange={handleChange}
              className="schedule-edit-order-input"
            />
          </label>
          <label className="schedule-edit-order-label">
            Время:
            <input
              type="time"
              name="order_time"
              value={editedOrder.order_time}
              onChange={handleChange}
              className="schedule-edit-order-input"
            />
          </label>
          <label className="schedule-edit-order-label">
            Адрес:
            <input
              type="text"
              name="address"
              value={editedOrder.address}
              onChange={handleChange}
              className="schedule-edit-order-input"
            />
          </label>
          <label className="schedule-edit-order-label">
            Имя клиента:
            <input
              type="text"
              name="name_client"
              value={editedOrder.name_client}
              onChange={handleChange}
              className="schedule-edit-order-input"
            />
          </label>
          <label className="schedule-edit-order-label">
            Номер телефона клиента:
            <input
              type="text"
              name="phone_number_client"
              value={editedOrder.phone_number_client}
              onChange={handleChange}
              className="schedule-edit-order-input"
            />
          </label>
          <label className="schedule-edit-order-label">
            Описание:
            <textarea
              name="description"
              value={editedOrder.description}
              onChange={handleChange}
              className="schedule-edit-order-textarea"
            />
          </label>

          <button
            type="button"
            onClick={handleSave}
            className="schedule-edit-order-button"
          >
            Сохранить
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleEditOrderModal;
