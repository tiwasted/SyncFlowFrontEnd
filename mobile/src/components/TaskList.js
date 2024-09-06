import React, { useRef } from "react";
import Task from "./Task";
import "../styles/TaskList.css";

const TaskList = ({ tasks, onComplete, onCancel, fetchTasks }) => {
  const taskListRef = useRef(null);

  return (
    <div className="tasks" ref={taskListRef}>
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onComplete={onComplete}
            onCancel={onCancel}
            fetchTasks={fetchTasks}
          />
        ))
      ) : (
        <p>Заказы отсутствуют</p>
      )}
    </div>
  );
};

export default TaskList;
