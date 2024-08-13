import React, { useState } from 'react';
import Modal from 'react-modal';
import api from '../services/tokenService';
import '../styles/Task.css';
import '../styles/Buttons.css';
import '../styles/ReportForm.css';


Modal.setAppElement('#root');

const Task = ({ task, onUpdate }) => {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [content, setContent] = useState('');
    const [photos, setPhotos] = useState([]);

    const getOrderUrl = (action) => {
        const baseUrl = task.order_type === 'B2B' ? '/orders/b2b-orders' : '/orders/b2c-orders';
        return `${baseUrl}/${task.id}/${action}/`;
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        setPhotos(files);
    };

    const handleCompleteOrder = async (formData) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('Токен не найден');
                return;
            }
            const response = await api.post(getOrderUrl('complete_order'), formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpdate(response.data);
        } catch (error) {
            console.error('Ошибка при завершении заказа:', error);
        }
    };

    const handleCancelOrder = async (formData) => {
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                console.error('Токен не найден');
                return;
            }
            const response = await api.post(getOrderUrl('cancel_order'), formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            onUpdate(response.data);
        } catch (error) {
            console.error('Ошибка при отмене заказа:', error);
        }
    };

    const handleDeleteImage = async (imageId) => {
        try {
            await api.delete(`/employees/orders/images/${imageId}/delete/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                },
            });

            setPhotos(photos.filter((_, index) => index !== imageId));
        } catch (error) {
            console.error('Ошибка при удалении изображения:', error);
        }
    };

    const handleAction = (action) => {
        setActionType(action);
        setIsReportModalOpen(true);
    };

    const handleSubmitReport = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('content', content);
        
        // Загрузка изображений на сервер
        for (const photo of photos) {
            const imageFormData = new FormData();
            imageFormData.append('image', photo);

            await api.post(`/employees/orders/${task.id}/add-image/`, imageFormData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
        }

        if (actionType === 'complete') {
            await handleCompleteOrder(formData);
        } else if (actionType === 'cancel') {
            await handleCancelOrder(formData);
        }

        setContent('');
        setPhotos([]);
        setIsReportModalOpen(false);
        window.location.reload();
    };

    return (
        <div className="task">
            <ul className='task-list'>
                <p><strong>Тип заказа:</strong> {task.order_type}</p>
                <p><strong>Наименование заказа:</strong>{task.order_name}</p>
                <p><strong>Дата:</strong> {task.order_date}</p>
                <p><strong>Время:</strong> {task.order_time}</p>
                <p><strong>Адрес:</strong> {task.address}</p>
                <p><strong>Телефон клиента:</strong> {task.phone_number_client}</p>
                <p><strong>Имя клиента:</strong> {task.name_client}</p>
                <p><strong>Цена:</strong> {task.price}</p>
                <p><b>Описание:</b> {task.description}</p>
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
                    <Modal 
                        isOpen={isReportModalOpen} 
                        onRequestClose={() => setIsReportModalOpen(false)}
                        className="custom-modal"
                        overlayClassName="custom-overlay"
                    >
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3>Отчет для {task?.order_name}</h3>
                                <span className="close" onClick={() => setIsReportModalOpen(false)}>&times;</span>
                            </div>
                            <form onSubmit={handleSubmitReport}>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                />
                                <div className="photo-upload">
                                    <label htmlFor="photo-input" className="photo-upload-label">
                                        Загрузить фото
                                    </label>
                                    <input
                                        id="photo-input"
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                        className="photo-upload-input"
                                    />
                                    <div className="photo-preview">
                                        {photos.map((photo, index) => (
                                            <div key={index} className="photo-preview-item">
                                                <img 
                                                    src={URL.createObjectURL(photo)} 
                                                    alt={`Изображение ${index + 1}`} 
                                                    className="photo-thumbnail"
                                                />
                                                <button type="button" onClick={() => handleDeleteImage(index)}>Удалить</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className='report-button' type="submit">Отправить отчёт</button>
                            </form>
                            <button className="cancel-btn" onClick={() => setIsReportModalOpen(false)}>Отмена</button>
                        </div>
                    </Modal>
                )}
            </ul>
        </div>
    );
};

export default Task;
