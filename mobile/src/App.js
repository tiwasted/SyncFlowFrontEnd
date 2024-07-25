import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainApp from './components/MainApp';
import { AuthProvider } from './services/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <MainApp />
            </Router>
        </AuthProvider>
    );
};

export default App;
