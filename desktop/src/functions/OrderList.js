// OrderList.js
import React from 'react';

const OrderList = ({ orders }) => {
  if (!orders || orders.length === 0) { // Проверяем, определен ли orders и не пуст ли он
    return <p>Заказы не найдены</p>;
  }

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className="order-item">
          <h4>{order.service_name}</h4>
          <p>{order.price}</p>
          <p>{order.name}</p>
          <p>{order.order_date}</p>
          <p>{order.order_time}</p>
          <p>{order.address}</p>
          <p>{order.name_client}</p>
          <p>{order.phone_number_client}</p>
          <p>{order.description}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
