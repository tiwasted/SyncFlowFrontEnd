import React from 'react';
import { Link } from 'react-router-dom';
import AssignEmployee from '../components/AssignEmployee';
import api from '../services/tokenService';

const OrderList = ({ orders, setOrders }) => {
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
  };
  
  if (!orders || orders.length === 0) {
    return null;
  }

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className="order-item">
            <h4>{order.service_name}</h4>
            <p> <b>Наименование: </b> {`${order.order_name}`}</p>
            <p>{`Цена: ${order.price}`}</p>
            <p>{`Дата: ${order.order_date}`}</p>
            <p>{`Время: ${order.order_time}`}</p>
            <p>{`Адрес: ${order.address}`}</p>
            <p>{`Имя клиента: ${order.name_client}`}</p>
            <p>{`Номер клиента: ${order.phone_number_client}`}</p>
            <p>{`Описание: ${order.description}`}</p>
            <p>{`Статус: ${order.status === 'in_processing' ? 'В обработке' : order.status}`}</p>
          <Link to={`/edit-order/${order.id}`}>
            <button className='general-btns'>Редактировать</button>
          </Link>
          <button className='delete-btns' onClick={() => handleDelete(order.id)}>Удалить</button>
            <AssignEmployee orderId={order.id} onEmployeeAssigned={handleEmployeeAssigned} />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
