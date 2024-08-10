// import React from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import AssignEmployee from '../components/AssignEmployee';
// import api from '../services/tokenService';
// import { useOrders } from '../components/OrderContext'; // Импортируем хук useOrders

// const OrderList = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Получаем orders и setOrders из контекста
//   const { orders, setOrders } = useOrders();

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`http://localhost:8000/orders/b2c-orders/${id}/`);
      
//       // Обновление состояния заказов после успешного удаления
//       setOrders(prevOrders => prevOrders.filter(order => order.id !== id));
//     } catch (error) {
//       console.error("Ошибка при удалении заказа", error);
//     }
//   };

//   const handleEmployeeAssigned = (updatedOrder) => {
//     setOrders(prevOrders =>
//       prevOrders.map(order =>
//         order.id === updatedOrder.id ? updatedOrder : order
//       )
//     );
//   };

//   const handleEditClick = (orderId) => {
//     navigate(`/edit-order/${orderId}`, { state: { from: location.pathname } });
//   };

//   if (!orders || orders.length === 0) {
//     return null;
//   }

//   return (
//     <div>
//       <div className="order-item-grid">
//           <div>Наименование</div>
//           <div>Цена</div>
//           <div>Дата</div>
//           <div>Время</div>
//           <div>Адрес</div>
//           <div>Имя клиента</div>
//           <div>Номер клиента</div>
//           <div>Статус</div>
//       </div>
//       {orders.map((order) => (
//         <div className='order-item' key={order.id}>
//           <div  className="order-item-grid">
//             <p>{order.order_name}</p>
//             <p>{order.price}</p>
//             <p>{order.order_date}</p>
//             <p>{order.order_time}</p>
//             <p>{order.address}</p>
//             <p>{order.name_client}</p>
//             <p>{order.phone_number_client}</p>
//             <p>{order.status === 'in processing' ? 'В обработке' : order.status}</p>
//           </div>
//             <p>Описание: {order.description}</p>
//           <div className='order-list-btns'> 
//           <button className='general-btns' onClick={() => handleEditClick(order.id)}>Редактировать</button>
//           <button className='general-btns delete-btn' onClick={() => handleDelete(order.id)}>Удалить</button>
//           <AssignEmployee orderId={order.id} onEmployeeAssigned={handleEmployeeAssigned} />
//           </div>
          
//         </div>
        
//       ))}
//     </div>
//   );
// };

// export default OrderList;




import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AssignEmployee from '../components/AssignEmployee';
import api from '../services/tokenService';
import { useOrders } from '../components/OrderContext';
import TruncatedText from '../components/TruncatedText'; // Импортируем TruncatedText

const OrderList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orders, setOrders } = useOrders();

  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:8000/orders/b2c-orders/${id}/`);
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
    <div className='order-list-container-dashboard'>
      <div className="order-item-grid order-item-grid-header">
          <div>Наименование</div>
          <div>Цена</div>
          <div>Дата</div>
          <div>Время</div>
          <div>Адрес</div>
          <div>Имя клиента</div>
          <div>Номер клиента</div>
          <div>Статус</div>
      </div>
      {orders.map((order) => (
        <div className='order-item' key={order.id}>
          <div  className="order-item-grid">
            <p>{order.order_name}</p>
            <p>{order.price}</p>
            <p>{order.order_date}</p>
            <p>{order.order_time}</p>
            <p>{order.address}</p>
            <p>{order.name_client}</p>
            <p>{order.phone_number_client}</p>
            <p>{order.status === 'in processing' ? 'В обработке' : order.status}</p>
          </div>
          <p>Описание: <TruncatedText text={order.description} limit={150} /></p>
          <div className='order-list-btns'> 
            <button className='general-btns' onClick={() => handleEditClick(order.id)}>Редактировать</button>
            <button className='general-btns delete-btn' onClick={() => handleDelete(order.id)}>Удалить</button>
            <AssignEmployee orderId={order.id} onEmployeeAssigned={handleEmployeeAssigned} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
