import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import Notification from "../components/Notification";
import "../styles/ManagerEdit.css";

const ManagerEdit = ({ manager, onSave, onCancel, fetchData }) => {
  const [firstName, setFirstName] = useState(manager.first_name);
  const [lastName, setLastName] = useState(manager.last_name);
  const [phone, setPhone] = useState(manager.phone);
  const [cities, setCities] = useState(manager.cities || []);
  const [availableCities, setAvailableCities] = useState([]);
  const [addCities, setAddCities] = useState([]);
  const [removeCities, setRemoveCities] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchAvailableCities = async () => {
      try {
        const response = await api.get("/employers/available-cities/");
        setAvailableCities(response.data.cities);
      } catch (error) {
        // console.error("Ошибка при получении доступных городов:", error);
      }
    };

    fetchAvailableCities();
  }, []);

  const handleSave = async () => {
    try {
      const updatedManager = {
        first_name: firstName,
        last_name: lastName,
        phone: phone,
        add_cities: addCities,
        remove_cities: removeCities,
      };

      const response = await api.put(`/employers/manager/edit/${manager.id}/`, updatedManager);

      onSave(response.data);
      fetchData();
      onCancel();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setNotification({ message: error.response.data.detail, type: "error" });
      } else {
        // console.error("Ошибка при сохранении данных менеджера:", error);
      }
    }
  };

  const handleAddCity = (cityId) => {
    const cityToAdd = availableCities.find(city => city.id === cityId);
  
    if (cityToAdd && !cities.some(city => city.id === cityToAdd.id)) {
      setCities(prevCities => {
        const updatedCities = [...prevCities, cityToAdd];
        return updatedCities;
      });
      setAddCities(prevAddCities => [...prevAddCities, cityToAdd.id]);
      setRemoveCities(prevRemoveCities => prevRemoveCities.filter(id => id !== cityToAdd.id));
    }
  };

  const handleRemoveCity = (cityId) => {
    const cityToRemove = cities.find(city => city.id === cityId);

    if (cityToRemove) {
      setCities(prevCities => prevCities.filter(city => city.id !== cityId));
      setAddCities(prevAddCities => prevAddCities.filter(id => id !== cityId));
      if (!addCities.includes(cityId)) {
        setRemoveCities(prevRemoveCities => [...prevRemoveCities, cityId]);
      }
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <div className="manager-edit-modal">
      <div className="manager-edit-modal-content">
        <span className="manager-edit-close" onClick={onCancel}>
          &times;
        </span>
        <h2 className="manager-edit-title">Редактирование менеджера</h2>
        <form className="manager-edit-form">
          <label className="manager-edit-label">
            Имя:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="manager-edit-input"
            />
          </label>
          <label className="manager-edit-label">
            Фамилия:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="manager-edit-input"
            />
          </label>
          <label className="manager-edit-label">
            Номер телефона:
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="manager-edit-input"
            />
          </label>
          <div className="manager-edit-cities">
            <div className="manager-edit-cities-list">
              <h3>Доступные города</h3>
              <ul>
                {availableCities.map(city => (
                  <li key={city.id}>
                    {city.name}
                    <button type="button" onClick={() => handleAddCity(city.id)}>
                      Добавить
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="manager-edit-cities-list">
              <h3>Города менеджера</h3>
              <ul>
                {cities.map(city => (
                  <li key={city.id}>
                    {city.name}
                    <button type="button" onClick={() => handleRemoveCity(city.id)}>
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="manager-edit-button"
          >
            Сохранить
          </button>
        </form>
      </div>
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

export default ManagerEdit;