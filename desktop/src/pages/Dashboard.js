// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import OrderList from '../components/OrderList';
import { useOrders } from '../components/OrderContext';
import '../styles/Dashboard.module.css'

const Dashboard = () => {

  const { orders } = useOrders();

  return (
    <React.Fragment>
      <div className="orders">
        <div className='order-header'>
          <h1>Список заказов</h1>
          <Link to="/add-order">
            <button className='general-btns'>Создать заказ</button>
          </Link>
        </div>
        <div className='order-content'>
            {orders && <OrderList orders={orders} />}
            <OrderList />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
