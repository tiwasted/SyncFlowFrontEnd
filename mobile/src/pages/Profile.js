import React, { useState, useEffect } from "react";
import "../styles/Profile.css";
import api from "../services/tokenService";
import LogoutButton from "../components/LogoutButton";
import ChangePassword from "../components/ChangePassword";

const Profile = () => {
  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/users/profile/");
      setProfile(response.data);
    } catch (error) {
      setMessage("Ошибка при загрузке профиля");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-title">Профиль</div>

      {message && <div className="profile-message">{message}</div>}
      <div className="profile-field">
        <label>Имя:</label>
        <span>{profile.first_name}</span>
      </div>
      <div className="profile-field">
        <label>Фамилия:</label>
        <span>{profile.last_name}</span>
      </div>
      <ChangePassword />
      <div className="profile-exit-btn">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
