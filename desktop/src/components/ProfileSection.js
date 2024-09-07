import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import "../styles/ProfileSection.css";

const ProfileSection = () => {
  const [profile, setProfile] = useState({
    last_name: "",
    first_name: "",
    company_name: "",
    company_description: "",
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
      // console.error("Ошибка при загрузке профиля:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
  };

  const handleSaveProfile = async () => {
    try {
      await api.put("/users/profile/", profile);
      setMessage("Профиль успешно обновлен!");
      setIsEditing(false);
    } catch (error) {
      setMessage("Ошибка при обновлении профиля");
      // console.error("Ошибка при обновлении профиля:", error);
    }
  };

  return (
    <div className="profile-section">
      <h2 className="profile-title">Профиль</h2>
      {message && <div className="profile-message">{message}</div>}
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
        <label>Название компании:</label>
        {isEditing ? (
          <input
            type="text"
            name="company_name"
            value={profile.company_name}
            onChange={handleInputChange}
          />
        ) : (
          <span>{profile.company_name}</span>
        )}
      </div>
      <div className="profile-field">
        <label>Описание компании:</label>
        {isEditing ? (
          <textarea
            name="company_description"
            value={profile.company_description}
            onChange={handleInputChange}
          />
        ) : (
          <span>{profile.company_description}</span>
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
    </div>
  );
};

export default ProfileSection;
