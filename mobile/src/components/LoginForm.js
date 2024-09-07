import React, { useState } from "react";
import { login as apiLogin } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";
import { useAuth } from "../services/AuthContext";
import Notification from "../components/Notification";

const LoginForm = () => {
  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [notification, setNotification] = useState({ message: "", type: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = await apiLogin(formData.phone, formData.password);
      login(token);
      navigate("/schedule", { replace: true });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNotification({ message: "Неверный логин или пароль", type: "error" });
      } else {
        setNotification({ message: "Ошибка входа", type: "error" });
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <div className="login-form-container">
      <h2>Войти</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="inputLabel" htmlFor="phone">
          Телефон:
        </label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <label className="inputLabel" htmlFor="password">
          Пароль:
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit" className="submitButton">
          Войти
        </button>
      </form>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default LoginForm;