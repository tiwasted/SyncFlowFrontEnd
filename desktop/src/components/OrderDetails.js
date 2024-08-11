import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/tokenService';

const OrderDetails = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/order-details/${orderId}/`);
                setOrder(response.data);
            } catch (err) {
                setError('Ошибка загрузки данных заказа');
                console.error('Error fetching order details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    if (!order) return <p>Заказ не найден</p>;

    return (
        <div className="order-details">
            <h1>Детали заказа</h1>
            <p><strong>Наименование:</strong> {order.order_name}</p>
            <p><strong>Статус:</strong> {order.status}</p>
            <p><strong>Дата заказа:</strong> {order.order_date}</p>
            <p><strong>Время заказа:</strong> {order.order_time}</p>
            <p><strong>Цена:</strong> {order.price}</p>
            <p><strong>Адрес:</strong> {order.address}</p>
            <p><strong>Отчет:</strong> {order.report || 'Нет отчета'}</p>
            <p><strong>Сотрудник:</strong> {order.assigned_employee_name || 'Не назначен'}</p>
            {order.assigned_employee_name && (
                <div>
                    <p><strong>Телефон:</strong> {order.assigned_employee_phone}</p>
                </div>
            )}
        </div>
    );
};

export default OrderDetails;
