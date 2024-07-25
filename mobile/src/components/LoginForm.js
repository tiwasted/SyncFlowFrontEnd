import React, { useState } from 'react';
import { login as apiLogin } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';
import { useAuth } from '../services/AuthContext';

const LoginForm = () => {
    const [formData, setFormData] = useState({ phone: '', password: '', });
    const navigate = useNavigate();
    const { login } = useAuth();

const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
    console.log('Отправлямые данные:', formData);
    const token = await apiLogin(formData.phone, formData.password); // Вызов функции для входа из auth.js
    console.log('Успешный вход. Токен:', token);
    login(token)
    navigate('/schedule', { replace: true });
    } catch (error) {
    console.error('Ошибка входа:', error.response ? error.response.data : error.message);
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
