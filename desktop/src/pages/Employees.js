import React, { useState, useEffect } from "react";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EmployeeList from "../components/EmployeeList";
import ManagerList from "../components/ManagerList";
import api from "../services/TokenService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
    fetchManagers();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees/employees/");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees", error);
    }
  };

  const fetchManagers = async () => {
    try {
      const response = await api.get("/employers/managers/");
      setManagers(response.data);
    } catch (error) {
      console.error("Error fetching managers", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      if (!id) {
        console.error("Invalid employee id");
        return;
      }
      await api.delete(`/employees/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      console.error("Error deleting employee", error);
    }
  };

  const deleteManager = async (id) => {
    try {
      if (!id) {
        console.error("Invalid manager id");
        return;
      }
      await api.delete(`employers/manager/${id}/delete/`);
      setManagers(managers.filter((mgr) => mgr.id !== id));
    } catch (error) {
      console.error("Error deleting manager", error);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      await fetchEmployees();
      await fetchManagers();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding employee", error);
    }
  };

  return (
    <div className="employees-container">
      <div className="employees-section">
        <button
          className="employees-add-btn"
          onClick={() => setIsModalOpen(true)}
        >
          Добавить сотрудника по роли
        </button>
        <EmployeeList employees={employees} onDelete={deleteEmployee} />
        <ManagerList managers={managers} onDelete={deleteManager} />
        <AddEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onEmployeeAdded={handleAddEmployee}
        />
      </div>
    </div>
  );
};

export default Employees;
