import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOrders } from '../functions/OrderContext';

const AssignEmployee = ({ orderId }) => {
    const [employeeId, setEmployeeId] = useState('');
    const [employees, setEmployees] = useState([]);
    const { setOrders } = useOrders();

    useEffect(() => {
        const fetchEmployees = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get('http://127.0.0.1:8000/employees/employees/', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            });
            setEmployees(response.data);
        } catch (error) {
            console.error("Ошибка при получении списка сотрудников", error);
        }
        };

        fetchEmployees();
    }, []);

    const handleAssign = async () => {
        try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(
            `http://localhost:8000/orders/b2c-orders/${orderId}/assign_employee/`,
            { employee_id: employeeId },
            {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            }
        );

        const updatedOrder = response.data;
        setOrders((prevOrders) => 
            prevOrders.map((order) => 
            order.id === updatedOrder.id ? updatedOrder : order
            )
        );

        setEmployeeId(''); // Очистка после успешного назначения
        } catch (error) {
        console.error("Ошибка при назначении сотрудника", error);
        }
    };

    return (
        <div>
        <select 
            value={employeeId} 
            onChange={(e) => setEmployeeId(e.target.value)}
        >
            <option value="">Выберите сотрудника</option>
            {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
                {employee.first_name} {employee.last_name}
            </option>
            ))}
        </select>
        <button onClick={handleAssign}>Назначить сотрудника</button>
        </div>
    );
};

export default AssignEmployee;
