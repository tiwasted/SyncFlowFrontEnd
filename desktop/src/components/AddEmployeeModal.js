// import React, { useState, useEffect } from "react";
// import api from "../services/TokenService";

// const AddEmployeeModal = ({ isOpen, onClose, onEmployeeAdded }) => {
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [password, setPassword] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [role, setRole] = useState("employee");
//   const [error, setError] = useState("");
//   const [availableCities, setAvailableCities] = useState([]);
//   const [selectedCities, setSelectedCities] = useState([]);
//   const [roles, setRoles] = useState([]);

//   useEffect(() => {
//     fetchRoles();
//   }, []);

//   useEffect(() => {
//     if (role === "manager") {
//       fetchAvailableCities();
//     }
//     resetForm();
//   }, [role]);

//   useEffect(() => {
//     if (!isOpen) {
//       resetForm();
//     }
//   }, [isOpen]);

//   const fetchRoles = async () => {
//     try {
//       const response = await api.get("/employers/roles/");
//       const formattedRoles = response.data.roles.map(([id, name]) => ({
//         id,
//         name,
//       }));
//       setRoles(formattedRoles);
//     } catch (error) {
//       console.error("Error fetching roles", error);
//     }
//   };

//   const fetchAvailableCities = async () => {
//     try {
//       const response = await api.get("/employers/available-cities/");
//       console.log("Fetched cities:", response.data); // Логирование данных
//       setAvailableCities(response.data.cities || []);
//     } catch (error) {
//       console.error("Error fetching available cities", error);
//     }
//   };

//   const addEmployee = async () => {
//     if (!firstName || !lastName || !password || !phoneNumber) {
//       setError("Пожалуйста, заполните все поля.");
//       return;
//     }

//     const newEmployee = {
//       phone: phoneNumber,
//       password: password,
//       first_name: firstName,
//       last_name: lastName,
//       role: role,
//       cities: role === "manager" ? selectedCities : [],
//     };

//     try {
//       const response = await api.post("/employers/create-role/", newEmployee);
//       onEmployeeAdded(response.data);
//       onClose();
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.detail || "Ошибка при добавлении сотрудника";
//       setError(errorMessage);
//     }
//   };

//   const handleCityChange = (e) => {
//     const { value, checked } = e.target;
//     const cityId = parseInt(value, 10); // Преобразуем значение в число
//     setSelectedCities((prevSelectedCities) =>
//       checked
//         ? [...prevSelectedCities, cityId]
//         : prevSelectedCities.filter((city) => city !== cityId)
//     );
//   };

