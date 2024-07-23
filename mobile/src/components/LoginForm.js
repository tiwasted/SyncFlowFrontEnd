import React, { useState } from 'react';
import { login } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';

const LoginForm = ({ onLogin, isAuthenticated }) => {
    const [formData, setFormData] = useState({
    phone: '',
    password: '',
    });
    const navigate = useNavigate();

const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
const token = await login(formData.phone, formData.password); // Вызов функции для входа из auth.js
    console.log('Успешный вход. Токен:', token);
    onLogin(token); // Уведомляем App об успешной аутентификации
    navigate('/schedule', { replace: true });
    } catch (error) {
    console.error('Ошибка входа:', error);
      // Обработка ошибок при входе
    }
};

return (
    <div className="login-form-container">
      <h2>Войти</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="inputLabel" htmlFor="phone">Телефон:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <label className="inputLabel" htmlFor="password">Пароль:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="submitButton">Войти</button>
      </form>
    </div>
  );
};

export default LoginForm;
