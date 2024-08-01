import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import AddEmployeeModal from '../components/AddEmployeeModal';
import EmployeeList from '../components/EmployeeList';
import api from '../services/tokenService';

// Функция для обновления токена
// const refreshToken = async () => {
//   try {
//     const response = await axios.post('http://127.0.0.1:8000/users/auth/refresh/', {
//       refresh: localStorage.getItem('refreshToken')
//     });
//     const newToken = response.data.access;
//     localStorage.setItem('token', newToken);
//     return newToken;
//   } catch (error) {
//     console.error('Error refreshing token', error);
//     return null;
//   }
// };

// Создание нового экземпляра axios с интерсептором
// const axiosInstance = axios.create();

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const newToken = await refreshToken();
//       if (newToken) {
//         axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
//         originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
//         return axiosInstance(originalRequest);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('http://127.0.0.1:8000/employees/employees/', {
        // headers: {
        //   'Authorization': `Bearer ${localStorage.getItem('token')}`
        // }
      });
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
      await api.delete(`http://127.0.0.1:8000/employees/${id}/delete/`, {
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
      const response = await api.post('http://127.0.0.1:8000/employees/employees/', newEmployee, {
        // headers: {
        //   'Authorization': `Bearer ${localStorage.getItem('token')}`
        // }
      });
      
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
          <button className='general-btns' onClick={() => setIsModalOpen(true)}>
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
