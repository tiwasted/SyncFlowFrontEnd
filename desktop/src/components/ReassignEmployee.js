import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import "../styles/AssignEmployee.css";

const ReassignEmployee = ({ orderId, assignedEmployees, onEmployeeAssigned, show, onClose }) => {
  const [employeeIds, setEmployeeIds] = useState([]);
  const [employees, setEmployees] = useState([]);

  

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees/assigning-list/");
        setEmployees(response.data);
        console.log(response.data);
      } catch (error) {
        // console.error("Ошибка при получении списка сотрудников", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    if (assignedEmployees) {
      setEmployeeIds(assignedEmployees.map(employee => employee.id));
    }
  }, [assignedEmployees]);

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
      // console.error("Ошибка при переназначении сотрудника", error);
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
    </div>
  );
};

export default ReassignEmployee;

