import React from "react";
import "../styles/AddLocationModal.css";

const AddLocationModal = ({
  countries,
  selectedCountry,
  cities,
  selectedCities,
  handleCountryChange,
  handleCityChange,
  handleAddCountryAndCities,
  handleCloseAddLocationModal,
}) => {
  return (
    <div className="settings-choose-cities-modal-overlay">
      <div className="settings-choose-cities-modal-content">
        <div className="settings-choose-cities-modal-header">
          <h2 className="title-choose-cities">Добавление городов</h2>
        </div>
        <div className="settings-choose-cities-modal-body">
          <div className="settings-choose-cities-modal-columns">
            <div className="settings-choose-cities-modal-column">
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
            <div className="settings-choose-cities-modal-column">
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
          </div>
        </div>
        <div className="settings-choose-cities-modal-footer">
          <button
            className="settings-choose-cities-modal-save-btn"
            onClick={handleAddCountryAndCities}
          >
            Сохранить
          </button>
          <button
            className="settings-choose-cities-modal-close-btn"
            onClick={handleCloseAddLocationModal}
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLocationModal;
