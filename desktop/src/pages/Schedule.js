import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import AssignEmployee from '../components/AssignEmployee';
import api from '../services/tokenService';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';

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
      // console.log('Decoded token:', decodedToken);
      setCurrentUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;
    
    // console.log("Дата у клиента:", date)
    const fetchOrders = async () => {
      const formattedDate = date.toISOString().split('T')[0]; // Форматируем дату в YYYY-MM-DD
      const userId = currentUser.user_id;
      // console.log('Отправляемая дата:', formattedDate);
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

  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:8000/orders/b2c-orders/${id}/`);
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении заказа", error);
    }
  };

  const handleEmployeeAssigned = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  }

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
                  <p> <b>Сотрудник: </b> {order.assigned_employee_name ? `${order.assigned_employee_name}` : 'Не назначен'}</p>
                  <p> <b>Телефон сотрудника: </b> {order.assigned_employee_phone}</p>
                  <Link to={`/edit-order/${order.id}`}>
                    <button className='general-btns'>Редактировать</button>
                  </Link>
                  <button className='general-btns delete-btn' onClick={() => handleDelete(order.id)}>Удалить</button>
                    <AssignEmployee orderId={order.id} onEmployeeAssigned={handleEmployeeAssigned} />
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
