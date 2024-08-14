import React, { useState } from 'react';
import TaskDetails from './TaskDetails';
import TaskActions from './TaskActions';
import ReportModal from './ReportModal';
import api from '../services/tokenService';
import '../styles/Task.css';

const Task = ({ task, onUpdate }) => {
    const [isReportModalOpen, setIsReportModalOpen] = useState(false);
    const [actionType, setActionType] = useState(null);
    const [report, setContent] = useState('');
    const [photos, setPhotos] = useState([]);

    const getOrderUrl = (action) => {
        const baseUrl = task.order_type === 'B2B' ? '/orders/b2b-orders' : '/orders/b2c-orders';
        return `${baseUrl}/${task.id}/${action}/`;
    };

    const handleAction = (action) => {
        setActionType(action);
        setIsReportModalOpen(true);
    };

    const handleFileChange = (files) => {
        setPhotos(files);
    };

    const handleCompleteOrder = async (formData) => {
        try {
            const token = localStorage.getItem('access_token');
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

    const handleSubmitReport = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('report', report);

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
            <TaskDetails task={task} />
            <TaskActions task={task} onAction={handleAction} />
            <ReportModal
                isOpen={isReportModalOpen}
                task={task}
                content={report}
                photos={photos}
                setContent={setContent}
                handleFileChange={handleFileChange}
                handleSubmitReport={handleSubmitReport}
                handleClose={() => setIsReportModalOpen(false)}
                handleDeleteImage={(index) => setPhotos(photos.filter((_, i) => i !== index))}
            />
        </div>
    );
};

export default Task;
