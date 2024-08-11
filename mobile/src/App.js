import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainApp from './components/MainApp';
import { AuthProvider } from './services/AuthContext';

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter basename='/mweb'>
                <MainApp />
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;

