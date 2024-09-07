import React, { useState } from "react";
import "../styles/ChangePasswordModal.css";

const ChangePasswordModal = ({
  oldPassword,
  newPassword,
  confirmNewPassword,
  setOldPassword,
  setNewPassword,
  setConfirmNewPassword,
  handlePasswordChange,
  handleCloseChangePasswordModal,
}) => {
  const [showPasswords, setShowPasswords] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const toggleShowPasswords = () => {
    setShowPasswords(!showPasswords);
  };

  const evaluatePasswordStrength = (password) => {
    if (password.length < 6) {
      setPasswordStrength("weak");
    } else if (password.length < 10) {
      setPasswordStrength("medium");
    } else {
      setPasswordStrength("strong");
    }
  };

  const handleNewPasswordChange = (e) => {
    const password = e.target.value;
    setNewPassword(password);
    evaluatePasswordStrength(password);
  };

  return (
    <div className="settings-change-password-modal-overlay">
      <div className="settings-change-password-modal-content">
        <div className="settings-change-password-modal-header">
          <h2 className="title-change-password">Изменение пароля</h2>
        </div>
        <div className="settings-change-password-modal-body">
          <input
            type={showPasswords ? "text" : "password"}
            className="password-input"
            placeholder="Старый пароль"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type={showPasswords ? "text" : "password"}
            className="password-input"
            placeholder="Новый пароль"
            value={newPassword}
            onChange={handleNewPasswordChange}
          />
          <div className={`password-strength ${passwordStrength}`}></div>
          <input
            type={showPasswords ? "text" : "password"}
            className="password-input"
            placeholder="Подтвердите новый пароль"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <div className="show-passwords-toggle">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={toggleShowPasswords}
            />
            <label className="show-passwords">Показать пароли</label>
          </div>
          <div className="settings-change-password-modal-footer">
            <button
              className="settings-change-password-modal-save-btn"
              onClick={handlePasswordChange}
            >
              Сохранить
            </button>
            <button
              className="settings-change-password-modal-close-btn"
              onClick={handleCloseChangePasswordModal}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
