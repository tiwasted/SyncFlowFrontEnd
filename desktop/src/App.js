import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SidebarProvider } from './functions/SidebarContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './components/OrderContext';
import ProtectedRoute from './context/ProtectedRoute';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Employees from './pages/Employees';
import B2Bclient from './pages/B2Bclients';
import AddOrder from './components/AddOrder';
import HistoryOfOrders from './pages/HistoryOfOrders';
import SettingsPage from './pages/SettingsPage';
import EditOrder from './components/EditOrder';
import AppLayout from './layout/AppLayout';

import './styles/App.css';
import './styles/AppLayout.css';

import './styles/CommonStyles/ButtonStyles.css';
import './styles/CommonStyles/ContentStyles.css';

import './styles/Sidebar.css';
import './styles/HistoryOfOrders.css';
import './styles/Schedule.css';
import './styles/ServicesStyles.css';
import './styles/Calendar.css';

import './styles/OrderStyles/OrderList.css';
import './styles/OrderStyles/AddOrder.css';
import './styles/OrderStyles/OrderFilter.css';

import './styles/EmployeeStyles/EmployeesPage.css';
import './styles/EmployeeStyles/EmployeeList.css';
import './styles/EmployeeStyles/AddEmployeeModal.css';
import './styles/EmployeeStyles/AssignEmployee.css';

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="app-container">
      <div className="app-main-content">
        {!isLoginPage ? (
            <AppLayout>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/schedule" element={<Schedule />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/add-order" element={<AddOrder />} />
                  <Route path="/history-of-orders" element={<HistoryOfOrders />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/edit-order/:id" element={<EditOrder />} />
                  <Route path="/b2b-clients" element={<B2Bclient />} />
                </Route>
              </Routes>
            </AppLayout>
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
            </Routes>
          )}
      </div>
    </div>
  );
};

function AppWrapper() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <OrderProvider>
          <Router>
            <AppContent />
          </Router>
        </OrderProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default AppWrapper;
