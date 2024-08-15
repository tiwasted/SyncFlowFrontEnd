import React, { useState, useEffect } from "react";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EmployeeList from "../components/EmployeeList";
import api from "../services/TokenService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees/employees/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      if (!id) {
        console.error("Invalid employee id");
        return;
      }
      await api.delete(`/employees/${id}/delete/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      // Оставляем добавление сотрудника в модальном окне и вызов функции обновления
      await fetchEmployees(); // Обновляем список сотрудников после добавления
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  return (
    <div>
      <div className="employeeContent">
        <button
          className="add-employee-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Добавить сотрудника
        </button>
      </div>
      <EmployeeList employees={employees} onDelete={deleteEmployee} />
      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onEmployeeAdded={handleAddEmployee}
      />
    </div>
  );
};

export default Employees;
