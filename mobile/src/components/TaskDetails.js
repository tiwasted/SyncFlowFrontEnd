import React from "react";
import "../styles/Task.css";

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(":");
  return `${hours}:${minutes}`;
}

const formatPrice = (priceString) => {
  return parseInt(priceString, 10);
};

const TaskDetails = ({ task }) => (
  <ul className="task-list">
    <p>
      <strong>Наименование заказа:</strong>
      {task.order_name}
    </p>
    <p>
      <strong>Дата:</strong> {formatDate(task.order_date)}
    </p>
    <p>
      <strong>Время:</strong> {formatTime(task.order_time)}
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
      <strong>Цена:</strong> {formatPrice(task.price)}
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
