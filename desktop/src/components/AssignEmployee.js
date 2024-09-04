import React, { useState, useEffect } from "react";
import api from "../services/TokenService";
import "../styles/ReassignEmployee.css";

const AssignEmployee = ({ orderId, onEmployeeAssigned, show, onClose }) => {
  const [employeeIds, setEmployeeIds] = useState([]);
  const [employees, setEmployees] = useState([]);

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
      // console.error("Ошибка при назначении сотрудника", error);
    }
  };

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setEmployeeIds(selectedOptions);
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
        <select
          className="reassign-select"
          multiple
          value={employeeIds}
          onChange={handleSelectChange}
        >
          <option value="" disabled>Выберите сотрудников</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.first_name} {employee.last_name}
            </option>
          ))}
        </select>
        <div className="reassign-button-container">
          <button className="reassign-button" onClick={handleAssign}>
            Назначить сотрудников
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignEmployee;