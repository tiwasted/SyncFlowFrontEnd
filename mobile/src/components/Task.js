// import React from 'react';
// import axios from 'axios';
// import '../styles/Task.css';

// const Task = ({ task, onUpdate }) => {
//     const getOrderUrl = (action) => {
//         const baseUrl = task.order_type === 'B2B' ? 'http://localhost:8000/orders/b2b-orders' : 'http://localhost:8000/orders/b2c-orders';
//         return `${baseUrl}/${task.id}/${action}/`;
//     };
    
//     const handleCompleteOrder = async () => {
//         try {
//         const response = await axios.post(getOrderUrl('complete_order'));
//         onUpdate(response.data);
//     } catch (error) {
//         console.error('Ошибка при завершении заказа:', error);
//         }
//     };
    
//     const handleCancelOrder = async () => {
//         try {
//         const response = await axios.post(getOrderUrl('cancel_order'));
//         onUpdate(response.data);
//         } catch (error) {
//         console.error('Ошибка при отмене заказа:', error);
//         }
//     };
    
    
//     return (
//         <div className="task">
//             <p><strong>Тип заказа:</strong> {task.order_type}</p>
//             <p><strong>Компания:</strong> {task.company_name}</p>
//             <p><strong>Дата:</strong> {task.order_date}</p>
//             <p><strong>Время:</strong> {task.order_time}</p>
//             <p><strong>Адрес:</strong> {task.address}</p>
//             <p><strong>Телефон клиента:</strong> {task.phone_number_client}</p>
//             <p><strong>Имя клиента:</strong> {task.name_client}</p>
//             <p><strong>Цена:</strong> {task.price}</p>
//             <p><strong>Описание:</strong> {task.description}</p>
//             <p><strong>Статус:</strong> {task.status}</p>
//             <div className='task-buttons'>
//                 {task.status !== 'completed' && task.status !== 'canceled' && (
//                     <>
//                         <button onClick={handleCompleteOrder}>Завершить</button>
//                         <button onClick={handleCancelOrder}>Отменить</button>
//                     </>
//                 )}
//             </div>

//         </div>
//     );
// };

// export default Task;

import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import api from '../services/authToken';
import '../styles/Task.css';

Modal.setAppElement('#root');

const ReportForm = ({ isOpen, onRequestClose, task, onSubmit }) => {
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onSubmit(task, content);
        setContent('');
        onRequestClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h3>Отчет для {task?.order_name}</h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Отправить отчет</button>
            </form>
            <button onClick={onRequestClose}>Отмена</button>
        </Modal>
    );
};

const Task = ({ task, onUpdate }) => {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [actionType, setActionType] = useState(null);

    const getOrderUrl = (action) => {
        const baseUrl = task.order_type === 'B2B' ? 'http://localhost:8000/orders/b2b-orders' : 'http://localhost:8000/orders/b2c-orders';
        return `${baseUrl}/${task.id}/${action}/`;
    };

    const handleCompleteOrder = async (report) => {
        try {
            const token = localStorage.getItem('jwt_token');
            const response = await api.post(getOrderUrl('complete_order'), { report });
            onUpdate(response.data);
        } catch (error) {
            console.error('Ошибка при завершении заказа:', error);
        }
    };

    const handleCancelOrder = async (report) => {
        try {
            const response = await axios.post(getOrderUrl('cancel_order'), { report });
            onUpdate(response.data);
        } catch (error) {
            console.error('Ошибка при отмене заказа:', error);
        }
    };

    const handleAction = (action) => {
        setActionType(action);
        setIsReportModalOpen(true);
    };

    const handleSubmitReport = (task, content) => {
        if (actionType === 'complete') {
            handleCompleteOrder(content);
        } else if (actionType === 'cancel') {
            handleCancelOrder(content);
        }
    };

    return (
        <div className="task">
            <p><strong>Тип заказа:</strong> {task.order_type}</p>
            <p><strong>Компания:</strong> {task.company_name}</p>
            <p><strong>Дата:</strong> {task.order_date}</p>
            <p><strong>Время:</strong> {task.order_time}</p>
            <p><strong>Адрес:</strong> {task.address}</p>
            <p><strong>Телефон клиента:</strong> {task.phone_number_client}</p>
            <p><strong>Имя клиента:</strong> {task.name_client}</p>
            <p><strong>Цена:</strong> {task.price}</p>
            <p><strong>Описание:</strong> {task.description}</p>
            <p><strong>Статус:</strong> {task.status}</p>
            <div className='task-buttons'>
                {task.status !== 'completed' && task.status !== 'canceled' && (
                    <>
                        <button onClick={() => handleAction('complete')}>Завершить</button>
                        <button onClick={() => handleAction('cancel')}>Отменить</button>
                    </>
                )}
            </div>
            {isReportModalOpen && (
                <ReportForm
                    isOpen={isReportModalOpen}
                    onRequestClose={() => setIsReportModalOpen(false)}
                    task={task}
                    onSubmit={handleSubmitReport}
                />
            )}
        </div>
    );
};

export default Task;

