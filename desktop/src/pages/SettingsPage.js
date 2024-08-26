import React, { useState, useEffect } from "react";
import api from "../services/TokenService";

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

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/orders/countries/");
        setCountries(response.data || []);
      } catch (error) {
        setMessage("Ошибка при загрузке стран");
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (selectedCountry) {
          const response = await api.get(
            `/orders/countries/${selectedCountry}/cities/`
          );
          setCities(response.data || []);
        } else {
          setCities([]);
        }
      } catch (error) {
        setMessage("Ошибка при загрузке городов");
      }
    };

    fetchCities();
  }, [selectedCountry]);

  const handleAddCountryAndCities = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const addCountryPromise = api.post("/employers/add-countries/", {
        country_ids: [selectedCountry],
      });
      const addCitiesPromise = api.post(
        "/employers/add-cities/",
        {
          city_ids: selectedCities,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      await Promise.all([addCountryPromise, addCitiesPromise]);

      setMessage("Страна и города успешно добавлены!");
      handleCloseAddLocationModal();
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(
          `Ошибка: ${error.response.data.detail || "Неизвестная ошибка"}`
        );
      } else {
        setMessage("Ошибка при добавлении данных");
      }
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmNewPassword) {
      setMessage("Новый пароль и его подтверждение не совпадают");
      return;
    }

    try {
      const token = localStorage.getItem("access_token");
      await api.put(
        "/employers/change-password/",
        {
          old_password: oldPassword,
          new_password: newPassword,
          confirm_password: confirmNewPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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

  const handleOpenAddLocationModal = () => {
    setShowAddLocationModal(true);
    setMessage("");
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
  //   <div className="settings-container">
  //     <h1 className="settings-title">Настройки</h1>
  //     <button className="settings-btn add-country-btn" onClick={handleOpenAddLocationModal}>
  //       Добавить город(-а)
  //     </button>
  //     <button className="settings-btn change-pass-btn" onClick={handleOpenChangePasswordModal}>
  //       Изменить пароль
  //     </button>
  //     {message && <div className="settings-message">{message}</div>}
  //     {showAddLocationModal && (
  //       <div className="settings-modal-overlay-add-country">
  //         <div className="settings-modal-content-add-country">
  //           <div className="settings-modal-header-add-country">
  //             <h2 className="title-add-country">Добавление городов</h2>
  //           </div>
  //           <div className="settings-modal-body-add-country">
  //             <div className="settings-choose-country-form-group">
  //               <label>Выберите страну:</label>
  //               {countries.map((country) => (
  //                 <div className="settings-type-radio-country" key={country.id}>
  //                   <input
  //                     type="radio"
  //                     name="country"
  //                     value={country.id}
  //                     checked={selectedCountry === country.id}
  //                     onChange={handleCountryChange}
  //                   />
  //                   <label className="settings-name-of-country">{country.name}</label>
  //                 </div>
  //               ))}
  //             </div>
  //             {selectedCountry && (
  //               <div className="settings-choose-city-form-group show">
  //                 <label>Выберите города:</label>
  //                 {cities.map((city) => (
  //                   <div className="settings-type-checkbox-cities" key={city.id}>
  //                     <input
  //                       type="checkbox"
  //                       name="city"
  //                       value={city.id}
  //                       checked={selectedCities.includes(city.id)}
  //                       onChange={handleCityChange}
  //                     />
  //                     <label className="settings-name-fo-cities">{city.name}</label>
  //                   </div>
  //                 ))}
  //               </div>
  //             )}
  //             <div className="settings-form-btns">
  //               <button className="settings-modal-btn save-btn" onClick={handleAddCountryAndCities}>
  //                 Сохранить
  //               </button>
  //               <button className="settings-modal-btn close-btn" onClick={handleCloseAddLocationModal}>
  //                 Закрыть
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //     {showChangePasswordModal && (
  //       <div className="settings-modal-overlay-change-password">
  //         <div className="settings-modal-content-change-password">
  //           <div className="settings-modal-header-change-password">
  //             <h2 className="title-change-password">Изменение пароля</h2>
  //           </div>
  //           <div className="settings-modal-body">
  //             <input
  //               type="password"
  //               className="password-input"
  //               placeholder="Старый пароль"
  //               value={oldPassword}
  //               onChange={(e) => setOldPassword(e.target.value)}
  //             />
  //             <input
  //               type="password"
  //               className="password-input"
  //               placeholder="Новый пароль"
  //               value={newPassword}
  //               onChange={(e) => setNewPassword(e.target.value)}
  //             />
  //             <input
  //               type="password"
  //               className="password-input"
  //               placeholder="Подтвердите новый пароль"
  //               value={confirmNewPassword}
  //               onChange={(e) => setConfirmNewPassword(e.target.value)}
  //             />
  //             <div className="settings-form-btns">
  //               <button className="settings-modal-btn save-btn" onClick={handlePasswordChange}>
  //                 Сохранить
  //               </button>
  //               <button className="settings-modal-btn close-btn" onClick={handleCloseChangePasswordModal}>
  //                 Закрыть
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // );

  
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
  </div>
  {message && <div className="settings-message">{message}</div>}

  {showAddLocationModal && (
    <div className="settings-choose-cities-modal-overlay">
      <div className="settings-choose-cities-modal-content">
        <div className="settings-choose-cities-modal-header">
          <h2 className="title-choose-cities">Добавление городов</h2>
        </div>
        <div className="settings-choose-cities-modal-body">
          <div className="settings-choose-cities-form-group">
            <label>Выберите страну:</label>
            <div className="country-select">
              {countries.map((country) => (
                <div className="radio-group" key={country.id}>
                  <label
                    htmlFor={`country-${country.id}`}
                    className="radio-label"
                  >
                    {country.name}
                  </label>
                  <input
                    type="radio"
                    name="country"
                    value={country.id}
                    checked={selectedCountry === country.id}
                    onChange={handleCountryChange}
                    id={`country-${country.id}`}
                    className="input-country"
                  />
                </div>
              ))}
            </div>
          </div>
          {selectedCountry && (
            <div className="settings-form-group-choose-cities">
              <label className="label-choose-cities">Выберите города:</label>
              <div className="city-select">
                {cities.map((city) => (
                  <div className="checkbox-group" key={city.id}>
                    <label
                      htmlFor={`city-${city.id}`}
                      className="checkbox-label"
                    >
                      {city.name}
                    </label>
                    <input
                      type="checkbox"
                      name="city"
                      value={city.id}
                      checked={selectedCities.includes(city.id)}
                      onChange={handleCityChange}
                      id={`city-${city.id}`}
                      className="input-city"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="settings-choose-cities-modal-footer">
            <button
              className="settings-choose-cities-save-btn"
              onClick={handleAddCountryAndCities}
            >
              Сохранить
            </button>
            <button
              className="settings-choose-cities-close-btn"
              onClick={handleCloseAddLocationModal}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  )}

  {showChangePasswordModal && (
    <div className="settings-change-password-modal-overlay">
      <div className="settings-change-password-modal-content">
        <div className="settings-change-password-modal-header">
          <h2 className="title-change-password">Изменение пароля</h2>
        </div>
        <div className="settings-change-password-modal-body">
          <input
            type="password"
            className="password-input"
            placeholder="Старый пароль"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            className="password-input"
            placeholder="Новый пароль"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            className="password-input"
            placeholder="Подтвердите новый пароль"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
          <div className="settings-change-password-modal-footer">
            <button
              className="settings-change-password-save-btn"
              onClick={handlePasswordChange}
            >
              Сохранить
            </button>
            <button
              className="settings-change-password-close-btn"
              onClick={handleCloseChangePasswordModal}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
  );
};

export default SettingsPage;
