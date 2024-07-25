import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../services/authToken';
import Calendar from '../components/Calendar';
import TaskList from '../components/TaskList';
import '../styles/Schedule.css';

const Schedule = () => {
  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  });
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // console.log('Дата у клиента:', date);
    const fetchTasks = async () => {
      try {
        // Форматируем дату в строку YYYY-MM-DD
        const selectedDate = date.toISOString().split('T')[0];
        
        // console.log('Отправляемая дата:', selectedDate); // Для отладки

        const token = localStorage.getItem('jwt_token');

        const response = await api.get(`/employees/assigned-orders/`, {
          params: { date: selectedDate },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        // if (error.response && error.response.status === 401) {
          // navigate('/login');
        // } else {
          console.error('Ошибка при получении задач:', error);
        // }
      }
    };

    fetchTasks();
  }, [date]);

  const handleComplete = async (task) => {
    try {
      const endpoint = task.order_type === 'B2B' ? 'b2b-orders' : 'b2c-orders';
      await axios.post(`/orders/${endpoint}/${task.id}/complete_order/`);
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? { ...t, status: 'completed' } : t)));
    } catch (error) {
      console.error('Ошибка при завершении задачи:', error);
    }
  };

  const handleCancel = async (task) => {
    try {
      const endpoint = task.order_type === 'B2B' ? 'b2b-orders' : 'b2c-orders';
      await axios.post(`/orders/${endpoint}/${task.id}/cancel_order/`);
      setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? { ...t, status: 'canceled' } : t)));
    } catch (error) {
      console.error('Ошибка при отмене задачи:', error);
    }
  };

  return (
    <div className="schedule-container">
      <h2>Расписание</h2>
      <Calendar value={date} onChange={setDate} />
      <TaskList tasks={tasks} onComplete={handleComplete} onCancel={handleCancel} />
    </div>
  );
};

export default Schedule;
