import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AssignEmployee from '../components/AssignEmployee';
import api from '../services/tokenService';

const OrderList = ({ orders, setOrders }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:8000/orders/b2c-orders/${id}/`);
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Ошибка при удалении заказа", error);
    }
  };

  const handleEmployeeAssigned = (updatedOrder) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  const handleEditClick = (orderId) => {
    navigate(`/edit-order/${orderId}`, { state: { from: location.pathname } });
  };

  if (!orders || orders.length === 0) {
    return null;
  }

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className="order-item">
          <h4>{order.service_name}</h4>
          <p><b>Наименование: </b> {order.order_name}</p>
          <p><b>Цена: </b> {order.price}</p>
          <p><b>Дата: </b> {order.order_date}</p>
          <p><b>Время: </b> {order.order_time}</p>
          <p><b>Адрес: </b> {order.address}</p>
          <p><b>Имя клиента: </b> {order.name_client}</p>
          <p><b>Номер клиента: </b> {order.phone_number_client}</p>
          <p><b>Описание: </b> {order.description}</p>
          <p><b>Статус: </b> {order.status === 'in waiting' ? 'В ожидании' : order.status}</p>
          <p><b>Сотрудник: </b> {order.assigned_employee_name ? `${order.assigned_employee_name}` : 'Не назначен'}</p>
          <p><b>Телефон сотрудника: </b> {order.assigned_employee_phone}</p>
          <button className='general-btns' onClick={() => handleEditClick(order.id)}>Редактировать</button>
          <button className='general-btns delete-btn' onClick={() => handleDelete(order.id)}>Удалить</button>
          <AssignEmployee orderId={order.id} onEmployeeAssigned={handleEmployeeAssigned} />
        </div>
      ))}
    </div>
  );
};

export default OrderList;



