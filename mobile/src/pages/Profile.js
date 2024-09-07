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
  const [isEditing, setIsEditing] = useState(false);
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
      console.error('Ошибка при загрузке профиля:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      await api.put("/users/profile/edit/", profile);
      setMessage("Профиль успешно обновлен!");
      setIsEditing(false);
    } catch (error) {
      setMessage("Ошибка при обновлении профиля");
      console.error('Ошибка при обновлении профиля:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-title">Профиль</div>

      {message && <div className="profile-message">{message}</div>}
      <div className="profile-field">
        <label>Имя:</label>
        {isEditing ? (
          <input
            type="text"
            name="first_name"
            value={profile.first_name}
            onChange={handleInputChange}
          />
        ) : (
          <span>{profile.first_name}</span>
        )}
      </div>
      <div className="profile-field">
        <label>Фамилия:</label>
        {isEditing ? (
          <input
            type="text"
            name="last_name"
            value={profile.last_name}
            onChange={handleInputChange}
          />
        ) : (
          <span>{profile.last_name}</span>
        )}
      </div>
      {isEditing ? (
        <button className="profile-save-btn" onClick={handleSaveProfile}>
          Сохранить
        </button>
      ) : (
        <button className="profile-edit-btn" onClick={() => setIsEditing(true)}>
          Редактировать
        </button>
      )}
      <ChangePassword />
      <div className="profile-exit-btn">
        <LogoutButton />
      </div>
    </div>
  );
};

export default Profile;
