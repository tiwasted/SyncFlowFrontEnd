import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import { SidebarProvider } from "./functions/SidebarProvider";
import { OrderProvider } from "./context/OrderProvider";
import ProtectedRoute from "./context/ProtectedRoute";
import AppLayout from "./layout/AppLayout";

import Dashboard from "./pages/Dashboard";
import Schedule from "./pages/Schedule";
import Employees from "./pages/Employees";
import B2Bclient from "./pages/B2Bclients";
import HistoryOfOrders from "./pages/HistoryOfOrders";
import SettingsPage from "./pages/SettingsPage";

import Login from "./components/Login";
import AddOrderB2B from "./components/AddOrderB2B";

import "./styles/App.css";
import "./styles/AppLayout.css";

import "./styles/CommonStyles/ButtonStyles.css";

import "./styles/Schedule.css";
import "./styles/Dashboard.css";
import "./styles/SettingsPage.css";

import "./styles/OrderStyles/OrderList.css";
import "./styles/OrderStyles/AddOrder.css";
import "./styles/OrderStyles/OrderListForSchedule.css";

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

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
                <Route path="/add-order-b2b" element={<AddOrderB2B />} />
                <Route
                  path="/history-of-orders"
                  element={<HistoryOfOrders />}
                />
                <Route path="/settings" element={<SettingsPage />} />
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

function App() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <OrderProvider>
          <AppContent />
        </OrderProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default App;
