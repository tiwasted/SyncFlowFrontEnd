import React, { useState, useEffect, useCallback } from "react";
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

  const [tomorrowOrders, setTomorrowOrders] = useState([]);
  const [ordersWithoutDates, setOrdersWithoutDates] = useState([]);
  const [calendarOrders, setCalendarOrders] = useState([]);

  const fetchOrders = useCallback(async () => {
    if (selectedCity) {
      try {
        const [tomorrowResponse, noDateResponse, calendarResponse] = await Promise.all([
          api.get("/orders/b2c-orders/tomorrow_orders/"),
          api.get("/orders/b2c-orders/orders_without_dates/"),
          api.get("/orders/b2c-orders/orders_by_dates/", { params: { date: date ? date.toISOString().split('T')[0] : undefined } })
        ]);
        setTomorrowOrders(tomorrowResponse.data);
        setOrdersWithoutDates(noDateResponse.data);
        setCalendarOrders(calendarResponse.data);
      } catch (error) {
        // console.error("Ошибка при обновлении заказов:", error);
      }
    }
  }, [selectedCity, date]);

  const handleDateChange = async (newDate) => {
    setDate(newDate);
    fetchOrders();
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get("/employers/dashboard/list-cities/");
        setCities(response.data.cities);
      } catch (error) {
        // console.error("Ошибка при получении данных:", error);
      }
    };

    const fetchSelectedCity = async () => {
      try {
        const response = await api.get("/employers/get-primary-city/");
        setSelectedCity(response.data.city_id); // Устанавливаем выбранный город
      } catch (error) {
        // console.error("Ошибка при получении выбранного города:", error);
      }
    };

    fetchCities();
    fetchSelectedCity();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [selectedCity, fetchOrders]);

  const handleCityChange = async (cityId) => {
    try {
      const response = await api.post("/employers/select-primary-city/", { city_id: cityId });
      console.log('Response:', response.data);
      setSelectedCity(cityId);
      fetchOrders();
    } catch (error) {
      // console.error("Ошибка при выборе города:", error.response ? error.response.data : error.message);
    }
  };

  const handleOpenCreateOrderModal = () => {
    setShowCreateOrderModal(true);
  };

  const handleCloseCreateOrderModal = () => {
    setShowCreateOrderModal(false);
  };

  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
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
                checked={selectedCity === city.id}
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
          fetchOrders={fetchOrders}
        />

        <div className="orders">
          <div className="dashboard-order-list-container">
            <h2 className="h2-title-dashboard">Завтра</h2>
            <div className="dashboard-order-list">
              <OrderList orders={tomorrowOrders} updateOrders={fetchOrders} />
            </div>
          </div>

          <div className="dashboard-order-list-container">
            <h2 className="h2-title-dashboard">Заказы без даты</h2>
            <div className="dashboard-order-list">
              <OrderList orders={ordersWithoutDates} updateOrders={fetchOrders}/>
            </div>
          </div>

          <div className="dashboard-order-list-container">
            <h2 className="h2-title-dashboard">
              Заказы на {date ? formatDate(date) : 'Выберите дату'}
            </h2>
            <div className="dashboard-order-list">
              {date && <OrderList orders={calendarOrders} date={date} updateOrders={fetchOrders}/>}
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