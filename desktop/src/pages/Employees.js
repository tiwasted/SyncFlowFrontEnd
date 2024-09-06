import React, { useState, useEffect } from "react";
import AddEmployeeModal from "../components/AddEmployeeModal";
import EmployeeList from "../components/EmployeeList";
import ManagerList from "../components/ManagerList";
import Notification from "../components/Notification";
import api from "../services/TokenService";
import "../styles/Employees.css";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState({ message: "", type: "" });

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
      if (error.response && error.response.status === 403) {
        setNotification({ message: error.response.data.detail, type: "error" });
      } else {
        // console.error("Error deleting employee", error);
      }
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
      if (error.response && error.response.status === 403) {
        setNotification({ message: error.response.data.detail, type: "error" });
      } else {
        // console.error("Error deleting manager", error);
      }
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

  const handleCloseNotification = () => {
    setNotification({ message: "", type: "" });
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
        <EmployeeList
          employees={employees}
          onDelete={deleteEmployee}
          fetchData={fetchData}
        />
        <ManagerList
          managers={managers}
          onDelete={deleteManager}
          fetchData={fetchData}
        />
        <AddEmployeeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onEmployeeAdded={handleAddEmployee}
        />
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

export default Employees;
