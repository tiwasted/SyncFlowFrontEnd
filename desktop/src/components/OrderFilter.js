import React, { useState } from 'react';

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(filters);
    };

    return (
        <div>
            <form className="order-filter-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="status">Статус:</label>
                    <select
                            id="status"
                            name="status"
                            value={filters.status}
                            onChange={handleChange}
                            className="form-control"
                            >
                            <option value="">Все</option>
                            <option value="completed">Выполнено</option>
                            <option value="cancelled">Отменено</option>
                    </select>
                    <input type="date" name="order_date" placeholder="Дата заказа" value={filters.order_date} onChange={handleChange} className="form-control" />
                    <input type="time" name="order_time" placeholder="Время заказа" value={filters.order_time} onChange={handleChange} className="form-control" />
                    <input type="text" name="company_name" placeholder="Компания" value={filters.company_name} onChange={handleChange} className="form-control" />
                    <input type="text" name="address" placeholder="Адрес" value={filters.address} onChange={handleChange} className="form-control" />
                    <input type="text" name="phone_number_client" placeholder="Номер телефона" value={filters.phone_number_client} onChange={handleChange} className="form-control" />
                    <input type="text" name="name_client" placeholder="Имя клиента" value={filters.name_client} onChange={handleChange} className="form-control" />
                    <input type="number" name="price" placeholder="Цена" value={filters.price} onChange={handleChange} className="form-control" />
            </div>
                <button type="submit" className="btn btn-primary">Поиск</button>
            </form>
            
        </div>
    );
};

export default OrderFilterForm;
