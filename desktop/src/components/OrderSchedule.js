import React, { useState, useEffect, useCallback } from "react";
import OrderListForSchedule from "../components/OrderListForSchedule";
import Calendar from "../components/Calendar";
import api from "../services/TokenService";

const OrderSchedule = ({ currentUser }) => {
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  const [orders, setOrders] = useState([]);

  const fetchOrders = useCallback(async (selectedDate) => {
    if (!currentUser) return;

    const formattedDate = selectedDate.toISOString().split('T')[0];
    const userId = currentUser.user_id;
    console.log("Fetching orders with params:", { date: formattedDate, user_id: userId });

    try {
      const response = await api.get("/schedules/schedule/", {
        params: { date: formattedDate, user_id: userId }
      });
      setOrders(response.data);
    } catch (error) {
      console.error("Ошибка при получении заказов:", error);
    }
  }, [currentUser]);

  useEffect(() => {
    fetchOrders(date);
  }, [date, fetchOrders]);

  const handleDateChange = (newDate) => {
    setDate(newDate);
    fetchOrders(newDate);
  };

  return (
    <div className="orders-schedule-content">
      <div className="orders-list-schedule-board">
        <OrderListForSchedule orders={orders} setOrders={setOrders} />
      </div>
      <div className="schedule-orders-calendar-container">
        <h3 className="h3-order-schedule">Календарь</h3>
        <Calendar value={date} onDateChange={handleDateChange} />
      </div>
    </div>
  );
};

export default OrderSchedule;