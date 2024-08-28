import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import { Link } from "react-router-dom";
import OrderList from "../components/OrderList";
import { useOrders } from "../context/OrderProvider"; 
import Calendar from "../components/Calendar";

const Dashboard = () => {
  const { orders, setOrders } = useOrders(); // Предполагается, что есть функция setOrders для обновления заказов
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  // Получаем список стран с городами при монтировании компонента
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await api.get("/employers/dashboard/list-cities/");
        setCities(response.data.cities); // Извлекаем массив городов из ответа
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchCities();
  }, []);

  const handleCityChange = async (cityId) => {
    setSelectedCity(cityId);
    console.log('Selected city ID:', cityId);  // Для отладки
    try {
      const response = await api.post("/employers/select-primary-city/", { city_id: cityId });
      console.log('Response:', response.data); // Для отладки
      // Обновляем заказы после успешного запроса
      const updatedOrders = await api.get("/orders/b2c-orders/", {
        params: { city_id: cityId } // Добавляем параметр города в запрос
      });
      setOrders(updatedOrders.data);
    } catch (error) {
      console.error("Ошибка при выборе города:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <React.Fragment>
      <div>
        {/* Чекбоксы для выбора города */}
        <div className="city-selection-container">
          {Array.isArray(cities) && cities.map((city) => (
            <label key={city.id}>
              <input
                type="checkbox"
                checked={selectedCity === city.id}
                onChange={() => handleCityChange(city.id)}
              />
              {city.name}
            </label>
          ))}
        </div>

        <div className="create-order-btn-container">
          <Link to="/add-order">
            <button className="create-order-btn">Создать заказ</button>
          </Link>
        </div>

        <div className="orders">
          <div className="">
            <h2 className="h2-title-dashboard">Заказы</h2>
            <div className="dashboard-order-list-container">
              {orders && <OrderList />}
            </div>
          </div>

          <div className="">
            <h2 className="h2-title-dashboard">Заказы без даты</h2>
            <div className="dashboard-order-list-container">
              {orders && <OrderList />}
            </div>
          </div>

          <div className="">
            <h2 className="h2-title-dashboard">Календарный день</h2>
            <div className="dashboard-order-list-container">
              {orders && <OrderList />}
            </div>
          </div>

          <div className="calendar-container">
            <h2 className="h2-title-dashboard">Календарь</h2>
            <Calendar value={date} onDateChange={setDate} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;