import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import Notification from "./Notification";
import "../styles/AssignEmployee.css";

const AssignEmployee = ({ orderId, onEmployeeAssigned, show, onClose }) => {
  const [employeeIds, setEmployeeIds] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [showNotification, setShowNotification] = useState(false);

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
    if (employeeIds.length === 0) {
      setNotification({
        message: "Вы не выбрали сотрудника",
        type: "warning",
      });
      setShowNotification(true);
      return;
    }

    try {
      const response = await api.post(
        `/orders/b2c-orders/${orderId}/assign_employee/`,
        { employee_ids: employeeIds }
      );

      const updatedOrder = response.data;
      onEmployeeAssigned(updatedOrder);
      setEmployeeIds([]);
      setNotification({
        message: "Сотрудник успешно назначен и заказ находится в расписании",
        type: "success",
      });
      setShowNotification(true);
      setTimeout(() => {
        onClose(); // Закрываем модальное окно с задержкой
      }, 1500);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data.error;
        if (errorMessage === "Невозможно назначить сотрудников на заказ без даты") {
          setNotification({
            message: "Сначала назначьте дату",
            type: "warning",
          });
        } else if (errorMessage === "Требуется список ID сотрудников") {
          setNotification({
            message: "Вы не выбрали сотрудника",
            type: "warning",
          });
        } else {
          setNotification({
            message: "Произошла ошибка при назначении сотрудника",
            type: "error",
          });
        }
      } else {
        // console.error("Ошибка при назначении сотрудника", error);
      }
      setShowNotification(true);
    }
  };

  const handleCardClick = (employeeId) => {
    setEmployeeIds((prevIds) =>
      prevIds.includes(employeeId)
        ? prevIds.filter((id) => id !== employeeId)
        : [...prevIds, employeeId]
    );
  };

  const handleClose = () => {
    setEmployeeIds([]);
    setNotification({ message: "", type: "" });
    setShowNotification(false);
    onClose();
  };

  return (
    <>
      {show && (
        <div className="reassign-modal">
          <div className="reassign-modal-content">
            <span className="reassign-close" onClick={handleClose}>
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
        </div>
      )}
      {showNotification && notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default AssignEmployee;