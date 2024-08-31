import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import AddLocationModal from "../components/AddLocationModal";
import ChangePasswordModal from "../components/ChangePasswordModal";

const SettingsPage = () => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showAddLocationModal, setShowAddLocationModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const fetchCountries = async () => {
    try {
      const response = await api.get("/orders/countries/");
      setCountries(response.data || []);
    } catch (error) {
      setMessage("Ошибка при загрузке стран");
      console.error("Ошибка при загрузке стран:", error);
    }
  };

  const fetchCities = async (countryId) => {
    try {
      if (countryId) {
        const response = await api.get(`/orders/countries/${countryId}/cities/`);
        setCities(response.data || []);
      } else {
        setCities([]);
      }
    } catch (error) {
      setMessage("Ошибка при загрузке городов");
      console.error("Ошибка при загрузке городов:", error);
    }
  };

  useEffect(() => {
    fetchCities(selectedCountry);
  }, [selectedCountry]);

  const handleAddCountryAndCities = async () => {
    try {
      const addCountryPromise = api.post("/employers/add-countries/", {
        country_ids: [selectedCountry],
      });
      const addCitiesPromise = api.post("/employers/add-cities/", {
        city_ids: selectedCities,
      });

      await Promise.all([addCountryPromise, addCitiesPromise]);

      setMessage("Страна и города успешно добавлены!");
      handleCloseAddLocationModal();
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`Ошибка: ${error.response.data.detail || "Неизвестная ошибка"}`);
      } else {
        setMessage("Ошибка при добавлении данных");
      }
      console.error("Ошибка при добавлении страны и городов:", error);
    }
  };

  const handlePasswordChange = async () => {
    if (!oldPassword) {
      setMessage("Введите старый пароль");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setMessage("Новый пароль и его подтверждение не совпадают");
      return;
    }

    try {
      await api.put("/employers/change-password/", {
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmNewPassword,
      });
      setMessage("Пароль успешно изменён!");
      setTimeout(() => {
        handleCloseChangePasswordModal();
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`Ошибка: ${error.response.data.detail || "Неизвестная ошибка"}`);
      } else {
        setMessage("Ошибка при изменении пароля");
      }
      console.error("Ошибка при изменении пароля:", error);
    }
  };

  const handleOpenAddLocationModal = async () => {
    setShowAddLocationModal(true);
    setMessage("");
    await fetchCountries(); // Вызов fetchCountries при открытии модального окна
  };

  const handleCloseAddLocationModal = () => {
    setShowAddLocationModal(false);
    setSelectedCountry(null);
    setSelectedCities([]);
    setMessage("");
  };

  const handleOpenChangePasswordModal = () => {
    setShowChangePasswordModal(true);
    setMessage("");
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setMessage("");
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(Number(e.target.value));
    setSelectedCities([]); // Reset selected cities when country changes
  };

  const handleCityChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCities((prevCities) =>
      checked
        ? [...prevCities, Number(value)]
        : prevCities.filter((cityId) => cityId !== Number(value))
    );
  };

  return (
    <div className="settings-container">
      <h1 className="settings-title">Настройки</h1>
      <div className="settings-buttons">
        <button
          className="choose-cities-btn"
          onClick={handleOpenAddLocationModal}
        >
          Добавить город(-а)
        </button>
      </div>

      <div>
        <button
          className="change-pass-btn"
          onClick={handleOpenChangePasswordModal}
        >
          Изменить пароль
        </button>
      </div>
      {message && <div className="settings-message">{message}</div>}

      {showAddLocationModal && (
        <AddLocationModal
          countries={countries}
          selectedCountry={selectedCountry}
          cities={cities}
          selectedCities={selectedCities}
          handleCountryChange={handleCountryChange}
          handleCityChange={handleCityChange}
          handleAddCountryAndCities={handleAddCountryAndCities}
          handleCloseAddLocationModal={handleCloseAddLocationModal}
        />
      )}

      {showChangePasswordModal && (
        <ChangePasswordModal
          oldPassword={oldPassword}
          newPassword={newPassword}
          confirmNewPassword={confirmNewPassword}
          setOldPassword={setOldPassword}
          setNewPassword={setNewPassword}
          setConfirmNewPassword={setConfirmNewPassword}
          handlePasswordChange={handlePasswordChange}
          handleCloseChangePasswordModal={handleCloseChangePasswordModal}
        />
      )}
    </div>
  );
};

export default SettingsPage;