import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import OrderList from "../components/OrderList";
import Calendar from "../components/Calendar";
import ModalForCreateOrderDashboard from "../components/ModalForCreateOrderDashboard";

const Dashboard = () => {
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [showCreateOrderModal, setShowCreateOrderModal] = useState(false);

  // Отдельные состояния для заказов каждой колонки
  const [tomorrowOrders, setTomorrowOrders] = useState([]);
  const [ordersWithoutDates, setOrdersWithoutDates] = useState([]);
  const [calendarOrders, setCalendarOrders] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get("/employers/dashboard/list-cities/");
        setCities(response.data.cities);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };

    const fetchSelectedCity = async () => {
      try {
        const response = await api.get("/employers/get-primary-city/");
        setSelectedCity(response.data.city_id); // Устанавливаем выбранный город
      } catch (error) {
        console.error("Ошибка при получении выбранного города:", error);
      }
    };

    fetchCities();
    fetchSelectedCity();
  }, []);

  useEffect(() => {
    const fetchInitialOrders = async () => {
      try {
        const [tomorrowResponse, noDateResponse] = await Promise.all([
          api.get("/orders/b2c-orders/tomorrow_orders/"),
          api.get("/orders/b2c-orders/orders_without_dates/")
        ]);
        setTomorrowOrders(tomorrowResponse.data);
        setOrdersWithoutDates(noDateResponse.data);
      } catch (error) {
        console.error("Ошибка при получении заказов:", error);
      }
    };

    if (selectedCity) {
      fetchInitialOrders();
    }
  }, [selectedCity]);

  const handleCityChange = async (cityId) => {
    try {
      const response = await api.post("/employers/select-primary-city/", { city_id: cityId });
      console.log('Response:', response.data);
      setSelectedCity(cityId);
      // После успешного выбора города, выполняем запросы на отображение заказов
      const [tomorrowResponse, noDateResponse] = await Promise.all([
        api.get("/orders/b2c-orders/tomorrow_orders/"),
        api.get("/orders/b2c-orders/orders_without_dates/")
      ]);
      setTomorrowOrders(tomorrowResponse.data);
      setOrdersWithoutDates(noDateResponse.data);
    } catch (error) {
      console.error("Ошибка при выборе города:", error.response ? error.response.data : error.message);
    }
  };

  const handleOpenCreateOrderModal = () => {
    setShowCreateOrderModal(true);
  };

  const handleCloseCreateOrderModal = () => {
    setShowCreateOrderModal(false);
  };

  const handleDateChange = async (newDate) => {
    setDate(newDate);
    if (selectedCity) {
      try {
        const calendarResponse = await api.get("/orders/b2c-orders/orders_by_dates/", { params: { date: newDate ? newDate.toISOString().split('T')[0] : undefined } });
        setCalendarOrders(calendarResponse.data);
      } catch (error) {
        console.error("Ошибка при обновлении заказов из календаря:", error);
      }
    }
  };

  return (
    <React.Fragment>
      <div>
        <div className="city-selection-container">
          {Array.isArray(cities) && cities.map((city) => (
            <label 
              key={city.id} 
              className={`city-label ${selectedCity === city.id ? 'selected' : ''}`}
              >
              <input
                type="radio"
                name="city"
                className="city-radio"
                checked={selectedCity === city.id} // Галочка устанавливается, если город выбран
                onChange={() => handleCityChange(city.id)}
              />
              {city.name}
            </label>
          ))}
        </div>

        <div className="create-order-btn-container">
          <button className="create-order-btn" onClick={handleOpenCreateOrderModal}>
            Создать заказ
          </button>
        </div>

        <ModalForCreateOrderDashboard
          show={showCreateOrderModal}
          onClose={handleCloseCreateOrderModal}
        />

        <div className="orders">
          <div className="dashboard-order-list-container">
            <h2 className="h2-title-dashboard">Завтра</h2>
            <div className="dashboard-order-list">
              <OrderList orders={tomorrowOrders} />
            </div>
          </div>

          <div className="dashboard-order-list-container">
            <h2 className="h2-title-dashboard">Заказы без даты</h2>
            <div className="dashboard-order-list">
              <OrderList orders={ordersWithoutDates} />
            </div>
          </div>

          <div className="dashboard-order-list-container">
            <h2 className="h2-title-dashboard">Заказы из календаря</h2>
            <div className="dashboard-order-list">
              {date && <OrderList orders={calendarOrders} date={date} />}
            </div>
          </div>

          <div className="calendar-container">
            <h2 className="h2-title-dashboard">Календарь</h2>
            <Calendar value={date} onDateChange={handleDateChange} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;