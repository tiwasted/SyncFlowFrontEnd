import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import OrderList from "../components/OrderList";
import { useOrders } from "../context/OrderProvider"; // Импортируем хук useOrders
import Calendar from "../components/Calendar";
import api from "../services/TokenService";
import jwtDecode from "jwt-decode";

const Dashboard = () => {
  const { orders } = useOrders(); // Получаем заказы из контекста
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const fetchOrders = async () => {
      const formattedDate = date.toISOString().split("T")[0];
      const userId = currentUser.user_id;
      try {
        const response = await api.get(`/orders/schedule/`, {
          params: { date: formattedDate, user_id: userId },
        });
        setFilteredOrders(response.data);
      } catch (error) {
        console.error("Ошибка при получении заказов", error);
        setFilteredOrders([]);
      }
    };

    fetchOrders();
  }, [date, currentUser]);

  return (
    <React.Fragment>
      <div>
        <div className="create-order-btn-container">
          <Link to="/add-order">
            <button className="create-order-btn">Создать заказ</button>
          </Link>

        </div>
        <div className="orders">
          <div className="dashboard-order-list-container">
            <h2 className="h2-title-dashboard">Завтра</h2>
            <div className="">
              {orders && <OrderList />}
            </div>
          </div>
          
          <div className="dashboard-order-list-container">
            <h2 className="h2-title-dashboard">Заказы без даты</h2>
            <div className="">
              {orders && <OrderList />}
            </div>
          </div>
          
          <div className="dashboard-order-list-container">
          <h2 className="h2-title-dashboard">Календарный день</h2>
            <div className="dashboard-order-list-container-from-calendar">
              {filteredOrders.length > 0 ? (
                <OrderList orders={filteredOrders} />
              ) : (
                <p>Заказы отсутствуют на выбранную дату.</p>
              )}
            </div>
          </div>

          <div className="dashboard-order-list-container">
            <h2 className="h2-title-dashboard">Календарь</h2>
            <Calendar value={date} onDateChange={setDate} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
