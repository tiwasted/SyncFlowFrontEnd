// import React from "react";

// const EmployeeList = ({ employees, onEdit, onDelete }) => {
//     return (
//         <div className="">
//             <h1>Список сотрудников</h1>
//             <ul>
//                 {employees.map(employee => (
//                 <div className="content-item" key={employee.id}>
//                     <p>Имя: {employee.first_name}</p> <br />
//                     <p>Фамилия: {employee.last_name}</p> <br />
//                     <p>Телефон: {employee.phone}</p> <br />
//                     <button className='general-btns' onClick={() => {
//                     onEdit(employee.id)}}>Редактировать</button>
//                     <button className='general-btns delete-btn' onClick={() => {
//                     onDelete(employee.id)}}>Удалить</button>
//                 </div>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default EmployeeList;


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
            {/* <div>
                {employees.map(employee => (
                    <div key={employee.id} style={{ marginTop: '10px' }}>
                        <button className='general-btns' onClick={() => onEdit(employee.id)}>Редактировать</button>
                        <button className='general-btns delete-btn' onClick={() => onDelete(employee.id)}>Удалить</button>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default EmployeeList;
