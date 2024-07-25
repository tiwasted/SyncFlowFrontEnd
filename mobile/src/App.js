import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Schedule from './pages/Schedule';
import Profile from './pages/Profile';
import Navbar from './components/BottomNavBar';
import LoginForm from './components/LoginForm';
import { getCurrentToken, setAuthHeader, logout } from './services/auth';
import './styles/App.css';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = getCurrentToken();
    if (token) {
      setIsAuthenticated(true);
      setAuthHeader();
    } else {
      setIsAuthenticated(false)
    }
  }, []);

  const handleLogin = (token) => {
    if (token) {
      setIsAuthenticated(true);
      setAuthHeader();
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) { // Ожидание проверки
    return <div>Loading...</div>; // Можно заменить на индикатор загрузки
  }

  return (
    <Router>
      <MainApp 
        isAuthenticated={isAuthenticated} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
    </Router>
  );
};

const MainApp = ({ isAuthenticated, onLogin, onLogout }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app">
      {isAuthenticated && !isLoginPage && <Navbar />}
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<LoginForm onLogin={onLogin} isAuthenticated={isAuthenticated} />} />
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

export default App;
