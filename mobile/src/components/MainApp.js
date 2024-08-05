import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../services/AuthContext';
import Header from './Header';
import Navbar from './BottomNavBar';
import LoginForm from './LoginForm';
import Schedule from '../pages/Schedule';
import Profile from '../pages/Profile';
import "../styles/App.css";

const MainApp = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';

    if (isLoading) {
    return <div>Loading...</div>;
}

return (
    <div className="app">
        <Header />
        {isAuthenticated && !isLoginPage && <Navbar />}
        <main className="main-content">
            <Routes>
                <Route
                    path="/login"
                    element={isAuthenticated ? <Navigate to="/schedule" replace /> : <LoginForm />}
                />
                {isAuthenticated ? (
                    <>
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/main" element={<Navigate to="/schedule" replace />} />
                    <Route path="/" element={<Navigate to="/schedule" replace />} />
                    </>
                ) : (
                    <Route path="*" element={<Navigate to="/login" replace />} />
                )}
            </Routes>
        </main>
    </div>
    );
};

export default MainApp;
