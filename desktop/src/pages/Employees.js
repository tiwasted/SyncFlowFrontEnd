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
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [employeesResponse, managersResponse] = await Promise.all([
        api.get("/employees/employees/"),
        api.get("/employers/managers/"),
      ]);
      setEmployees(employeesResponse.data);
      setManagers(managersResponse.data);
    } catch (error) {
      // console.error("Error fetching data", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      if (!id) {
        // console.error("Invalid employee id");
        return;
      }
      await api.delete(`/employees/${id}/delete/`);
      setEmployees(employees.filter((emp) => emp.id !== id));
    } catch (error) {
      // console.error("Error deleting employee", error);
    }
  };

  const deleteManager = async (id) => {
    try {
      if (!id) {
        // console.error("Invalid manager id");
        return;
      }
      await api.delete(`employers/manager/${id}/delete/`);
      setManagers(managers.filter((mgr) => mgr.id !== id));
    } catch (error) {
      // console.error("Error deleting manager", error);
    }
  };

  const handleAddEmployee = async (newEmployee) => {
    try {
      await fetchData();
      setIsModalOpen(false);
    } catch (error) {
      // console.error("Error adding employee", error);
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