import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useSidebarVisibility } from "../functions/SidebarProvider";
import styles from "../styles/Login.module.css";
import api, { isTokenExpired } from "../services/TokenService";
import Notification from "../components/Notification";

const Login = () => {
  const navigate = useNavigate();
  const { setIsVisible } = useSidebarVisibility();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [notification, setNotification] = useState({ message: "", type: "" }); 

  useEffect(() => {
    setIsVisible(false);
    return () => {
      setIsVisible(true);
    };
  }, [setIsVisible]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      if (!/^\+?[0-9]{10,14}$/.test(username)) {
        setErrorMessage("Неверный формат номера телефона");
        return;
      }

      const response = await api.post("/users/auth/login/", {
        phone: username,
        password: password,
      });

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      if (accessToken && refreshToken) {
        if (isTokenExpired(accessToken) || isTokenExpired(refreshToken)) {
          setErrorMessage(
            "Срок действия токена истек, пожалуйста, войдите снова."
          );
          localStorage.clear();
          navigate("/login");
          return;
        }
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        login(accessToken);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNotification({ message: "Неверный логин или пароль", type: "error" });
      } else if (error.response && error.response.data) {
        const { login: phone, password } = error.response.data;
        if (phone && phone.length > 0) {
          setErrorMessage(phone[0]);
        } else if (password && password.length > 0) {
          setErrorMessage(password[0]);
        } else {
          setErrorMessage("Неверный логин или пароль");
        }
      } else {
        setErrorMessage("Произошла ошибка во время аутентификации");
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleLogin} className={styles.formLogin}>
        <h2 className={styles.h2Login}>Добро пожаловать</h2>
        <h6 className={styles.h6Login}>
          Войдите в систему, чтобы отслеживать заказы и пользоваться нашими
          услугами.
        </h6>
        <input
          type="text"
          placeholder="Логин (номер телефона)"
          className={styles.inputLogin}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          pattern="^\+?[0-9]{10,14}$"
          title="Введите действительный номер телефона"
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className={styles.inputLogin}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={styles.buttonLogin}>
          Войти
        </button>
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <div className={styles.footerText}>
          Если забыли пароль, обратитесь по номеру +7 (708) 364-03-50
        </div>
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

export default Login;