//   const resetForm = () => {
//     setFirstName("");
//     setLastName("");
//     setPassword("");
//     setPhoneNumber("");
//     setError("");
//     setAvailableCities([]);
//     setSelectedCities([]);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="add-employee-modal">
//       <div className="add-employee-modal-content">
//         <span className="add-employee-modal-close" onClick={onClose}>
//           &times;
//         </span>
//         <h2 className="add-employee-modal-title">Добавить сотрудника</h2>
//         {error && <div className="add-employee-error-message">{error}</div>}
//         <div className="add-employee-form-group">
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             {roles.map((role) => (
//               <option key={role.id} value={role.id}>
//                 {role.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="add-employee-form-group">
//           <input
//             type="text"
//             className="add-employee-form-input"
//             placeholder="Имя"
//             value={firstName}
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </div>
//         <div className="add-employee-form-group">
//           <input
//             type="text"
//             className="add-employee-form-input"
//             placeholder="Фамилия"
//             value={lastName}
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </div>
//         <div className="add-employee-form-group">
//           <input
//             type="password"
//             className="add-employee-form-input"
//             placeholder="Пароль"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div className="add-employee-form-group">
//           <input
//             type="text"
//             className="add-employee-form-input"
//             placeholder="Номер телефона"
//             value={phoneNumber}
//             onChange={(e) => setPhoneNumber(e.target.value)}
//           />
//         </div>
//         {role === "manager" && (
//           <div className="add-employee-form-group">
//             <label>Выберите города:</label>
//             <div className="add-employee-form-checkbox-group">
//               {availableCities.map((city) => (
//                 <div key={city.id} className="add-employee-form-checkbox">
//                   <label>
//                     <input
//                       type="checkbox"
//                       value={city.id}
//                       checked={selectedCities.includes(city.id)}
//                       onChange={handleCityChange}
//                     />
//                     {city.name}
//                   </label>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//         <button className="add-employee-form-button" onClick={addEmployee}>
//           Добавить
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AddEmployeeModal;






import React, { useState, useEffect } from "react";
import api from "../services/TokenService";

const AddEmployeeModal = ({ isOpen, onClose, onEmployeeAdded }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("employee");
  const [error, setError] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchRoles();
    }
  }, [isOpen]);

  useEffect(() => {
    if (role === "manager") {
      fetchAvailableCities();
    }
    resetForm();
  }, [role]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const fetchRoles = async () => {
    try {
      const response = await api.get("/employers/roles/");
      const formattedRoles = response.data.roles.map(([id, name]) => ({
        id,
        name,
      }));
      setRoles(formattedRoles);
    } catch (error) {
      console.error("Error fetching roles", error);
    }
  };

  const fetchAvailableCities = async () => {
    try {
      const response = await api.get("/employers/available-cities/");
      console.log("Fetched cities:", response.data); // Логирование данных
      setAvailableCities(response.data.cities || []);
    } catch (error) {
      console.error("Error fetching available cities", error);
    }
  };

  const addEmployee = async () => {
    if (!firstName || !lastName || !password || !phoneNumber) {
      setError("Пожалуйста, заполните все поля.");
      return;
    }

    const newEmployee = {
      phone: phoneNumber,
      password: password,
      first_name: firstName,
      last_name: lastName,
      role: role,
      cities: role === "manager" ? selectedCities : [],
    };

    try {
      const response = await api.post("/employers/create-role/", newEmployee);
      onEmployeeAdded(response.data);
      onClose();
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail || "Ошибка при добавлении сотрудника";
      setError(errorMessage);
    }
  };

  const handleCityChange = (e) => {
    const { value, checked } = e.target;
    const cityId = parseInt(value, 10); // Преобразуем значение в число
    setSelectedCities((prevSelectedCities) =>
      checked
        ? [...prevSelectedCities, cityId]
        : prevSelectedCities.filter((city) => city !== cityId)
    );
  };

  const resetForm = () => {
    setFirstName("");
    setLastName("");
    setPassword("");
    setPhoneNumber("");
    setError("");
    setAvailableCities([]);
    setSelectedCities([]);
  };

  if (!isOpen) return null;

  return (
    <div className="add-employee-modal">
      <div className="add-employee-modal-content">
        <span className="add-employee-modal-close" onClick={onClose}>
          &times;
        </span>
        <h2 className="add-employee-modal-title">Добавить сотрудника</h2>
        {error && <div className="add-employee-error-message">{error}</div>}
        <div className="add-employee-form-group">
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="add-employee-form-group">
          <input
            type="text"
            className="add-employee-form-input"
            placeholder="Имя"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="add-employee-form-group">
          <input
            type="text"
            className="add-employee-form-input"
            placeholder="Фамилия"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="add-employee-form-group">
          <input
            type="password"
            className="add-employee-form-input"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="add-employee-form-group">
          <input
            type="text"
            className="add-employee-form-input"
            placeholder="Номер телефона"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        {role === "manager" && (
          <div className="add-employee-form-group">
            <label>Выберите города:</label>
            <div className="add-employee-form-checkbox-group">
              {availableCities.map((city) => (
                <div key={city.id} className="add-employee-form-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={city.id}
                      checked={selectedCities.includes(city.id)}
                      onChange={handleCityChange}
                    />
                    {city.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        <button className="add-employee-form-button" onClick={addEmployee}>
          Добавить
        </button>
      </div>
    </div>
  );
};

export default AddEmployeeModal;