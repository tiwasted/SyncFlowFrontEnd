import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
  });

  const login = (token) => {
    setAuthState({ token, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    setAuthState({ token: null, isAuthenticated: false });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthState({ token, isAuthenticated: true });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
