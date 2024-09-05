import React, { useState } from "react";
import api from "../services/TokenService";
import "../styles/EmployeeEdit.css"; // Assuming you have a CSS file for styling

const EmployeeEdit = ({ employee, onSave, onCancel, fetchData }) => {
  const [firstName, setFirstName] = useState(employee.first_name);
  const [lastName, setLastName] = useState(employee.last_name);
  const [phone, setPhone] = useState(employee.phone);

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
      fetchData(); // Обновление данных после сохранения
      onCancel(); // Закрытие окна после сохранения
    } catch (error) {
      // console.error("Ошибка при сохранении данных сотрудника:", error);
    }
  };

  return (
    <div className="employee-edit-modal">
      <div className="employee-edit-modal-content">
        <span className="employee-edit-close" onClick={onCancel}>&times;</span>
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
          <button type="button" onClick={handleSave} className="employee-edit-button">Сохранить</button>
          <button type="button" onClick={onCancel} className="employee-edit-button">Отмена</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEdit;