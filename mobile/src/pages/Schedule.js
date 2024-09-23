import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/tokenService";
import Calendar from "../components/Calendar";
import TaskList from "../components/TaskList";
import "../styles/Schedule.css";

const Schedule = () => {
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = useCallback(async () => {
    try {
      const selectedDate = date.toISOString().split("T")[0];
      const token = localStorage.getItem("jwt_token");
      const response = await api.get(`/employees/assigned-orders/`, {
        params: { date: selectedDate },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login");
      } else {
        // console.error('Ошибка при получении задач:', error);
      }
    }
  }, [date, navigate]);

  useEffect(() => {
    fetchTasks();
  }, [date, navigate, fetchTasks]);

  const handleComplete = async (task) => {
    try {
      const endpoint = task.order_type === "B2B" ? "order-status" : "order-status";
      await api.post(`/orders/${endpoint}/${task.id}/complete_order/`);
      fetchTasks(); // Обновляем список задач после завершения
    } catch (error) {
      // console.error('Ошибка при завершении задачи:', error);
    }
  };

  const handleCancel = async (task) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, status: "canceled" } : t
        )
      );
    } catch (error) {
      // console.error('Ошибка при отмене задачи:', error);
    }
  };

  return (
    <div className="schedule-container">
      <h2>Расписание</h2>
      <Calendar value={date} onChange={setDate} />
      <TaskList
        tasks={tasks}
        onComplete={handleComplete}
        onCancel={handleCancel}
        fetchTasks={fetchTasks}
      />
    </div>
  );
};

export default Schedule;
