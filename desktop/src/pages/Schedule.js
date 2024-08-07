import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import OrderList from '../components/OrderList'; // Импортируйте новый компонент
import api from '../services/tokenService';
import jwtDecode from 'jwt-decode';

const Schedule = () => {
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    
    const fetchOrders = async () => {
      const formattedDate = date.toISOString().split('T')[0];
      const userId = currentUser.user_id;
      try {
        const response = await api.get(`/orders/schedule/`, {
          params: { date: formattedDate, user_id: userId }
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Ошибка при получении заказов", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [date, currentUser]);

  return (
    <div className="schedule-container">
      <h1 className=''>Расписание на день</h1>
      <div className="schedule-content">
        <div className="order-list-container">
          <OrderList orders={orders} setOrders={setOrders} /> {/* Используйте OrderList */}
        </div>
        <div className="calendar-container">
          <h3 className='h3-schedule'>Календарь</h3>
          <Calendar value={date} onDateChange={setDate} />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
