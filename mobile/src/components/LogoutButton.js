import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import "../styles/LogoutButton.css";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button className="logoutButton" onClick={handleLogout}>
      Выйти
    </button>
  );
};

export default LogoutButton;
