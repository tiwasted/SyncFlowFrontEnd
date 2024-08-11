import React, {useState} from "react";
import ModalForDelete from "./ModalForDelete";

const EmployeeList = ({ employees, onEdit, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const [employeeToDelete, setEmployeeToDelete] = useState(null);

    const handleDelete = () => {
        if (employeeToDelete === null) return;

        onDelete(employeeToDelete); // Вызов функции удаления из родительского компонента
        setShowModal(false); // Закрываем модальное окно после удаления
    };

    const handleDeleteClick = (id) => {
        setEmployeeToDelete(id); // Сохраняем ID сотрудника, которого хотим удалить
        setShowModal(true); // Открываем модальное окно
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="employee-list-container">
    <h1 className="employee-list-title">Список сотрудников</h1>
    <div className="employee-grid-header">
        <div className="employee-grid-header-item">Фамилия Имя</div>
        <div className="employee-grid-header-item">Телефон</div>
        <div className="employee-grid-header-item">Действия</div>
    </div>
    {employees.map(employee => (
        <div className="employee-grid" key={employee.id}>
            {/* <div className="employee-info"> */}
                <div className="employee-name">
                    <div className="employee-last-name">{employee.last_name}</div>
                    <div className="employee-first-name">{employee.first_name}</div>
                </div>
                <div className="employee-phone">{employee.phone}</div>
                <div className="employee-actions">
                    <button className="employee-edit-btn" onClick={() => onEdit(employee.id)}>Редактировать</button>
                    <button className="employee-delete-btn" onClick={() => handleDeleteClick(employee.id)}>Удалить</button>
                </div>
            {/* </div> */}
        </div>
    ))}
    <ModalForDelete
        show={showModal}
        onClose={closeModal}
        onConfirm={handleDelete}
    >
        Вы точно хотите удалить этого сотрудника?
    </ModalForDelete>
</div>

    );
};

export default EmployeeList;
