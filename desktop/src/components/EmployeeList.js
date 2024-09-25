import React, { useState } from "react";
import ModalForDelete from "./ModalForDelete";
import EmployeeEdit from "./EmployeeEdit";
import "../styles/EmployeeList.css";
import api from "../services/TokenService";

const EmployeeList = ({ employees, setEmployees, onDelete, fetchData }) => {
  const [showModal, setShowModal] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);

  const handleDelete = async () => {
    if (employeeToDelete === null) return;

    onDelete(employeeToDelete);
    setShowModal(false);
  };

  const handleDeleteClick = (id) => {
    setEmployeeToDelete(id);
    setShowModal(true);
  };

  const handleEditClick = (employee) => {
    setEmployeeToEdit(employee);
  };

  const handleCancelEdit = () => {
    setEmployeeToEdit(null);
  };

  const handleSaveEdit = async (updatedEmployee) => {
    try {
      const response = await api.put(
        `/employees/edit/${updatedEmployee.id}/`,
        updatedEmployee
      );
      setEmployees(
        employees.map((emp) =>
          emp.id === updatedEmployee.id ? response.data : emp
        )
      );
      setEmployeeToEdit(null);
      fetchData();
    } catch (error) {
      // console.error("Ошибка при сохранении данных сотрудника:", error);
    }
  };

  return (
    <div className="employee-list-container">
      <h1 className="employee-list-title">Список сотрудников</h1>
      <div className="employee-grid-header">
        <div className="employee-grid-header-item">Фамилия Имя</div>
        <div className="employee-grid-header-item">Телефон</div>
        <div className="employee-grid-header-item"></div>
        <div className="employee-grid-header-item">Действия</div>
      </div>
      {employees.map((employee) => (
        <div className="employee-grid" key={employee.id}>
          <div className="employee-name">
            {employee.last_name} {employee.first_name}
          </div>
          <div className="employee-phone">{employee.phone}</div>
          <div className="employee-cities">
            {/* {employee.cities.map((city, index) => (
              <span key={city.id} className="employee-city">
                {city.name}
                {index < employee.cities.length - 1 && <span className="city-separator"> </span>}
              </span>
            ))} */}
          </div>
          <div className="employee-actions">
            <button
              className="employee-edit-btn"
              onClick={() => handleEditClick(employee)}
            >
              Редактировать
            </button>
            <button
              className="employee-delete-btn"
              onClick={() => handleDeleteClick(employee.id)}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
      {employeeToEdit && (
        <EmployeeEdit
          employee={employeeToEdit}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
          fetchData={fetchData}
        />
      )}
      <ModalForDelete
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleDelete}
      >
        Вы точно хотите удалить этого сотрудника?
      </ModalForDelete>
    </div>
  );
};

export default EmployeeList;
