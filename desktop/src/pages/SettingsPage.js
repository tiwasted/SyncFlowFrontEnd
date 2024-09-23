import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import AddLocationModal from "../components/AddLocationModal";
import ChangePasswordModal from "../components/ChangePasswordModal";
import Notification from "../components/Notification";
import ProfileSection from "../components/ProfileSection";
import PaymentMethodsModal from "../components/PaymentMethodsModal";
import "../styles/SettingsPage.css";

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
  const [showPaymentMethodsModal, setShowPaymentMethodsModal] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState([]);

  const fetchCountries = async () => {
    try {
      const response = await api.get("/orders/countries/");
      setCountries(response.data || []);
    } catch (error) {
      setMessage("Ошибка при загрузке стран");
    }
  };

  const fetchCities = async (countryId) => {
    try {
      if (countryId) {
        const response = await api.get(
          `/orders/countries/${countryId}/cities/`
        );
        setCities(response.data || []);
      } else {
        setCities([]);
      }
    } catch (error) {
      setMessage("Ошибка при загрузке городов");
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await api.get("/orders/payment-methods/");
      setPaymentMethods(response.data || []);
    } catch (error) {
      setMessage("Ошибка при загрузке способов оплаты");
    }
  };

  const fetchSelectedPaymentMethods = async () => {
    try {
      const response = await api.get("/employers/available-payment-methods/");
      setSelectedPaymentMethods(response.data.payment_methods || []);
    } catch (error) {
      setMessage("Ошибка при загрузке выбранных способов оплаты");
    }
  };

  const handleSavePaymentMethods = async (selectedMethods) => {
    try {
      await api.post("/employers/add-payment-method/", {
        payment_method_ids: selectedMethods.map((method) => method.id),
      });
      setMessage("Способы оплаты успешно сохранены!");
      handleClosePaymentMethodsModal();
      fetchSelectedPaymentMethods();
    } catch (error) {
      setMessage("Ошибка при сохранении способов оплаты");
    }
  };

  useEffect(() => {
    fetchCities(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    fetchSelectedPaymentMethods();
  }, []);

  const handleAddCountryAndCities = async () => {
    try {
      await api.post("/employers/add-countries/", {
        country_ids: [selectedCountry],
      });

      await api.post("/employers/add-cities/", {
        city_ids: selectedCities,
      });

      setMessage("Страна и города успешно добавлены!");
      handleCloseAddLocationModal();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        setNotification({ message: error.response.data.detail, type: "error" });
      } else {
        setMessage("Ошибка при добавлении данных");
      }
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
      await api.put("/users/change-password/", {
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
        setMessage(
          `Ошибка: ${error.response.data.detail || "Неизвестная ошибка"}`
        );
      } else {
        setMessage("Ошибка при изменении пароля");
      }
    }
  };

  const handleOpenAddLocationModal = async () => {
    setShowAddLocationModal(true);
    setMessage("");
    await fetchCountries();
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

  const handleOpenPaymentMethodsModal = async () => {
    setShowPaymentMethodsModal(true);
    setMessage("");
    await fetchPaymentMethods();
  };

  const handleClosePaymentMethodsModal = () => {
    setShowPaymentMethodsModal(false);
    setMessage("");
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(Number(e.target.value));
    setSelectedCities([]);
  };

  const handleCityChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCities((prevCities) =>
      checked
        ? [...prevCities, Number(value)]
        : prevCities.filter((cityId) => cityId !== Number(value))
    );
  };

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
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

        <button
          className="change-pass-btn"
          onClick={handleOpenChangePasswordModal}
        >
          Изменить пароль
        </button>

        <button
          className="choose-payment-methods-btn"
          onClick={handleOpenPaymentMethodsModal}
        >
          Выбрать способы оплаты
        </button>
      </div>
      <ProfileSection />
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

      {showPaymentMethodsModal && (
        <PaymentMethodsModal
          paymentMethods={paymentMethods}
          selectedPaymentMethods={selectedPaymentMethods}
          setSelectedPaymentMethods={setSelectedPaymentMethods}
          handleSavePaymentMethods={handleSavePaymentMethods}
          handleClosePaymentMethodsModal={handleClosePaymentMethodsModal}
        />
      )}

      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}

      <div className="selected-payment-methods">
        <h2 className="selected-payment-methods-title">
          Выбранные способы оплаты:
        </h2>
        <ul className="selected-payment-methods-list">
          {selectedPaymentMethods.map((method) => (
            <li key={method.id} className="selected-payment-methods-item">
              {method.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SettingsPage;
