import React, { useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        onLogout(); // Уведомляем App об выходе
        navigate('/login', { replace: true }); // Перенаправление на страницу входа
    };

    const menu = (
        <Menu>
            <Menu.Item>
                <a href="/profile">Профиль</a>
            </Menu.Item>
            <Menu.Item>
                <a href="/settings">Настройки</a>
            </Menu.Item>
            <Menu.Item onClick={handleLogout}>
                Выйти
            </Menu.Item>
        </Menu>
    );

    return (
        <nav className="bg-gray-800 p-4 flex justify-between items-center">
            <div className="text-white text-xl font-bold">SyncFlow</div>
            <div className="relative">
                <Dropdown overlay={menu} trigger={['click']}>
                    <UserOutlined
                        className="text-white text-2xl cursor-pointer"
                        onClick={toggleDropdown}
                    />
                </Dropdown>
            </div>
        </nav>
    );
};

export default Navbar;
