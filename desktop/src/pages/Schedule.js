import React, { useState, useEffect } from 'react';
import Calendar from '../functions/Calendar';
import api from '../services/tokenService';
import jwtDecode from 'jwt-decode';
// import '../styles/Schedule.css';

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
      console.log('Decoded token:', decodedToken);
      setCurrentUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    
    console.log("Дата у клиента:", date)
    const fetchOrders = async () => {
      const formattedDate = date.toISOString().split('T')[0]; // Форматируем дату в YYYY-MM-DD
      const userId = currentUser.user_id;
      console.log('Отправляемая дата:', formattedDate);
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
      <h2 className='h2-schedule'>Расписание на день</h2>
      <div className="schedule-content">
        <div className="order-list-container">
          <h3 className='h3-schedule'></h3>
          <ul>
            {orders.length > 0 ? (
              orders.map(order => (
                <li key={order.id}>
                  <h4>{order.order_name}</h4>
                  <p>{`Дата: ${order.order_date}`}</p>
                  <p>{`Время: ${order.order_time}`}</p>
                  <p>{`Цена: ${order.price}`}</p>
                  <p>{`Адрес: ${order.address}`}</p>
                  <p>{`Имя клиента: ${order.name_client}`}</p>
                  <p>{`Номер клиента: ${order.phone_number_client}`}</p>
                  <p>{`Описание: ${order.description}`}</p>
                  <p>{`Статус: ${order.status === 'in waiting' ? 'В ожидании' : order.status}`}</p>
                  <p>{`Сотрудник: ${order.assigned_employee ? `${order.assigned_employee.first_name} ${order.assigned_employee.last_name}` : 'Не назначен'}`}</p>
                </li>
              ))
            ) : (
              <p>Заказы не найдены</p>
            )}
          </ul>
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
