import React, { useState } from 'react';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        phone: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const token = await login(formData.phone, formData.password); // Вызов функции для входа из auth.js
            console.log('Успешный вход. Токен:', token);
            onLogin(token); // Уведомляем App об успешной аутентификации
            navigate('/main', { replace: true }); // Переход на главную страницу, если успешно
        } catch (error) {
            console.error('Ошибка входа:', error);
        // Обработка ошибок при входе
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Вход</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">Номер телефона</label>
                <div className="mt-2">
                <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div>
                <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Пароль</label>
                <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Забыли пароль?</a>
                </div>
                </div>
                <div className="mt-2">
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div>
                <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                Войти
                </button>
            </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
            Нет аккаунта?
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"> Обратитесь в поддержку</a>
            </p>
        </div>
        </div>
    );
};

export default LoginForm;
