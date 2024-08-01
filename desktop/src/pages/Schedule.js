import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
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
      {/* <h2 className='h2-schedule'>Расписание на день</h2> */}
      <h1 className=''>Расписание на день</h1>
      <div className="schedule-content">
        <div className="order-list-container">
          {/* <h3 className='h3-schedule'></h3> */}
          <ul>
            {orders.length > 0 ? (
              orders.map(order => (
                <li key={order.id}>
                  <h4>{order.order_name}</h4>
                  <p> <b>Дата: </b> {`${order.order_date}`}</p>
                  <p> <b>Время: </b> {`${order.order_time}`}</p>
                  <p> <b>Цена: </b> {`${order.price}`}</p>
                  <p> <b>Адрес: </b> {`${order.address}`}</p>
                  <p> <b>Имя клиента: </b> {`${order.name_client}`}</p>
                  <p> <b>Номер клиента: </b> {`${order.phone_number_client}`}</p>
                  <p> <b>Описание: </b> {`${order.description}`}</p>
                  <p> <b>Статус: </b> {`${order.status === 'in waiting' ? 'В ожидании' : order.status}`}</p>
                  <p> <b>Сотрудник: </b> {`${order.assigned_employee ? `${order.assigned_employee.first_name} ${order.assigned_employee.last_name}` : 'Не назначен'}`}</p>
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
