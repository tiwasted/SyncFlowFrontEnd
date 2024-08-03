import React, { useRef, useEffect } from 'react';
import Task from './Task';
import '../styles/TaskList.css'

const TaskList = ({ tasks, onComplete, onCancel }) => {
  const taskListRef = useRef(null);

  useEffect(() => {
    // if (taskListRef.current) {
    //   taskListRef.current.scrollTop = taskListRef.current.scrollHeight;
    // }
  }, [tasks]); // Прокрутка срабатывает при изменении задач

  return (
    <div className="tasks" ref={taskListRef}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task key={task.id} task={task} onComplete={onComplete} onCancel={onCancel} />
        ))
      ) : (
        <p>Нет задач для отображения</p>
      )}
    </div>
  );
};

export default TaskList;

