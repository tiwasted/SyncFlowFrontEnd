import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/tokenService';
import OrderFilterForm from '../components/OrderFilter';

const STATUS_TRANSLATION = {
    completed: 'Выполнен',
    cancelled: 'Отменен', // Обновлено для соответствия данным с сервера
};

const HistoryOfOrders = () => {
    const { orderType } = useParams();
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchOrders = useCallback(async (filters) => {
        setLoading(true);
        setError(null);
        try {
            const url = orderType === 'b2b' ? '/order-history/b2b-history/' : '/order-history/b2c-history/';
            const response = await api.get(url, { params: filters });
            console.log('Fetched orders:', response.data);
            setOrders(response.data);
        } catch (err) {
            setError('Ошибка загрузки заказов');
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    }, [orderType]);

    const handleFilterSubmit = (filters) => {
        setFilters(filters);
        fetchOrders(filters);
    };

    useEffect(() => {
        if (Object.keys(filters).length) {
            fetchOrders(filters);
        }
    }, [filters, fetchOrders]);

    return (
        <div className="order-history">
            <h1 className="order-history__title">
                {orderType === 'b2b' ? 'История B2B заказов' : 'История заказов'}
            </h1>
            <OrderFilterForm onSubmit={handleFilterSubmit} />
            {loading && <p className="order-history__loading">Загрузка...</p>}
            {error && <p className="order-history__error">{error}</p>}
            <ul className="order-history__list">
                {orders.map(order => (
                    <li key={order.id} className="order-history__item">
                        <div className="order-history__item-header">
                            <h2 className="order-history__item-title">Наименование: {order.order_name}</h2>
                            <span className="order-history__item-status">
                                Статус: {STATUS_TRANSLATION[order.status] || order.status}
                            </span>
                        </div>
                        <div className="order-history__item-body">
                            <p>Дата заказа: {order.order_date}</p>
                            <p>Время заказа: {order.order_time}</p>
                            <p>Цена: {order.price}</p>
                            <p>Адрес: {order.address}</p>
                            <p>Отчет: {order.report || 'Нет отчета'}</p>
                            <p>Сотрудник: {order.assigned_employee_name || 'Не назначен'}</p>
                            {order.assigned_employee_name && (
                                <div>
                                    <p>Телефон: {order.assigned_employee_phone}</p>
                                </div>
                            )}
                            
                            {/* {order.assigned_employee && ( */}
                                {/* // <div> */}
                                    {/* <p>Сотрудник: {order.assigned_employee.first_name} {order.assigned_employee.last_name}</p> */}
                                    {/* <p> <b>Сотрудник: </b> {order.assigned_employee_name}</p> */}
                                    {/* <p>Телефон: {order.assigned_employee_phone}</p> */}
                                {/* </div> */}
                            {/* // )} */}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HistoryOfOrders;
