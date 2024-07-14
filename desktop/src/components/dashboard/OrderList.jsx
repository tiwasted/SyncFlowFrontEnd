import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import axios from 'axios';
import { setAuthHeader } from '../../services/auth';

const OrderList = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Вызываем функцию для установки заголовка с JWT токеном
        setAuthHeader();

        axios.get('http://127.0.0.1:8000/orders/employer/')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    }, []);

    // Функция для создания нового заказа
    const handleCreateOrder = () => {
        axios.post('http://127.0.0.1:8000/orders/create/', {
            // Данные нового заказа
        })
        .then(response => {
            // Обработка успешного создания заказа
            console.log('Order created successfully:', response.data);
            // Обновление списка заказов, если это нужно
            // setOrders([...orders, response.data]);
        })
        .catch(error => {
            console.error('Error creating order:', error);
        });
    };

    return (
        <div className="relative flex flex-col w-full text-gray-700 bg-white shadow-md rounded-xl bg-clip-border">
            <table className="w-full text-left table-auto min-w-max">
                <thead>
                    <tr>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Имя
                            </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Время
                            </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Дата
                            </p>
                        </th>
                        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
                            <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                                Адрес
                            </p>
                        </th>
                        <td className="p-4 border-b border-blue-gray-50">
                            <button className="px-8 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                                Создать заказ
                            </button>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.key}>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {order.order_name}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {order.order_time}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {order.order_date}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                                    {order.address}
                                </p>
                            </td>
                            <td className="p-4 border-b border-blue-gray-50">
                                <Button variant="text" className="rounded-full">
                                    Edit
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderList;
