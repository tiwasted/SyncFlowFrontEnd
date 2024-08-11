import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/tokenService';
import OrderFilterForm from '../components/OrderFilter';

const STATUS_TRANSLATION = {
    completed: 'Выполнен',
    cancelled: 'Отменен',
};

const PAGE_SIZE = 6;

const HistoryOfOrders = () => {
    const { orderType } = useParams();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

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
        setCurrentPage(1); // Reset to first page on filter change
        fetchOrders(filters);
    };

    useEffect(() => {
        if (Object.keys(filters).length) {
            fetchOrders(filters);
        }
    }, [filters, fetchOrders]);

    // Calculate pagination data
    const totalPages = Math.ceil(orders.length / PAGE_SIZE);
    const currentOrders = orders.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    const handlePageChange = (direction) => {
        setCurrentPage(prevPage => {
            if (direction === 'next' && prevPage < totalPages) return prevPage + 1;
            if (direction === 'prev' && prevPage > 1) return prevPage - 1;
            return prevPage;
        });
    };

    const handleOrderClick = (orderId) => {
        navigate(`/order/${orderId}`);
    };

    return (
        <div className="order-history">
            <h1 className="order-history__title">
                {orderType === 'b2b' ? 'История B2B заказов' : 'История заказов'}
            </h1>
            <OrderFilterForm onSubmit={handleFilterSubmit} />
            {loading && <p className="order-history__loading">Загрузка...</p>}
            {error && <p className="order-history__error">{error}</p>}
            <ul className="order-history__list">
                {currentOrders.map(order => (
                    <li 
                        key={order.id} 
                        className="order-history__item"
                        onClick={() => handleOrderClick(order.id)}
                    >
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
                        </div>
                    </li>
                ))}
            </ul>
            <div className="order-history__pagination">
                <button 
                    onClick={() => handlePageChange('prev')} 
                    disabled={currentPage === 1}
                >
                    Назад
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button 
                    onClick={() => handlePageChange('next')} 
                    disabled={currentPage === totalPages}
                >
                    Вперед
                </button>
            </div>
        </div>
    );
};

export default HistoryOfOrders;
