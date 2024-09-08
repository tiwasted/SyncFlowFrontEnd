import React, { useState, useEffect } from "react";
import { useOrders } from "../context/OrderProvider";
import api from "../services/TokenService";
import Notification from "./Notification";

const ModalForCreateOrderDashboard = ({ show, onClose, fetchOrders }) => {
  const [nameOfOrder, setOrderName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [nameOfClient, setNameOfClient] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [orderSaved, setOrderSaved] = useState(false);
  const { setOrders } = useOrders();

  useEffect(() => {
    if (!show) {
      resetForm();
    }
  }, [show]);

  const resetForm = () => {
    setOrderName("");
    setPrice("");
    setDate("");
    setTime("");
    setAddress("");
    setNameOfClient("");
    setPhoneNumber("");
    setDescription("");
    setError("");
    setOrderSaved(false);
  };

  const handleSaveOrder = async () => {
    if (
      !nameOfOrder &&
      !price &&
      !date &&
      !time &&
      !address &&
      !nameOfClient &&
      !phoneNumber &&
      !description
    ) {
      setError("Заполните хотя бы одно поле");
      return;
    }

    try {
      const orderData = {
        order_name: nameOfOrder || undefined,
        price: price || undefined,
        order_date: date || undefined,
        order_time: time || undefined,
        address: address || undefined,
        name_client: nameOfClient || undefined,
        phone_number_client: phoneNumber || undefined,
        description: description || undefined,
      };

      const response = await api.post("/orders/b2c-orders/", orderData);
      setOrders((prevOrders) => [...prevOrders, response.data]);
      setOrderSaved(true);
      fetchOrders();
      setTimeout(() => {
        resetForm();
        onClose();
      }, 1500);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || "Ошибка при создании заказа");
      } else {
        setError("Ошибка при создании заказа");
      }
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSaveOrder();
  };

  const handleCloseNotification = () => {
    setError("");
    setOrderSaved(false);
  };

  if (!show) {
    return null;
  }

  return (
    <div className="edit-dashboard-modal">
      <div className="edit-dashboard-modal-content">
        <span className="edit-dashboard-close" onClick={onClose}>
          &times;
        </span>
        <h2 className="edit-dashboard-title">Добавить заказ</h2>
        <form className="edit-dashboard-form" onSubmit={handleFormSubmit}>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Наименование заказа:</label>
            <input
              type="text"
              className="edit-dashboard-input"
              value={nameOfOrder}
              onChange={(e) => setOrderName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="edit-dashboard-label">Цена:</label>
            <input
              type="text"
              className="edit-dashboard-input"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Дата:</label>
            <input
              type="date"
              className="edit-dashboard-input"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Время:</label>
            <input
              type="time"
              className="edit-dashboard-input"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Адрес:</label>
            <input
              type="text"
              className="edit-dashboard-input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Имя клиента:</label>
            <input
              type="text"
              className="edit-dashboard-input"
              value={nameOfClient}
              onChange={(e) => setNameOfClient(e.target.value)}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">
              Номер телефона клиента:
            </label>
            <input
              type="text"
              className="edit-dashboard-input"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="edit-dashboard-form-group">
            <label className="edit-dashboard-label">Описание:</label>
            <textarea
              value={description}
              className="edit-dashboard-textarea"
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="edit-dashboard-button">
            Сохранить
          </button>
        </form>
        {error && (
          <Notification
            message={error}
            type="error"
            onClose={handleCloseNotification}
          />
        )}
        {orderSaved && (
          <Notification
            message="Заказ успешно добавлен"
            type="success"
            onClose={handleCloseNotification}
          />
        )}
      </div>
    </div>
  );
};

export default ModalForCreateOrderDashboard;
