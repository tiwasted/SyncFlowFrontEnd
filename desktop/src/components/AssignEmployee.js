import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import Notification from "./Notification";
import "../styles/AssignEmployee.css";

const AssignEmployee = ({ orderId, onEmployeeAssigned, show, onClose }) => {
  const [employeeIds, setEmployeeIds] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" }); 

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees/assigning-list/");
        setEmployees(response.data);
      } catch (error) {
        // console.error("Ошибка при получении списка сотрудников", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAssign = async () => {
    try {
      const response = await api.post(
        `/orders/b2c-orders/${orderId}/assign_employee/`,
        { employee_ids: employeeIds }
      );

      const updatedOrder = response.data;
      onEmployeeAssigned(updatedOrder);
      setEmployeeIds([]);
      onClose();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setNotification({
          message: "Сначала назначьте дату на заказ",
          type: "warning",
        });
      } else {
        // console.error("Ошибка при назначении сотрудника", error);
      }
    }
  };

  const handleCardClick = (employeeId) => {
    setEmployeeIds((prevIds) =>
      prevIds.includes(employeeId)
        ? prevIds.filter((id) => id !== employeeId)
        : [...prevIds, employeeId]
    );
  };

  if (!show) {
    return null;
  }

  return (
    <div className="reassign-modal">
      <div className="reassign-modal-content">
        <span className="reassign-close" onClick={onClose}>
          &times;
        </span>
        <h2 className="reassign-title">Назначить сотрудника</h2>
        <div className="reassign-employee-list">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className={`reassign-employee-card ${
                employeeIds.includes(employee.id) ? "selected" : ""
              }`}
              onClick={() => handleCardClick(employee.id)}
            >
              <div className="reassign-employee-name">
                {employee.first_name} {employee.last_name}
              </div>
            </div>
          ))}
        </div>
        <div className="reassign-button-container">
          <button className="reassign-button" onClick={handleAssign}>
            Назначить сотрудников
          </button>
        </div>
      </div>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default AssignEmployee;
