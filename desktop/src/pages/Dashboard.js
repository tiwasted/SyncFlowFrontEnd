// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import OrderList from "../components/OrderList";
// import { useOrders } from "../context/OrderProvider"; // Импортируем хук useOrders
// import Calendar from "../components/Calendar";
// import api from "../services/TokenService";
// import jwtDecode from "jwt-decode";

// const Dashboard = () => {
//   const { orders } = useOrders(); // Получаем заказы из контекста
//   const [date, setDate] = useState(() => {
//     const now = new Date();
//     return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
//   });
//   const [filteredOrders, setFilteredOrders] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

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
//         setFilteredOrders(response.data);
//       } catch (error) {
//         console.error("Ошибка при получении заказов", error);
//         setFilteredOrders([]);
//       }
//     };

//     fetchOrders();
//   }, [date, currentUser]);

//   return (
//     <React.Fragment>
//       <div>
//         <div className="create-order-btn-container">
//           <Link to="/add-order">
//             <button className="create-order-btn">Создать заказ</button>
//           </Link>
//         </div>
//         <div className="orders">
//           <div className="">
//             <h2 className="h2-title-dashboard">Завтра</h2>
//             <div className="dashboard-order-list-container">
//               {orders && <OrderList />}
//             </div>
//           </div>

//           <div className="">
//             <h2 className="h2-title-dashboard">Заказы без даты</h2>
//             <div className="dashboard-order-list-container">
//               {orders && <OrderList />}
//             </div>
//           </div>

//           <div className="">
//             <h2 className="h2-title-dashboard">Календарный день</h2>
//             <div className="dashboard-order-list-container">
//               {filteredOrders.length > 0 ? (
//                 <OrderList orders={filteredOrders} />
//               ) : (
//                 <p>Заказы отсутствуют на выбранную дату.</p>
//               )}
//             </div>
//           </div>

//           <div className="calendar-container">
//             <h2 className="h2-title-dashboard">Календарь</h2>
//             <Calendar value={date} onDateChange={setDate} />
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Dashboard;










// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import OrderList from "../components/OrderList";
// import { useOrders } from "../context/OrderProvider"; // Импортируем хук useOrders
// import Calendar from "../components/Calendar";

// const Dashboard = () => {
//   const { orders } = useOrders(); // Получаем заказы из контекста
//   const [date, setDate] = useState(() => {
//     const now = new Date();
//     return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
//   });

//   return (
//     <React.Fragment>
//       <div>
//         <div className="create-order-btn-container">
//           <Link to="/add-order">
//             <button className="create-order-btn">Создать заказ</button>
//           </Link>
//         </div>
//         <div className="orders">
//           <div className="">
//             <h2 className="h2-title-dashboard">Заказы</h2>
//             <div className="dashboard-order-list-container">
//               {orders && <OrderList />}
//             </div>
//           </div>

//           <div className="">
//             <h2 className="h2-title-dashboard">Заказы без даты</h2>
//             <div className="dashboard-order-list-container">
//               {orders && <OrderList />}
//             </div>
//           </div>

//           <div className="">
//             <h2 className="h2-title-dashboard">Календарный день</h2>
//             <div className="dashboard-order-list-container">
//               {orders && <OrderList />}
//             </div>
//           </div>

//           <div className="calendar-container">
//             <h2 className="h2-title-dashboard">Календарь</h2>
//             <Calendar value={date} onDateChange={setDate} />
//           </div>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default Dashboard;






import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import { Link } from "react-router-dom";
import OrderList from "../components/OrderList";
import { useOrders } from "../context/OrderProvider"; 
import Calendar from "../components/Calendar";


const Dashboard = () => {
  const { orders, setOrders } = useOrders(); // Предполагается, что есть функция setOrders для обновления заказов
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  const [countries, setCountries] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);

  // Получаем список стран с городами при монтировании компонента
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/employers/added-countries-with-cities/");
        setCountries(response.data);
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
      }
    };
    fetchCountries();
  }, []);

  // Обработчик выбора города
  // const handleCityChange = async (cityId) => {
  //   setSelectedCity(cityId);
  //   try {
  //     await api.post("/employers/select-primary-city/", { city_id: cityId });
  //     // Обновляем заказы после успешного запроса
  //     const updatedOrders = await api.get("/path-to-fetch-orders/");
  //     setOrders(updatedOrders.data);
  //   } catch (error) {
  //     console.error("Ошибка при выборе города:", error);
  //   }
  // };

  const handleCityChange = async (cityId) => {
    setSelectedCity(cityId);
    console.log('Selected city ID:', cityId);  // Для отладки
    try {
      const response = await api.post("/employers/select-primary-city/", { city_id: cityId });
      console.log('Response:', response.data); // Для отладки
      // Обновляем заказы после успешного запроса
      const updatedOrders = await api.get("/path-to-fetch-orders/");
      setOrders(updatedOrders.data);
    } catch (error) {
      console.error("Ошибка при выборе города:", error.response ? error.response.data : error.message);
    }
  };
  

  return (
    <React.Fragment>
      <div>
        {/* Чекбоксы для выбора города */}
        <div className="city-selection-container">
          {countries.map((country) => (
            <div key={country.id}>
              {/* <h3>{country.name}</h3> */}
              {country.cities.map((city) => (
                <label key={city.id}>
                  <input
                    type="checkbox"
                    checked={selectedCity === city.id}
                    onChange={() => handleCityChange(city.id)}
                  />
                  {city.name}
                </label>
              ))}
            </div>
          ))}
        </div>

        <div className="create-order-btn-container">
          <Link to="/add-order">
            <button className="create-order-btn">Создать заказ</button>
          </Link>
        </div>

        <div className="orders">
          <div className="">
            <h2 className="h2-title-dashboard">Заказы</h2>
            <div className="dashboard-order-list-container">
              {orders && <OrderList />}
            </div>
          </div>

          <div className="">
            <h2 className="h2-title-dashboard">Заказы без даты</h2>
            <div className="dashboard-order-list-container">
              {orders && <OrderList />}
            </div>
          </div>

          <div className="">
            <h2 className="h2-title-dashboard">Календарный день</h2>
            <div className="dashboard-order-list-container">
              {orders && <OrderList />}
            </div>
          </div>

          <div className="calendar-container">
            <h2 className="h2-title-dashboard">Календарь</h2>
            <Calendar value={date} onDateChange={setDate} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
