// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import OrderList from '../functions/OrderList';
import { useOrders } from '../functions/OrderContext';

const Dashboard = () => {

  const { orders } = useOrders();

  return (
    <React.Fragment>
      <div className="orders">
        <h3>Список заказов</h3>
        {orders && <OrderList orders={orders} />}
        <OrderList />
        {/* Здесь можно отобразить список заказов */}
      </div>
      <Link to="/add-order">
          <button className='general-btns'>Добавить заказ</button>
      </Link>
    </React.Fragment>
  );
};

export default Dashboard;
