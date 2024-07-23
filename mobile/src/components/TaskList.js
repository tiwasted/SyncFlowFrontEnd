import React from 'react';

const Task = ({ task }) => {
  return (
    <div className="task">
      <p>{task.title}</p>
    </div>
  );
};

const TaskList = ({ tasks }) => {
  return (
    <div className="tasks">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
