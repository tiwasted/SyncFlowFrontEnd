import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { isTokenExpired } from "../services/tokenService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);

  const [authState, setAuthState] = useState({
    token: localStorage.getItem("access_token") || null,
    isAuthenticated:
      !!localStorage.getItem("access_token") &&
      !isTokenExpired(localStorage.getItem("access_token")),
  });

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuthState({ token: null, isAuthenticated: false });
    navigate("/login");
  }, [navigate]);

  const login = useCallback(
    (token) => {
      if (isTokenExpired(token)) {
        logout();
        return;
      }
      localStorage.setItem("access_token", token);
      setAuthState({ token, isAuthenticated: true });
      setAuthLoading(false);
    },
    [logout]
  );

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("access_token");
      if (token) {
        if (isTokenExpired(token)) {
          logout();
        } else {
          setAuthState({ token, isAuthenticated: true });
        }
      } else {
        setAuthState({ token: null, isAuthenticated: false });
        navigate("/login");
      }
      setAuthLoading(false);
    };
    checkToken();
  }, [logout, navigate]);

  return (
    <AuthContext.Provider value={{ ...authState, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
