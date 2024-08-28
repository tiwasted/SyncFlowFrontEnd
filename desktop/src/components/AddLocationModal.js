import React, { useState } from "react";

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
  const [countrySearch, setCountrySearch] = useState("");
  const [citySearch, setCitySearch] = useState("");

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(citySearch.toLowerCase())
  );

  return (
    <div className="settings-modal-overlay">
      <div className="settings-modal-content settings-choose-cities-modal-content">
        <div className="settings-modal-header">
          <h2 className="title-choose-cities">Добавление городов</h2>
        </div>
        <div className="settings-modal-body">
          <div className="settings-modal-columns">
            <div className="settings-modal-column">
              <label>Выберите страну:</label>
              <input
                type="text"
                placeholder="Поиск страны"
                value={countrySearch}
                onChange={(e) => setCountrySearch(e.target.value)}
                className="country-search-input"
              />
              <div className="country-select">
                {filteredCountries.map((country) => (
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
            <div className="settings-modal-column">
              {selectedCountry && (
                <>
                  <label className="label-choose-cities">Выберите города:</label>
                  <input
                    type="text"
                    placeholder="Поиск города"
                    value={citySearch}
                    onChange={(e) => setCitySearch(e.target.value)}
                    className="city-search-input"
                  />
                  <div className="city-select">
                    {filteredCities.map((city) => (
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
                </>
              )}
            </div>
            <div className="settings-modal-column">
              <div className="settings-modal-footer">
                <button
                  className="settings-modal-save-btn"
                  onClick={handleAddCountryAndCities}
                >
                  Сохранить
                </button>
                <button
                  className="settings-modal-close-btn"
                  onClick={handleCloseAddLocationModal}
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocationModal;
