import React, { useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";
// import OrderSchedule from "../components/OrderSchedule";
import EmployeeSchedule from "../components/EmployeeSchedule";
import api from "../services/TokenService"; // Импортируем api для запросов
import Notification from "../components/Notification"; // Импортируем компонент Notification

const Schedule = () => {
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  // const [orders, setOrders] = useState([]);
  // const [currentUser, setCurrentUser] = useState(null);
  const [scheduleMode, setScheduleMode] = useState("orders");
  const [cityName, setCityName] = useState(""); // Добавляем состояние для названия города
  const [notification, setNotification] = useState({ message: "", type: "" }); // Добавляем состояние для уведомления

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // const decodedToken = jwtDecode(token);
      // setCurrentUser(decodedToken);
    }

    // Получаем название города
    const fetchCityName = async () => {
      try {
        const response = await api.get("/employers/get-primary-city/");
        setCityName(response.data.city_name); // Устанавливаем название города
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setNotification({ message: "Зайдите в Dashboard и выберите город", type: "yellow" });
        } else {
          // console.error("Ошибка при получении названия города:", error);
        }
      }
    };

    fetchCityName();
  }, []);

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">Расписание города {cityName}</h1> {/* Отображаем название города */}
      <div className="schedule-buttons">
        {/* <button
          className={`schedule-button ${
            scheduleMode === "orders" ? "active" : ""
          }`}
          onClick={() => setScheduleMode("orders")}
        >
          Расписание по заказам
        </button> */}
        <button
          className={`schedule-button ${
            scheduleMode === "employees" ? "active" : ""
          }`}
          onClick={() => setScheduleMode("employees")}
        >
          Расписание по сотрудникам
        </button>
      </div>

      {/* {scheduleMode === "orders" ? (
        <OrderSchedule
          date={date}
          setDate={setDate}
          orders={orders}
          setOrders={setOrders}
          currentUser={currentUser}
        />
      ) : ( */}
        <EmployeeSchedule date={date} setDate={setDate} />
      {/* )} */}
      
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

export default Schedule;