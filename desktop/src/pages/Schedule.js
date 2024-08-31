// import React, { useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";
// import api from "../services/TokenService";
// import OrderSchedule from "../components/OrderSchedule";
// import EmployeeSchedule from "../components/EmployeeSchedule";

// const Schedule = () => {
//   const [date, setDate] = useState(() => {
//     const now = new Date();
//     return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
//   });
//   const [orders, setOrders] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [scheduleMode, setScheduleMode] = useState("orders");

//   useEffect(() => {
//     const token = localStorage.getItem("access_token");
//     if (token) {
//       const decodedToken = jwtDecode(token);
//       setCurrentUser(decodedToken);
//     }
//   }, []);

//   useEffect(() => {
//     if (!currentUser) return;

//     const fetchOrders = async () => {
//       const formattedDate = date.toISOString().split("T")[0];
//       const userId = currentUser.user_id;
//       try {
//         const response = await api.get(`/orders/schedule/`, {
//           params: { date: formattedDate, user_id: userId },
//         });
//         setOrders(response.data);
//       } catch (error) {
//         console.error("Ошибка при получении заказов", error);
//         setOrders([]);
//       }
//     };

//     fetchOrders();
//   }, [date, currentUser]);

//   return (
//     <div className="schedule-container">
//       <h1 className="schedule-title">Расписание на день</h1>
//       <div className="schedule-buttons">
//         <button
//           className={`schedule-button ${
//             scheduleMode === "orders" ? "active" : ""
//           }`}
//           onClick={() => setScheduleMode("orders")}
//         >
//           Расписание по заказам
//         </button>
//         <button
//           className={`schedule-button ${
//             scheduleMode === "employees" ? "active" : ""
//           }`}
//           onClick={() => setScheduleMode("employees")}
//         >
//           Расписание по сотрудникам
//         </button>
//       </div>

//       {scheduleMode === "orders" ? (
//         <OrderSchedule date={date} setDate={setDate} orders={orders} setOrders={setOrders} />
//       ) : (
//         <EmployeeSchedule date={date} setDate={setDate} orders={orders} />
//       )}
//     </div>
//   );
// };

// export default Schedule;





import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import api from "../services/TokenService";
import OrderSchedule from "../components/OrderSchedule";
import EmployeeSchedule from "../components/EmployeeSchedule";

const Schedule = () => {
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [scheduleMode, setScheduleMode] = useState("orders");

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUser(decodedToken);
    }
  }, []);

  useEffect(() => {
    if (!currentUser || scheduleMode !== "orders") return;

    const fetchOrders = async () => {
      const formattedDate = date.toISOString().split("T")[0];
      const userId = currentUser.user_id;
      try {
        const response = await api.get(`/orders/schedule/`, {
          params: { date: formattedDate, user_id: userId },
        });
        setOrders(response.data);
      } catch (error) {
        console.error("Ошибка при получении заказов", error);
        setOrders([]);
      }
    };

    fetchOrders();
  }, [date, currentUser, scheduleMode]);

  return (
    <div className="schedule-container">
      <h1 className="schedule-title">Расписание на день</h1>
      <div className="schedule-buttons">
        <button
          className={`schedule-button ${
            scheduleMode === "orders" ? "active" : ""
          }`}
          onClick={() => setScheduleMode("orders")}
        >
          Расписание по заказам
        </button>
        <button
          className={`schedule-button ${
            scheduleMode === "employees" ? "active" : ""
          }`}
          onClick={() => setScheduleMode("employees")}
        >
          Расписание по сотрудникам
        </button>
      </div>

      {scheduleMode === "orders" ? (
        <OrderSchedule date={date} setDate={setDate} orders={orders} setOrders={setOrders} />
      ) : (
        <EmployeeSchedule date={date} setDate={setDate} />
      )}
    </div>
  );
};

export default Schedule;