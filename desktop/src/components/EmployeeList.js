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
        <div className="">
            <h1>Список сотрудников</h1>
            <div className="employee-grid employee-grid-header">
                <div>Фамилия Имя</div>
                <div>Телефон</div>
            </div>
            {employees.map(employee => (
                <div className="employee-grid" key={employee.id}>
                    <div className="employee-first-last-name"> 
                        <div className="employee-first-last-name-text">{employee.last_name}</div>
                        <div>{employee.first_name}</div>
                    </div>
                    <div>{employee.phone}</div>
                    <div>
                        <div key={employee.id}>
                            <button className='general-btns' onClick={() => onEdit(employee.id)}>Редактировать</button>
                            <button className='general-btns delete-btn' onClick={() => handleDeleteClick(employee.id)}>Удалить</button>
                        </div>
                    </div>
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
