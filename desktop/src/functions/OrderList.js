// // OrdersList.js
// import React from 'react';

// const OrdersList = () => {
//   const orders = [];

//   return (
//     <React.Fragment>
//       <ul>
//         {orders.map((order, index) => (
//           <li key={index}>{order}</li>
//         ))}
//       </ul>
//     </React.Fragment>
//   );
// };

// export default OrdersList;




// OrderList.js
import React from 'react';
import { useOrders } from '../functions/OrderContext';

const OrderList = () => {
  const { orders } = useOrders();

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id}>
          <h4>{order.service_name}</h4>
          <p>{order.price}</p>
          <p>{order.date}</p>
          <p>{order.time}</p>
          <p>{order.address}</p>
          <p>{order.name_of_client}</p>
          <p>{order.phone_number}</p>
          <p>{order.description}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderList;
