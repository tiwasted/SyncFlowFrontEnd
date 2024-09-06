import React from "react";
import "../styles/Task.css";

const TaskDetails = ({ task }) => (
  <ul className="task-list">
    <p>
      <strong>Наименование заказа:</strong>
      {task.order_name}
    </p>
    <p>
      <strong>Дата:</strong> {task.order_date}
    </p>
    <p>
      <strong>Время:</strong> {task.order_time}
    </p>
    <p>
      <strong>Адрес:</strong> {task.address}
    </p>
    <p>
      <strong>Телефон клиента:</strong> {task.phone_number_client}
    </p>
    <p>
      <strong>Имя клиента:</strong> {task.name_client}
    </p>
    <p>
      <strong>Цена:</strong> {task.price}
    </p>
    <p>
      <b>Описание:</b> {task.description}
    </p>
    <p>
      <strong>Статус:</strong>{" "}
      {task.status === "in_waiting" ? "В ожидании" : task.status}
    </p>
  </ul>
);

export default TaskDetails;
