import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from '../functions/Calendar';
// import '../styles/Schedule.css';

const Schedule = () => {
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log("Дата у клиента:", date)
    const fetchOrders = async () => {
      const formattedDate = date.toISOString().split('T')[0]; // Форматируем дату в YYYY-MM-DD
      console.log('Отправляемая дата:', formattedDate);
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get(`http://localhost:8000/orders/schedule/`, {
          headers: { 'Authorization': `Bearer ${token}` },
          params: { date: formattedDate }
        });
        setOrders(response.data);
        // const [b2cResponse, b2bResponse] = await Promise.all([
          // axios.get(`http://localhost:8000/orders/b2c-orders/`, {
            // headers: { 'Authorization': `Bearer ${token}` },
            // params: { date: formattedDate }
          // }),
          // axios.get(`http://localhost:8000/orders/b2b-orders/`, {
            // headers: { 'Authorization': `Bearer ${token}` },
            // params: { date: formattedDate }
          // })
        // ]);
        // setOrders([...b2cResponse.data, ...b2bResponse.data]); // Объединяем оба списка
      } catch (error) {
        console.error("Ошибка при получении заказов", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [date]);

  return (
    <div className="schedule-container">
      <h2 className='h2-schedule'>Расписание</h2>
      <div className="schedule-content">
        <div className="order-list-container">
          <h3 className='h3-schedule'>Расписание на день</h3>
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
