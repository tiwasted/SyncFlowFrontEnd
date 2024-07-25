// SettingsPage.jsx
import React, { useState } from 'react';
import axios from 'axios';

const SettingsPage = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = async () => {
    try {
      const token = localStorage.getItem('token'); // Получаем JWT токен из локального хранилища
      const response = await axios.post(
        'http://localhost:8000/api/change-password/',
        { old_password: oldPassword, new_password: newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Password changed successfully:', response.data);
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  return (
    <div>
      <h1>Настройки</h1>
      <input
        type="password"
        placeholder="Старый пароль"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Новый пароль"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <button onClick={handlePasswordChange}>Изменить пароль</button>
    </div>
  );
};

export default SettingsPage;
