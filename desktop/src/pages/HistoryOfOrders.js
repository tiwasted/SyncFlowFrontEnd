import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/tokenService';
import OrderFilterForm from '../components/OrderFilter';

const STATUS_TRANSLATION = {
    completed: 'Выполнен',
    cancelled: 'Отменен',
};

const HistoryOfOrders = () => {
    const { orderType } = useParams();
    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] =useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);

    const fetchOrders = useCallback(async (url = null, filters = {}) => {
        setLoading(true);
        setError(null);
        try {
            const finalUrl = url || (orderType === 'b2b' ? '/order-history/b2b-history/' : '/order-history/b2c-history/');
            const response = await api.get(finalUrl, {
                params: !url ? {
                    ...filters,
                    page: currentPage
                } : {},
            });

            setOrders(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 10));
            setNextPage(response.data.next);
            setPrevPage(response.data.previous);
        } catch (err) {
            setError('Ошибка загрузки заказов');
            console.error('Error fetching orders:', err);
        } finally {
            setLoading(false);
        }
    }, [orderType, currentPage]);

    const handleFilterSubmit = (filters) => {
        setFilters(filters);
        setCurrentPage(1);
        fetchOrders(null, filters);
    };

    useEffect(() => {
        if (Object.keys(filters).length > 0) {
            fetchOrders();
        }
    }, [currentPage, filters, fetchOrders]);

    const handlePageChange = (direction) => {
        if (direction === 'next' && nextPage) {
            fetchOrders(nextPage, filters);  // Делаем запрос на следующий URL
        } else if (direction === 'prev' && prevPage) {
            fetchOrders(prevPage, filters);  // Делаем запрос на предыдущий URL
        }
    };

    const handleImageClick = (orderId) => {
        const imageUrl = `/b2c/orders/${orderId}/image/`; // Замените на актуальный эндпоинт для получения изображения
        window.open(imageUrl, '_blank');
    };

    // b2c/orders/${orderId}/image/

    return (
        <div className="order-history">
            <h1 className="order-history__title">
                {orderType === 'b2b' ? 'История B2B заказов' : 'История заказов'}
            </h1>
            <OrderFilterForm onSubmit={handleFilterSubmit} />
            {loading && <p className="order-history__loading">Загрузка...</p>}
            {error && <p className="order-history__error">{error}</p>}
            {orders.length === 0 && !loading && <p>Заказы не найдены</p>}
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
                            <p>Имя клиента: {order.name_client}</p>
                            <p>Номер клиента: {order.phone_number_client}</p>
                            <p>Адрес: {order.address}</p>
                            <p>Описание заказа: {order.description}</p>
                            <p>Сотрудник: {order.assigned_employee_name || 'Не назначен'}</p>
                            {order.assigned_employee_name && (
                                <div>
                                    <p>Телефон: {order.assigned_employee_phone}</p>
                                </div>
                            )}
                            <p>Отчет: {order.report || 'Нет отчета'}</p>
                            <p>Цена: {order.price}</p>
                            {/* Новая кнопка для открытия изображения */}
                            <button
                                onClick={() => handleImageClick(order.id)}
                                className="order-history__image-button"
                            >
                                Показать изображение
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="order-history__pagination">
                <button 
                    onClick={() => handlePageChange('prev')} 
                    disabled={!prevPage}
                >
                    Назад
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button 
                    onClick={() => handlePageChange('next')} 
                    disabled={!nextPage}
                >
                    Вперед
                </button>
            </div>
        </div>
    );
};

export default HistoryOfOrders;
