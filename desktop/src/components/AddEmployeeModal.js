import React, { useState } from "react";
import api from "../services/TokenService";

const AddEmployeeModal = ({ isOpen, onClose, onEmployeeAdded }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const addEmployee = async () => {
    if (!firstName || !lastName || !password || !phoneNumber) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    const newEmployee = {
      first_name: firstName,
      last_name: lastName,
      password: password,
      phone: phoneNumber,
    };

    try {
      const response = await api.post("/employees/create/", newEmployee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      onEmployeeAdded(response.data);
      onClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Ошибка при добавлении сотрудника";
      setError(errorMessage);
      console.error(
        "Error adding employee",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        <h2 className="modal-title">Добавить сотрудника</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-input"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Номер телефона"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <button className="form-button" onClick={addEmployee}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
