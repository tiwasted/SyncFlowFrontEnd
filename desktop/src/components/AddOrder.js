import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrders } from "../context/OrderProvider";
import api from "../services/TokenService";

const AddOrder = () => {
  const [nameOfOrder, setOrderName] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [nameOfClient, setNameOfClient] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [orderSaved, setOrderSaved] = useState(false);
  const { setOrders } = useOrders();
  const navigate = useNavigate();

  const handleSaveOrder = async () => {
    if (!nameOfOrder || !price || !date || !time || !address || !nameOfClient || !phoneNumber || !description) {
      setError("Заполните все поля");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("order_name", nameOfOrder);
      formData.append("price", price);
      formData.append("order_date", date);
      formData.append("order_time", time);
      formData.append("address", address);
      formData.append("name_client", nameOfClient);
      formData.append("phone_number_client", phoneNumber);
      formData.append("description", description);

      const response = await api.post("/orders/b2c-orders/", formData);
      setOrders((prevOrders) => [...prevOrders, response.data]);
      setOrderSaved(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setError("Заполните все поля");
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSaveOrder();
  };

  return (
    <React.Fragment>
      <div className="add-order-container">
        <h2 className="add-h2">Добавить заказ</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="add-form-group">
            <label className="add-label">Наименование заказа:</label>
            <input
              type="text"
              value={nameOfOrder}
              onChange={(e) => setOrderName(e.target.value)}
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Цена:</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="add-form-group">
            <label className="add-label-date">Дата:</label>
            <input
              className="add-input-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="add-form-group">
            <label className="add-label-time">Время:</label>
            <input
              className="add-input-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Адрес:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Имя клиента:</label>
            <input
              type="text"
              value={nameOfClient}
              onChange={(e) => setNameOfClient(e.target.value)}
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Номер телефона:</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="add-form-group">
            <label className="add-label">Описание:</label>
            <textarea
              className="add-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-btns">
            <button className="general-btns" type="submit">
              Сохранить
            </button>
            <button className="back-btn" onClick={() => navigate(-1)}>
              Назад
            </button>
          </div>
        </form>
        {error && <p className="add-error-message">{error}</p>}
        {orderSaved && (
          <div className="add-success-message">Заказ успешно добавлен</div>
        )}
      </div>
    </React.Fragment>
  );
};

export default AddOrder;








// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import TimePicker from "react-time-picker";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-time-picker/dist/TimePicker.css";
// import { useOrders } from "../context/OrderProvider";
// import api from "../services/TokenService";

// const AddOrder = () => {
//   const [nameOfOrder, setOrderName] = useState("");
//   const [price, setPrice] = useState("");
//   const [date, setDate] = useState(null);
//   const [time, setTime] = useState("00:00");
//   const [address, setAddress] = useState("");
//   const [nameOfClient, setNameOfClient] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");
//   const [orderSaved, setOrderSaved] = useState(false);
//   const { setOrders } = useOrders();
//   const navigate = useNavigate();

//   const handleSaveOrder = async () => {
//     if (!nameOfOrder || !price || !date || !time || !address || !nameOfClient || !phoneNumber || !description) {
//       setError("Заполните все поля");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("order_name", nameOfOrder);
//       formData.append("price", price);
//       formData.append("order_date", date.toISOString().split("T")[0]);
//       formData.append("order_time", time);
//       formData.append("address", address);
//       formData.append("name_client", nameOfClient);
//       formData.append("phone_number_client", phoneNumber);
//       formData.append("description", description);

//       const response = await api.post("/orders/b2c-orders/", formData);
//       setOrders((prevOrders) => [...prevOrders, response.data]);
//       setOrderSaved(true);
//       setTimeout(() => {
//         navigate("/dashboard");
//       }, 1000);
//     } catch (error) {
//       setError("Произошла ошибка при сохранении заказа");
//     }
//   };

//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     handleSaveOrder();
//   };

//   return (
//     <React.Fragment>
//       <div className="add-order-container">
//         <h2 className="add-h2">Добавить заказ</h2>
//         <form onSubmit={handleFormSubmit}>
//           <div className="add-form-group">
//             <label className="add-label">Наименование заказа:</label>
//             <input
//               type="text"
//               value={nameOfOrder}
//               onChange={(e) => setOrderName(e.target.value)}
//             />
//           </div>
//           <div className="add-form-group">
//             <label className="add-label">Цена:</label>
//             <input
//               type="text"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
//           </div>
//           <div className="add-form-group">
//             <label className="add-label-date">Дата:</label>
//             <DatePicker
//               selected={date}
//               onChange={(date) => setDate(date)}
//               dateFormat="yyyy-MM-dd"
//               className="add-input-date"
//               placeholderText="Выберите дату"
//             />
//           </div>
//           <div className="add-form-group">
//             <label className="add-label-time">Время:</label>
//             <TimePicker
//               onChange={setTime}
//               value={time}
//               disableClock={true}
//               format="HH:mm"
//               className="add-input-time"
//               clearIcon={null}
//             />
//           </div>
//           <div className="add-form-group">
//             <label className="add-label">Адрес:</label>
//             <input
//               type="text"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//             />
//           </div>
//           <div className="add-form-group">
//             <label className="add-label">Имя клиента:</label>
//             <input
//               type="text"
//               value={nameOfClient}
//               onChange={(e) => setNameOfClient(e.target.value)}
//             />
//           </div>
//           <div className="add-form-group">
//             <label className="add-label">Номер телефона:</label>
//             <input
//               type="text"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//             />
//           </div>
//           <div className="add-form-group">
//             <label className="add-label">Описание:</label>
//             <textarea
//               className="add-textarea"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//           </div>
//           <div className="form-btns">
//             <button className="general-btns" type="submit">
//               Сохранить
//             </button>
//             <button className="back-btn" onClick={() => navigate(-1)}>
//               Назад
//             </button>
//           </div>
//         </form>
//         {error && <p className="add-error-message">{error}</p>}
//         {orderSaved && (
//           <div className="add-success-message">Заказ успешно добавлен</div>
//         )}
//       </div>
//     </React.Fragment>
//   );
// };

// export default AddOrder;











// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DatePicker from "react-datepicker";
// import TimePicker from "react-time-picker";
// import "react-datepicker/dist/react-datepicker.css";
// import "react-time-picker/dist/TimePicker.css";
// import { useOrders } from "../context/OrderProvider";
// import api from "../services/TokenService";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCalendarAlt, faClock, faMoneyBillWave, faMapMarkerAlt, faUser, faPhone, faClipboard } from "@fortawesome/free-solid-svg-icons";

// const AddOrder = () => {
//   const [nameOfOrder, setOrderName] = useState("");
//   const [price, setPrice] = useState("");
//   const [date, setDate] = useState(null);
//   const [time, setTime] = useState("00:00");
//   const [address, setAddress] = useState("");
//   const [nameOfClient, setNameOfClient] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [description, setDescription] = useState("");
//   const [error, setError] = useState("");
//   const [orderSaved, setOrderSaved] = useState(false);
//   const { setOrders } = useOrders();
//   const navigate = useNavigate();

//   const handleSaveOrder = async () => {
//     if (!nameOfOrder || !price || !date || !time || !address || !nameOfClient || !phoneNumber || !description) {
//       setError("Заполните все поля");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("order_name", nameOfOrder);
//       formData.append("price", price);
//       formData.append("order_date", date.toISOString().split("T")[0]);
//       formData.append("order_time", time);
//       formData.append("address", address);
//       formData.append("name_client", nameOfClient);
//       formData.append("phone_number_client", phoneNumber);
//       formData.append("description", description);

//       const response = await api.post("/orders/b2c-orders/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       setOrders((prevOrders) => [...prevOrders, response.data]);
//       setOrderSaved(true);
//       setError("");
//       setTimeout(() => navigate("/dashboard"), 2000);
//     } catch (err) {
//       console.error(err);
//       setError("Ошибка при сохранении заказа");
//     }
//   };

//   return (
//     <div className="add-order-container">
//       <h2 className="add-h2">Добавить Заказ</h2>

//       <div className="add-form-group">
//         <label className="add-label">Название заказа</label>
//         <FontAwesomeIcon icon={faClipboard} />
//         <input
//           className="add-input"
//           type="text"
//           value={nameOfOrder}
//           onChange={(e) => setOrderName(e.target.value)}
//           placeholder="Введите название заказа"
//         />
//       </div>

//       <div className="add-form-group">
//         <label className="add-label">Цена</label>
//         <FontAwesomeIcon icon={faMoneyBillWave} />
//         <input
//           className="add-input"
//           type="number"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           placeholder="Введите цену"
//         />
//       </div>

//       <div className="add-form-group">
//         <label className="add-label">Дата заказа</label>
//         <FontAwesomeIcon icon={faCalendarAlt} />
//         <DatePicker
//           className="add-input-date"
//           selected={date}
//           onChange={(date) => setDate(date)}
//           dateFormat="yyyy-MM-dd"
//           placeholderText="Выберите дату"
//         />
//       </div>

//       <div className="add-form-group">
//         <label className="add-label">Время заказа</label>
//         <FontAwesomeIcon icon={faClock} />
//         <TimePicker
//           className="add-input-time"
//           onChange={(time) => setTime(time)}
//           value={time}
//           disableClock
//           clearIcon={null}
//           format="HH:mm"
//         />
//       </div>

//       <div className="add-form-group">
//         <label className="add-label">Адрес</label>
//         <FontAwesomeIcon icon={faMapMarkerAlt} />
//         <input
//           className="add-input"
//           type="text"
//           value={address}
//           onChange={(e) => setAddress(e.target.value)}
//           placeholder="Введите адрес"
//         />
//       </div>

//       <div className="add-form-group">
//         <label className="add-label">Имя клиента</label>
//         <FontAwesomeIcon icon={faUser} />
//         <input
//           className="add-input"
//           type="text"
//           value={nameOfClient}
//           onChange={(e) => setNameOfClient(e.target.value)}
//           placeholder="Введите имя клиента"
//         />
//       </div>

//       <div className="add-form-group">
//         <label className="add-label">Номер телефона</label>
//         <FontAwesomeIcon icon={faPhone} />
//         <input
//           className="add-input"
//           type="tel"
//           value={phoneNumber}
//           onChange={(e) => setPhoneNumber(e.target.value)}
//           placeholder="Введите номер телефона"
//         />
//       </div>

//       <div className="add-form-group">
//         <label className="add-label">Описание заказа</label>
//         <FontAwesomeIcon icon={faClipboard} />
//         <textarea
//           className="add-textarea"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Введите описание заказа"
//         />
//       </div>

//       {error && <div className="add-error-message">{error}</div>}
//       {orderSaved && <div className="add-success-message">Заказ успешно сохранен!</div>}

//       <div className="form-btns">
//         <button className="general-btns" onClick={handleSaveOrder}>
//           Сохранить
//         </button>
//         <button className="back-btn" onClick={() => navigate("/dashboard")}>
//           Назад
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddOrder;
