import React, { useRef, useEffect } from 'react';
import Task from './Task';

const TaskList = ({ tasks }) => {
  const taskListRef = useRef(null);

  useEffect(() => {
    if (taskListRef.current) {
      taskListRef.current.scrollTop = taskListRef.current.scrollHeight;
    }
  }, [tasks]); // Прокрутка срабатывает при изменении задач

  return (
    <div className="tasks" ref={taskListRef}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))
      ) : (
        <p>Нет задач для отображения</p>
      )}
    </div>
  );
};

export default TaskList;
