import React from "react";

const EmployeeList = ({ employees, onEdit, onDelete }) => {
    return (
        <div className="">
            <h1>Список сотрудников</h1>
            <div className="employee-grid employee-grid-header">
                <div>Фамилия Имя</div>
                <div>Телефон</div>
                {/* <div>Телефон</div> */}
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
                            <button className='general-btns delete-btn' onClick={() => onDelete(employee.id)}>Удалить</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default EmployeeList;
