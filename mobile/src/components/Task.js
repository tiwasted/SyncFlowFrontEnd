import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import api from '../services/tokenService';
import '../styles/Task.css';
import '../styles/Buttons.css';
import '../styles/ReportForm.css';

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
        <Modal 
        isOpen={isOpen} 
        onRequestClose={onRequestClose}
        className="custom-modal"
        overlayClassName="custom-overlay"
        >
            <div className="modal-content">
                <div className="modal-header">
                    <h3>Отчет для {task?.order_name}</h3>
                    <span className="close" onClick={onRequestClose}>&times;</span>
                </div>
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    />
                    <button className='report-button' type="submit">Отправить отчет</button>
                </form>
                <button className="cancel-btn" onClick={onRequestClose}>Отмена</button>
            </div>
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
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('Токен не найден');
                return;
            }
            const response = await api.post(getOrderUrl('complete_order'), { report });
            onUpdate(response.data);
        } catch (error) {
            console.error('Ошибка при завершении заказа:', error);
        }
    };

    const handleCancelOrder = async (report) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('Токен не найден');
                return;
            }
            const response = await axios.post(getOrderUrl('cancel_order'), { report }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
            {/* <p><strong>Компания:</strong> {task.company_name}</p> */}
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
                        <button className='delete-btns' onClick={() => handleAction('cancel')}>Отменить</button>
                        <button className='general-btns' onClick={() => handleAction('complete')}>Завершить</button>
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
