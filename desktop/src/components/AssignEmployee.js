import React, { useState, useEffect } from 'react';
import api from '../services/tokenService';

const AssignEmployee = ({ orderId, onEmployeeAssigned }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/employees/employees/');
        setEmployees(response.data);
      } catch (error) {
        console.error("Ошибка при получении списка сотрудников", error);
      }
    };

    fetchEmployees();
  }, []);

  const handleAssign = async () => {
    try {
      const response = await api.post(
        `http://localhost:8000/orders/b2c-orders/${orderId}/assign_employee/`,
        { employee_id: employeeId },
      );

      // Обновленный заказ
      const updatedOrder = response.data;

      // Вызов функции обратного вызова для обновления состояния
      if (onEmployeeAssigned) {
        onEmployeeAssigned(updatedOrder);
      }

      setEmployeeId(''); // Очистка после успешного назначения
    } catch (error) {
      console.error("Ошибка при назначении сотрудника", error);
    }
  };

  return (
    <div className="assign-employee">
      <select
        className="employee-select"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      >
        <option value="">Выберите сотрудника</option>
        {employees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.first_name} {employee.last_name}
          </option>
        ))}
      </select>
      <button className="general-btns" onClick={handleAssign}>Назначить сотрудника</button>
    </div>
  );
};

export default AssignEmployee;
