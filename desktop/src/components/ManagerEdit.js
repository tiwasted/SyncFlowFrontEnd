import React, { useState } from "react";
import api from "../services/TokenService";
import "../styles/ManagerEdit.css"; // Assuming you have a CSS file for styling

const ManagerEdit = ({ manager, onSave, onCancel, fetchData }) => {
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
      fetchData(); // Обновление данных после сохранения
      onCancel(); // Закрытие окна после сохранения
    } catch (error) {
      // console.error("Ошибка при сохранении данных сотрудника:", error);
    }
  };

  return (
    <div className="manager-edit-modal">
      <div className="manager-edit-modal-content">
        <span className="manager-edit-close" onClick={onCancel}>&times;</span>
        <h2 className="manager-edit-title">Редактирование менеджера</h2>
        <form className="manager-edit-form">
          <label className="manager-edit-label">
            Имя:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="manager-edit-input"
            />
          </label>
          <label className="manager-edit-label">
            Фамилия:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="manager-edit-input"
            />
          </label>
          <label className="manager-edit-label">
            Номер телефона:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="manager-edit-input"
            />
          </label>
          <button type="button" onClick={handleSave} className="manager-edit-button">Сохранить</button>
          <button type="button" onClick={onCancel} className="manager-edit-button">Отмена</button>
        </form>
      </div>
    </div>
  );
};

export default ManagerEdit;