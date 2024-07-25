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
        <form onSubmit={handleSubmit}>
            <input type="text" name="status" placeholder="Status" value={filters.status} onChange={handleChange} />
            <input type="date" name="order_date" placeholder="Order Date" value={filters.order_date} onChange={handleChange} />
            <input type="time" name="order_time" placeholder="Order Time" value={filters.order_time} onChange={handleChange} />
            <input type="text" name="company_name" placeholder="Company Name" value={filters.company_name} onChange={handleChange} />
            <input type="text" name="address" placeholder="Address" value={filters.address} onChange={handleChange} />
            <input type="text" name="phone_number_client" placeholder="Phone Number" value={filters.phone_number_client} onChange={handleChange} />
            <input type="text" name="name_client" placeholder="Client Name" value={filters.name_client} onChange={handleChange} />
            <input type="number" name="price" placeholder="Price" value={filters.price} onChange={handleChange} />
            <button type="submit">Search</button>
        </form>
    );
};

export default OrderFilterForm;
