import React, { useState } from 'react';

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
    <div className="schedule-order-modal">
      <div className="schedule-order-modal-content">
        <span className="schedule-order-close" onClick={onClose}>&times;</span>
        <h2 className="schedule-order-title">Редактировать заказ</h2>
        <form className="schedule-order-form">
          <label className="schedule-order-label">
            Наименование:
            <input
              type="text"
              name="name"
              value={editedOrder.name}
              onChange={handleChange}
              className="schedule-order-input"
            />
          </label>
          <label className="schedule-order-label">
            Дата заказа:
            <input
              type="date"
              name="order_date"
              value={editedOrder.order_date}
              onChange={handleChange}
              className="schedule-order-input"
            />
          </label>
          <label className="schedule-order-label">
            Время заказа:
            <input
              type="time"
              name="order_time"
              value={editedOrder.order_time}
              onChange={handleChange}
              className="schedule-order-input"
            />
          </label>
          <label className="schedule-order-label">
            Имя клиента:
            <input
              type="text"
              name="name_client"
              value={editedOrder.name_client}
              onChange={handleChange}
              className="schedule-order-input"
            />
          </label>
          <label className="schedule-order-label">
            Номер клиента:
            <input
              type="text"
              name="phone_number_client"
              value={editedOrder.phone_number_client}
              onChange={handleChange}
              className="schedule-order-input"
            />
          </label>
          <label className="schedule-order-label">
            Адрес:
            <input
              type="text"
              name="address"
              value={editedOrder.address}
              onChange={handleChange}
              className="schedule-order-input"
            />
          </label>
          <label className="schedule-order-label">
            Описание заказа:
            <textarea
              name="description"
              value={editedOrder.description}
              onChange={handleChange}
              className="schedule-order-textarea"
            />
          </label>
          <label className="schedule-order-label">
            Цена:
            <input
              type="number"
              name="price"
              value={editedOrder.price}
              onChange={handleChange}
              className="schedule-order-input"
            />
          </label>
          <button type="button" onClick={handleSave} className="schedule-order-button">Сохранить</button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleEditOrderModal;