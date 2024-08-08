import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AssignEmployee from '../components/AssignEmployee';
import api from '../services/tokenService';
import { useOrders } from '../components/OrderContext'; // Импортируем хук useOrders

const OrderList = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем orders и setOrders из контекста
  const { orders, setOrders } = useOrders();

  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:8000/orders/b2c-orders/${id}/`);
      
      // Обновление состояния заказов после успешного удаления
      setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
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
          <p><b>Статус: </b> {order.status === 'in processing' ? 'В обработке' : order.status}</p>
          <button className='general-btns' onClick={() => handleEditClick(order.id)}>Редактировать</button>
          <button className='general-btns delete-btn' onClick={() => handleDelete(order.id)}>Удалить</button>
          <AssignEmployee orderId={order.id} onEmployeeAssigned={handleEmployeeAssigned} />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
