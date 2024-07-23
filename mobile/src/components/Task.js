import React from 'react';
import '../styles/Task.css';

const Task = ({ task }) => {
    return (
        <div className="task">
        <p><strong>Тип заказа:</strong> {task.order_type}</p>
        <p><strong>Компания:</strong> {task.company_name}</p>
        <p><strong>Дата:</strong> {task.order_date}</p>
        <p><strong>Время:</strong> {task.order_time}</p>
        <p><strong>Адрес:</strong> {task.address}</p>
        <p><strong>Телефон клиента:</strong> {task.phone_number_client}</p>
        <p><strong>Имя клиента:</strong> {task.name_client}</p>
        <p><strong>Цена:</strong> {task.price}</p>
        <p><strong>Описание:</strong> {task.description}</p>
        <p><strong>Статус:</strong> {task.status}</p>
        </div>
    );
};

export default Task;
