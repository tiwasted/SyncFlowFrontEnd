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
            {/* <h4>{order.service_name}</h4> */}
            <p> <b>Наименование: </b> {`${order.order_name}`}</p>
            <p> <b>Цена: </b> {`${order.price}`}</p>
            <p> <b>Дата: </b> {`Дата: ${order.order_date}`}</p>
            <p> <b>Время: </b> {`Время: ${order.order_time}`}</p>
            <p> <b>Адрес: </b> {`Адрес: ${order.address}`}</p>
            <p> <b>Имя клиента: </b> {`Имя клиента: ${order.name_client}`}</p>
            <p> <b>Номер клиента: </b> {`Номер клиента: ${order.phone_number_client}`}</p>
            <p> <b>Описание: </b> {`Описание: ${order.description}`}</p>
            <p><b>Статус: </b> {`Статус: ${order.status === 'in processing' ? 'В обработке' : order.status}`}</p>
          <Link to={`/edit-order/${order.id}`}>
            <button className='general-btns'>Редактировать</button>
          </Link>
          <button className='general-btns delete-btn' onClick={() => handleDelete(order.id)}>Удалить</button>
            <AssignEmployee orderId={order.id} onEmployeeAssigned={handleEmployeeAssigned} />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
