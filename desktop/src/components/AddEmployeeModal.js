import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import Notification from "../components/Notification";
import "../styles/AddEmployeeModal.css";

const AddEmployeeModal = ({ isOpen, onClose, onEmployeeAdded }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    role: "employee",
    selectedCities: [],
  });
  const [error, setError] = useState("");
  const [availableCities, setAvailableCities] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    if (isOpen) {
      fetchRoles();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const fetchRoles = async () => {
    try {
      const response = await api.get("/employers/roles/");
      const roleTranslations = {
        Employee: "Сотрудник",
        Manager: "Менеджер",
      };
      const formattedRoles = response.data.roles.map(([id, name]) => ({
        id,
        name: roleTranslations[name] || name,
      }));
      setRoles(formattedRoles);
    } catch (error) {
      // console.error("Error fetching roles", error);
    }
  };

  const fetchAvailableCities = async () => {
    try {
      const response = await api.get("/employers/available-cities/");
      setAvailableCities(response.data.cities || []);
    } catch (error) {
      // console.error("Error fetching available cities", error);
    }
  };

  const addEmployee = async () => {
    const { firstName, lastName, password, phoneNumber, role, selectedCities } =
      formData;
    if (!firstName || !lastName || !password || !phoneNumber) {
      setError("Пожалуйста, заполните все поля");
      return;
    }

    const newEmployee = {
      phone: phoneNumber,
      password,
      first_name: firstName,
      last_name: lastName,
      role,
      cities: selectedCities,
    };

    try {
      setLoading(true);
      const response = await api.post("/employers/create-role/", newEmployee);
      onEmployeeAdded(response.data);
      onClose();
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.phone &&
        error.response.data.phone.includes(
          "Пользователь с таким phone уже существует"
        )
      ) {
        setNotification({
          message: "Пользователь с таким номером уже существует",
          type: "error",
        });
      } else if (error.response && error.response.status === 403) {
        setNotification({ message: error.response.data.detail, type: "error" });
      } else {
        const errorMessage =
          error.response?.data?.detail || "Ошибка при добавлении сотрудника";
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCityChange = (e) => {
    const { value, checked } = e.target;
    const cityId = parseInt(value, 10);
    setFormData((prev) => ({
      ...prev,
      selectedCities: checked
        ? [...prev.selectedCities, cityId]
        : prev.selectedCities.filter((city) => city !== cityId),
    }));
  };

  const handleRoleChange = async (e) => {
    const { value } = e.target;
    setFormData({
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      role: value,
      selectedCities: [],
    });

    if (value === "manager") {
      await fetchAvailableCities();
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      password: "",
      phoneNumber: "",
      role: "employee",
      selectedCities: [],
    });
    setError("");
    setAvailableCities([]);
  };

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
  };

  if (!isOpen) return null;

  return (
    <div className="add-employee-modal">
      <div className="add-employee-modal-content">
        <span className="add-employee-modal-close" onClick={onClose}>
          &times;
        </span>
        <h2 className="add-employee-modal-title">Добавить сотрудника</h2>
        <div className="add-employee-form-group">
          <select
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
            className="add-employee-form-select"
          >
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
            name="firstName"
            className="add-employee-form-input"
            placeholder="Имя"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-employee-form-group">
          <input
            type="text"
            name="lastName"
            className="add-employee-form-input"
            placeholder="Фамилия"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-employee-form-group">
          <input
            type="text"
            name="phoneNumber"
            className="add-employee-form-input"
            placeholder="Номер телефона"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="add-employee-form-group">
          <input
            type="password"
            name="password"
            className="add-employee-form-input"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        {formData.role === "manager" && (
          <div className="add-employee-form-group">
            <label>Выберите города:</label>
            <div className="add-employee-form-checkbox-group">
              {availableCities.map((city) => (
                <div key={city.id} className="add-employee-form-checkbox">
                  <label>
                    <input
                      type="checkbox"
                      value={city.id}
                      checked={formData.selectedCities.includes(city.id)}
                      onChange={handleCityChange}
                    />
                    {city.name}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
        <button
          className="add-employee-form-button"
          onClick={addEmployee}
          disabled={loading}
        >
          {loading ? "Добавление..." : "Добавить"}
        </button>
        {error && <div className="add-employee-error-message">{error}</div>}
      </div>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={handleCloseNotification}
        />
      )}
    </div>
  );
};

export default AddEmployeeModal;
