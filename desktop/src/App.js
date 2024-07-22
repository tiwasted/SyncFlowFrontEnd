// // App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { SidebarProvider } from './functions/SidebarContext';
// import { AuthProvider } from './context/AuthContext';
// import ProtectedRoute from './context/ProtectedRoute';
// import SideBar from './functions/Sidebar';
// import Login from './functions/Login';
// import Dashboard from './pages/Dashboard';
// import Schedule from './pages/Schedule';
// import Settings from './pages/Settings';
// import AddOrder from './pages/AddOrder';
// import HistoryOfOrders from './pages/HistoryOfOrders';
// import OrderDetails from './pages/OrderDetails';
// import './styles/App.css';
// import './styles/StyleModal.css';
// import './styles/AddOrderAndService.css';
// import './styles/ButtonStyles.css';
// import './styles/Sidebar.css';
// import './styles/HistoryOfOrdersStyles.css';
// import './styles/Schedule.css';
// import './styles/ServicesStyles.css';
// import './styles/AddOrderAndService.css';
// import './styles/Calendar.css'

// const AppContent = () => {
//   const location = useLocation();
//   const showSidebar = location.pathname !== '/login';

//   return (
//     <div className="app-container">
//       {showSidebar && <SideBar />}
//       <div className="app-main-content">
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route element={<ProtectedRoute />}>
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/schedule" element={<Schedule />} />
//             <Route path="/settings" element={<Settings />} />
//             <Route path="/add-order" element={<AddOrder />} />
//             <Route path="/history-of-orders" element={<HistoryOfOrders />} />
//             <Route path="/order/:id" element={<OrderDetails />} />
//           </Route>
//         </Routes>
//       </div>
//     </div>
//   );
// };

// function AppWrapper() {
//   return (
//     <AuthProvider>
//       <SidebarProvider>
//         <Router>
//             <AppContent />
//         </Router>
//       </SidebarProvider>
//     </AuthProvider>
//   );
// }

// export default AppWrapper;



// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { SidebarProvider } from './functions/SidebarContext';
import { AuthProvider } from './context/AuthContext';
import { OrderProvider } from './functions/OrderContext'; // Импортируем OrderProvider
import ProtectedRoute from './context/ProtectedRoute';
import SideBar from './functions/Sidebar';
import Login from './functions/Login';
import Dashboard from './pages/Dashboard';
import Schedule from './pages/Schedule';
import Employees from './pages/Employees';
import AddOrder from './pages/AddOrder';
import HistoryOfOrders from './pages/HistoryOfOrders';
import SettingsPage from './functions/SettingsPage';
import './styles/App.css';
import './styles/StyleModal.css';
import './styles/AddOrderAndService.css';
import './styles/ButtonStyles.css';
import './styles/Sidebar.css';
import './styles/HistoryOfOrdersStyles.css';
import './styles/Schedule.css';
import './styles/ServicesStyles.css';
import './styles/AddOrderAndService.css';
import './styles/Calendar.css';

const AppContent = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== '/login';

  return (
    <div className="app-container">
      {showSidebar && <SideBar />}
      <div className="app-main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/add-order" element={<AddOrder />} />
            <Route path="/history-of-orders" element={<HistoryOfOrders />} />
            <Route path="/settings" element={<SettingsPage/>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

function AppWrapper() {
  return (
    <AuthProvider>
      <SidebarProvider>
        <OrderProvider> {/* Оборачиваем приложение в OrderProvider */}
          <Router>
              <AppContent />
          </Router>
        </OrderProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}

export default AppWrapper;
