import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import LogoutButton from './LogoutButton';
import '../styles/Header.css'

const Header = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    return (
        <header className='header'>
            {isAuthenticated && !isLoginPage && <LogoutButton />}
        </header>
    );
};

export default Header;
