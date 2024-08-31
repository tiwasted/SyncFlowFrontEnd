import React, { createContext, useState, useContext, useEffect, useMemo } from "react";
import api from "../services/TokenService";
import { useAuth } from "./AuthProvider";
import { useLocation } from "react-router-dom";

const OrderContext = createContext();

export const useOrders = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const { isAuthenticated, authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchOrders = async () => {
      if (authLoading || !isAuthenticated || location.pathname !== "/orders") return;

      setLoading(true);
      setError(null);

      try {
        const response = await api.get("/orders/b2c-orders/");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Ошибка при получении заказов");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, authLoading, location.pathname]);

  const contextValue = useMemo(() => ({
    orders,
    setOrders,
    loading,
    error
  }), [orders, loading, error]);

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
};