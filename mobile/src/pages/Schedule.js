import React, { useState, useEffect } from 'react';
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
  // const [employeeId] = useState(1); // Пример ID сотрудника, можно заменить

  useEffect(() => {
    console.log('Дата у клиента:', date);
    const fetchTasks = async () => {
      try {
        // Форматируем дату в строку YYYY-MM-DD
        const selectedDate = date.toISOString().split('T')[0];
        
        console.log('Отправляемая дата:', selectedDate); // Для отладки

        const token = localStorage.getItem('jwt_token');

        const response = await api.get(`/employees/assigned-orders/`, {
          params: { date: selectedDate },
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setTasks(response.data);
      } catch (error) {
        console.error('Ошибка при получении задач:', error);
      }
    };

    fetchTasks();
  }, [date]);

  return (
    <div className="schedule-container">
      <h2>Расписание</h2>
      <Calendar value={date} onChange={setDate} />
      <TaskList tasks={tasks} />
    </div>
  );
};

export default Schedule;
