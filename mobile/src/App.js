import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Schedule from './pages/Schedule';
import Profile from './pages/Profile';
import Header from './components/BottomNavBar';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;