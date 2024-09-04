import React, { useState } from "react";
import api from "../services/TokenService";

const EmployeeEdit = ({ employee, onSave, onCancel }) => {
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
    } catch (error) {
      // console.error("Ошибка при сохранении данных сотрудника:", error);
    }
  };

  return (
    <div className="employee-edit-container">
      <h2>Редактирование сотрудника</h2>
      <div className="employee-edit-form">
        <label>
          Имя:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Фамилия:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Номер телефона:
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </label>
        <div className="employee-edit-actions">
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
