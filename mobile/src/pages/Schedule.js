import React, { useState } from 'react';
import Calendar from '../components/Calendar';
import TaskList from '../components/TaskList';
import '../styles/Schedule.css'

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]); // Задачи можно получать из API или локального хранилища

  return (
    <div className="schedule-container">
      <h2>Расписание</h2>
        <Calendar date={date} onChange={setDate} />
        <TaskList tasks={tasks} />  
    </div>
  );
};

export default Schedule;
