// import React, { useState, useEffect } from "react";
// import Calendar from "../components/Calendar";
// import OrderListForSchedule from "../components/OrderListForSchedule"; // Импортируйте новый компонент
// import api from "../services/TokenService";
// import jwtDecode from "jwt-decode";

// const Schedule = () => {
//   const [date, setDate] = useState(() => {
//     const now = new Date();
//     return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
//   });
//   const [orders, setOrders] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setCurrentUser(decodedToken);
//     }
//   }, []);

  // useEffect(() => {
  //   if (!currentUser) return;

  //   const fetchOrders = async () => {
  //     const formattedDate = date.toISOString().split("T")[0];
  //     const userId = currentUser.user_id;
  //     try {
  //       const response = await api.get(`/orders/schedule/`, {
  //         params: { date: formattedDate, user_id: userId },
  //       });
  //       setOrders(response.data);
  //     } catch (error) {
  //       console.error("Ошибка при получении заказов", error);
  //       setOrders([]);
  //     }
  //   };

//     fetchOrders();
//   }, [date, currentUser]);

//   return (
//     <div className="schedule-container">
//       <h1 className="schedule-title">Расписание на день</h1>
//       <div className="schedule-content">
//         <div className="employee-list-container">
//           <OrderListForSchedule orders={orders} setOrders={setOrders} />
//         </div>
//         <div className="orders-of-employee">
//           Заказы сотрудника
//         </div>
//         <div className="schedule-calendar-container">
//           <h3 className="h3-schedule">Календарь</h3>
//           <Calendar value={date} onDateChange={setDate} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Schedule;




import React, { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import api from "../services/TokenService";
// import jwtDecode from "jwt-decode";

// Компонент для отображения расписания сотрудников
const EmployeeSchedule = ({ date, onSelectEmployee }) => {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const formattedDate = date.toISOString().split("T")[0];
      try {
        const response = await api.get(`/schedule/employees/`, {
          params: { date: formattedDate },
        });
        setSchedule(response.data);
      } catch (error) {
        console.error("Ошибка при получении расписания", error);
        setSchedule([]);
      }
    };

    fetchSchedule();
  }, [date]);

  return (
    <div className="employee-schedule">
      {schedule.map((entry) => (
        <div key={entry.time} className="schedule-entry">
          <span className="time-label">{entry.time}</span>
          <span className="employee-list">
            {entry.employees.map((employee) => (
              <span
                key={employee.id}
                className="employee-name"
                onClick={() => onSelectEmployee(employee)}
              >
                {employee.name}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
};

// Компонент для отображения заказов выбранного сотрудника
const EmployeeOrders = ({ employee, date, onOrderEdit }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!employee) return;

    const fetchOrders = async () => {
      const formattedDate = date.toISOString().split("T")[0];
      try {
        const response = await api.get(`/orders/employee/${employee.id}/`, {
          params: { date: formattedDate },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Ошибка при получении заказов сотрудника", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [employee, date]);

  const handleOrderDelete = async (orderId) => {
    try {
      await api.delete(`/orders/${orderId}/delete/`);
      setOrders(orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error("Ошибка при удалении заказа", error);
    }
  };

  return (
    <div className="employee-orders">
      <h3>Заказы сотрудника {employee?.name}</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.id} className="order-item">
            <span onClick={() => onOrderEdit(order)}>{order.order_name}</span>
            <button onClick={() => handleOrderDelete(order.id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Основной компонент
const Schedule = () => {
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  // const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("access_token");
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     setCurrentUser(decodedToken);
  //   }
  // }, []);

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
  };

  const handleOrderEdit = (order) => {
    // Логика для открытия модального окна и редактирования заказа
    // Реализация модального окна должна быть добавлена здесь
  };

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">Расписание на день</h1>
      <div className="schedule-content">
        <div className="employee-schedule-container">
          <EmployeeSchedule date={date} onSelectEmployee={handleEmployeeSelect} />
        </div>
        <div className="employee-orders-container">
          {selectedEmployee && (
            <EmployeeOrders
              employee={selectedEmployee}
              date={date}
              onOrderEdit={handleOrderEdit}
            />
          )}
        </div>
        <div className="schedule-calendar-container">
          <h3 className="h3-schedule">Календарь</h3>
          <Calendar value={date} onDateChange={setDate} />
        </div>
      </div>
    </div>
  );
};

export default Schedule;
