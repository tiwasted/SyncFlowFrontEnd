import React from "react";

const EmployeeList = ({ employees, onEdit, onDelete }) => {
    return (
        <div className="">
            <h1>Список сотрудников</h1>
            <ul>
                {employees.map(employee => (
                <div className="content-item" key={employee.id}>
                    <p>Имя: {employee.first_name}</p> <br />
                    <p>Фамилия: {employee.last_name}</p> <br />
                    <p>Телефон: {employee.phone}</p> <br />
                    <button className='general-btns' onClick={() => {
                    onEdit(employee.id)}}>Редактировать</button>
                    <button className='delete-btns' onClick={() => {
                    onDelete(employee.id)}}>Удалить</button>
                </div>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
