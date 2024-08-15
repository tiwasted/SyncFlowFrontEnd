import React from "react";
import { Link } from "react-router-dom";
import OrderList from "../components/OrderList";
import { useOrders } from "../components/OrderProvider"; // Импортируем хук useOrders

const Dashboard = () => {
  const { orders } = useOrders(); // Получаем заказы из контекста

  return (
    <React.Fragment>
      <div className="orders">
        <div>
          <Link to="/add-order">
            <button className="create-order-btn">Создать заказ</button>
          </Link>
          <h1 className="list-of-orders-title-dashboard">Список заказов</h1>
        </div>
        <div className="order-content">
          {orders && <OrderList />}{" "}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
