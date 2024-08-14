import React from 'react';
import '../styles/Buttons.css';

const TaskActions = ({ task, onAction }) => (
    <div className='task-buttons'>
        {task.status !== 'completed' && task.status !== 'canceled' && (
            <>
                <button className='delete-btns' onClick={() => onAction('cancel')}>Отменить</button>
                <button className='general-btns' onClick={() => onAction('complete')}>Завершить</button>
            </>
        )}
    </div>
);

export default TaskActions;
