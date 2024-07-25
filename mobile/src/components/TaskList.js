import React, { useRef, useEffect } from 'react';
import Task from './Task';
import '../styles/TaskList.css'

const TaskList = ({ tasks, onComplete, onCancel }) => {
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
          <Task key={task.id} task={task} onComplete={onComplete} onCancel={onCancel} />
        ))
      ) : (
        <p>Нет задач для отображения</p>
      )}
    </div>
  );
};

export default TaskList;

// const TaskList = ({ tasks, onComplete, onCancel }) => {
//   const [selectedTask, setSelectedTask] = useState(null);
//   const [isReportModalOpen, setIsReportModalOpen] = useState(false);
//   const [actionType, setActionType] = useState(null);

//   const handleAction = (task, action) => {
//     setSelectedTask(task);
//     setActionType(action);
//     setIsReportModalOpen(true);
//   };

//   const handleCloseReportForm = () => {
//     setSelectedTask(null);
//     setIsReportModalOpen(false);
//   };

//   const handleSubmitReport = async (task, content) => {
//     try {
//       const endpoint = task.order_type === 'B2B' ? 'b2b-orders' : 'b2c-orders';
//       const action = actionType === 'complete' ? 'complete' : 'cancel';
//       await axios.post(`/orders/${endpoint}/${task.id}/${action}_order/`, { report: content });
//       setTasks((prevTasks) => prevTasks.map((t) => (t.id === task.id ? { ...t, status: actionType === 'complete' ? 'completed' : 'canceled' } : t)));
//     } catch (error) {
//       console.error('Ошибка при отправке отчета:', error);
//     }
//   };

//   return (
//     <div>
//       <h3>Список задач</h3>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             <span>{task.order_name}</span>
//             <button onClick={() => handleAction(task, 'complete')}>Завершить</button>
//             <button onClick={() => handleAction(task, 'cancel')}>Отменить</button>
//           </li>
//         ))}
//       </ul>
//       {selectedTask && (
//         <ReportForm
//           isOpen={isReportModalOpen}
//           onRequestClose={handleCloseReportForm}
//           task={selectedTask}
//           onSubmit={handleSubmitReport}
//         />
//       )}
//     </div>
//   );
// };

// export default TaskList;
