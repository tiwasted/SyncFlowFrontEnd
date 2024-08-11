import React, { useState, useEffect } from 'react';
import AddEmployeeModal from '../components/AddEmployeeModal';
import EmployeeList from '../components/EmployeeList';
import api from '../services/tokenService';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees/employees/', {});
      console.log('Fetched employees:', response.data); // Выводим список сотрудников
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees', error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      if (!id) {
        console.error('Invalid employee id');
        return;
      }
      // Используем правильный путь с подставленным идентификатором сотрудника
      await api.delete(`/employees/${id}/delete/`, {
        // headers: {
        //   'Authorization': `Bearer ${localStorage.getItem('token')}`
        // }
      });
      
      // Обновляем список сотрудников, удаляя сотрудника с заданным идентификатором
      setEmployees(employees.filter(emp => emp.id !== id));
    } catch (error) {
      console.error('Error deleting employee', error);
    }
  };
  

  const handleAddEmployee = async (newEmployee) => {
    try {
      // Отправляем запрос на сервер для добавления нового сотрудника
      const response = await api.post('/employees/employees/', newEmployee, {});
      
      // Обновляем список сотрудников, добавляя нового сотрудника в начало массива
      setEmployees([response.data, ...employees]);
      
      // Закрываем модальное окно после успешного добавления
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error adding employee', error);
    }
  };

  return (
    <div>
      <div className='employeeContent'>
          {/* <h1>Сотрудники</h1> */}
          <button className='add-employee-btn' onClick={() => setIsModalOpen(true)}>
            Добавить сотрудника
          </button>
      </div>
      <EmployeeList employees={employees} onDelete={deleteEmployee} />
      <AddEmployeeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onEmployeeAdded={handleAddEmployee} 
      />
    </div>
  );
};

export default Employees;
