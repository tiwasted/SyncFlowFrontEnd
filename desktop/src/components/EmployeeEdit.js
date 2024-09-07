import React, { useState } from "react";
import api from "../services/TokenService";
import Notification from "../components/Notification";
import "../styles/EmployeeEdit.css";

const EmployeeEdit = ({ employee, onSave, onCancel, fetchData }) => {
  const [firstName, setFirstName] = useState(employee.first_name);
  const [lastName, setLastName] = useState(employee.last_name);
  const [phone, setPhone] = useState(employee.phone);
  const [notification, setNotification] = useState({ message: "", type: "" });

  const handleSave = async () => {
    try {
      const updatedEmployee = {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      };

      const response = await api.put(
        `/employees/edit/${employee.id}/`,
        updatedEmployee
      );

      onSave(response.data);
      fetchData();
      onCancel();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setNotification({ message: error.response.data.detail, type: "error" });
      } else {
        // console.error("Ошибка при сохранении данных сотрудника:", error);
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <div className="employee-edit-modal">
      <div className="employee-edit-modal-content">
        <span className="employee-edit-close" onClick={onCancel}>
          &times;
        </span>
        <h2 className="employee-edit-title">Редактирование сотрудника</h2>
        <form className="employee-edit-form">
          <label className="employee-edit-label">
            Имя:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="employee-edit-input"
            />
          </label>
          <label className="employee-edit-label">
            Фамилия:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="employee-edit-input"
            />
          </label>
          <label className="employee-edit-label">
            Номер телефона:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="employee-edit-input"
            />
          </label>
          <button
            type="button"
            onClick={handleSave}
            className="employee-edit-button"
          >
            Сохранить
          </button>
        </form>
      </div>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default EmployeeEdit;
