import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import ProtectedRoute from './components/login/ProtectedRoute';

import LoginForm from './components/login/LoginForm';
import MainContent from './components/MainContent';
import { getCurrentToken, logout } from './services/auth';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = getCurrentToken();
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token) => {
    if (token) {
      setIsAuthenticated(true);
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
  };

  return (
    <Router>
        <div className="h-full">
            <Routes>
                <Route path="/login" element={!isAuthenticated ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/main" replace />} />
                <Route path="/main" element={isAuthenticated ? <MainContent onLogout={handleLogout} /> : <Navigate to="/login" replace />} />
                <Route path="/" element={<Navigate to={isAuthenticated ? "/main" : "/login"} replace />} />
            </Routes>
        </div>
    </Router>
  );
};

export default App;
