import React, { useState, useEffect } from "react";
import { useOrders } from "../context/OrderProvider";
import api from "../services/TokenService";

const ReassignEmployee = ({ orderId }) => {
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const { setOrders } = useOrders();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get("/employees/employees/");
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
        `/orders/b2c-orders/${orderId}/assign_employee/`,
        { employee_id: employeeId }
      );

      const updatedOrder = response.data;
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        )
      );

      setEmployeeId(""); // Очистка после успешного назначения

    } catch (error) {
      console.error("Ошибка при переназначении сотрудника", error);
    }
  };

  return (
    <div className="reassign-container">
      <h2 className="reassign-title">Переназначить сотрудника</h2>
      <select
        className="reassign-select"
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
      <button className="reassign-button" onClick={handleAssign}>
        Переназначить
      </button>
    </div>
  );
};

export default ReassignEmployee;
