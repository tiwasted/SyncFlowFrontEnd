import React, { useState } from "react";
import api from "../services/TokenService";

const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // Добавлено состояние для подтверждения нового пароля
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const handleOpenModal = () => {
    setShowModal(true);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword(""); // Сброс состояния подтверждения пароля
    setMessage("");
  };

  const handleCloseModal = () => setShowModal(false);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      // Проверка совпадения нового пароля и его подтверждения
      setMessage("Новый пароль и его подтверждение не совпадают");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      await api.put(
        "/employers/change-password/",
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmNewPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Пароль успешно изменён!");
      setTimeout(() => {
        handleCloseModal();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(
          `Ошибка: ${error.response.data.detail || "Неизвестная ошибка"}`
        );
      } else {
        setMessage("Ошибка при изменении пароля");
      }
    }
  };

  return (
    <div>
      <h1 className="settings-title">Настройки</h1>
      <button className="settings-change-pass-btn" onClick={handleOpenModal}>
        Изменить пароль
      </button>

      {showModal && (
        <div className="add-order-container">
          <div className="add-form-group">
            <div>
              <h2 className="add-form-group">Изменение пароля</h2>
            </div>
            <div className="">
              <input
                type="password"
                placeholder="Старый пароль"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="add-form-group"
              />
              <input
                type="password"
                placeholder="Новый пароль"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="add-form-group"
              />
              <input
                type="password"
                placeholder="Подтвердите новый пароль" // Новое поле для подтверждения пароля
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="add-form-group"
              />
              {message && <p className="message">{message}</p>}
            </div>
            <div className="form-btns">
              <button className="general-btns" onClick={handlePasswordChange}>
                Сохранить изменения
              </button>
              <button className="general-btns" onClick={handleCloseModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
