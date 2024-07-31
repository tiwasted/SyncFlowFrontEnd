import React from 'react';
import { Link } from 'react-router-dom';
import AssignEmployee from '../components/AssignEmployee';
import '../styles/OrderList.css';

const OrderList = ({ orders }) => {
  // console.log('orders:', orders);
  
  if (!orders || orders.length === 0) {
    return null;
  //   return <p>Заказы не найдены</p>;
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
            <p>{`Статус: ${order.status === 'in processing' ? 'В обработке' : order.status}`}</p>
          <Link to={`/edit-order/${order.id}`}>
            <button className='general-btns'>Редактировать</button>
            <button className='delete-btns'>Удалить</button>
          </Link>
            <AssignEmployee orderId={order.id} />
        </div>
      ))}
    </div>
  );
};

export default OrderList;
