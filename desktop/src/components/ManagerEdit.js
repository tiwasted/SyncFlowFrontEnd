import React, { useState } from "react";
import api from "../services/TokenService";

const ManagerEdit = ({ manager, onSave, onCancel }) => {
  const [firstName, setFirstName] = useState(manager.first_name);
  const [lastName, setLastName] = useState(manager.last_name);
  const [phone, setPhone] = useState(manager.phone);

  const handleSave = async () => {
    try {
      const updatedManager = {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      };

      const response = await api.put(
        `/employers/manager/edit/${manager.id}/`,
        updatedManager
      );

      onSave(response.data);
    } catch (error) {
      // console.error("Ошибка при сохранении данных сотрудника:", error);
    }
  };

  return (
    <div className="manager-edit-container">
      <h2>Редактирование менеджера</h2>
      <div className="manager-edit-form">
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
        <div className="manager-edit-actions">
          <button onClick={handleSave}>Сохранить</button>
          <button onClick={onCancel}>Отмена</button>
        </div>
      </div>
    </div>
  );
};

export default ManagerEdit;





