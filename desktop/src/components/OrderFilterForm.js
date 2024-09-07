import React, { useState, useEffect } from "react";
import { fetchCities } from "../services/OrderService";
import "../styles/OrderFilterForm.css";

const OrderFilterForm = ({ onSubmit }) => {
  const [filters, setFilters] = useState({
    status: "",
    order_date: "",
    phone_number_client: "",
    phone_number_employee: "",
    city: { id: "" },
  });
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const loadCities = async () => {
      try {
        const fetchedCities = await fetchCities();
        setCities(fetchedCities || []);
      } catch (error) {
        console.error("Ошибка загрузки городов:", error);
      }
    };
    loadCities();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city") {
      setFilters((prev) => ({ ...prev, city: { id: value } }));
    } else {
      setFilters((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(filters);
  };

  return (
    <form className="order-filter-form" onSubmit={handleSubmit}>
      <div className="order-filter-form__group">
        <label htmlFor="status" className="order-filter-form__label">
          Статус:
        </label>
        <select
          id="status"
          name="status"
          value={filters.status}
          onChange={handleChange}
          className="order-filter-form__input"
        >
          <option value="">Все</option>
          <option value="completed">Выполнено</option>
          <option value="cancelled">Отменено</option>
        </select>
      </div>

      <div className="order-filter-form__group">
        <label htmlFor="order_date" className="order-filter-form__label">
          Дата заказа:
        </label>
        <input
          type="date"
          id="order_date"
          name="order_date"
          value={filters.order_date}
          onChange={handleChange}
          className="order-filter-form__input"
        />
      </div>

      <div className="order-filter-form__group">
        <label
          htmlFor="phone_number_client"
          className="order-filter-form__label"
        >
          Телефон клиента:
        </label>
        <input
          type="text"
          id="phone_number_client"
          name="phone_number_client"
          value={filters.phone_number_client}
          onChange={handleChange}
          className="order-filter-form__input"
        />
      </div>

      <div className="order-filter-form__group">
        <label
          htmlFor="phone_number_employee"
          className="order-filter-form__label"
        >
          Телефон сотрудника:
        </label>
        <input
          type="text"
          id="phone_number_employee"
          name="phone_number_employee"
          value={filters.phone_number_employee}
          onChange={handleChange}
          className="order-filter-form__input"
        />
      </div>

      <div className="order-filter-form__group">
        <label htmlFor="city" className="order-filter-form__label">
          Город:
        </label>
        <select
          id="city"
          name="city"
          value={filters.city.id}
          onChange={handleChange}
          className="order-filter-form__input"
        >
          <option value="">Все</option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>

      <div className="order-filter-form__group">
        <button type="submit" className="order-filter-form__btn">
          Поиск
        </button>
      </div>
    </form>
  );
};

export default OrderFilterForm;
