import React, { useState, useRef, useEffect } from 'react';

const OrderFilterForm = ({ onSubmit }) => {
    const [filters, setFilters] = useState({
        status: '',
        order_date: '',
        order_time: '',
        company_name: '',
        address: '',
        phone_number_client: '',
        name_client: '',
        price: ''
    });

    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSelectClick = () => {
        setIsOpen(!isOpen);
    };

    const handleOutsideClick = (e) => {
        if (selectRef.current && !selectRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(filters);
    };

    return (
        <div>
            <form className="order-filter-form" onSubmit={handleSubmit}>
                <div className="order-filter-form-group">
                    <label htmlFor="status">Статус:</label>
                    <div
                        className={`form-control-select-wrapper ${isOpen ? 'active' : ''}`}
                        ref={selectRef}
                    >
                        <select
                            id="status"
                            name="status"
                            value={filters.status}
                            onChange={handleChange}
                            onClick={handleSelectClick}
                            className="form-control form-control-select"
                        >
                            <option value="">Все</option>
                            <option value="completed">Выполнено</option>
                            <option value="cancelled">Отменено</option>
                        </select>
                        <span className={`form-control-select-icon ${isOpen ? '' : 'default'}`} />
                    </div>
                    <input
                        type="date"
                        name="order_date"
                        placeholder="Дата заказа"
                        value={filters.order_date}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <input
                        type="time"
                        name="order_time"
                        placeholder="Время заказа"
                        value={filters.order_time}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="company_name"
                        placeholder="Компания"
                        value={filters.company_name}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Адрес"
                        value={filters.address}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="phone_number_client"
                        placeholder="Номер телефона"
                        value={filters.phone_number_client}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <input
                        type="text"
                        name="name_client"
                        placeholder="Имя клиента"
                        value={filters.name_client}
                        onChange={handleChange}
                        className="form-control"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Цена"
                        value={filters.price}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="order-filter-btn">Поиск</button>
            </form>
        </div>
    );
};

export default OrderFilterForm;
