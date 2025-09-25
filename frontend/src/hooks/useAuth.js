import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { auth } from '../api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to decode JWT token (simplified for dummy purposes, not secure)
  const decodeToken = useCallback((token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error("Failed to decode token", e);
      return null;
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await auth.login(email, password);
      const { access_token } = response.data;
      localStorage.setItem('accessToken', access_token);
      const decoded = decodeToken(access_token);
      if (decoded) {
        setIsAuthenticated(true);
        setUserRole(decoded.role);
      }
      return true;
    } catch (error) {
      console.error('Login failed', error);
      setIsAuthenticated(false);
      setUserRole(null);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      const decoded = decodeToken(token);
      if (decoded && decoded.exp * 1000 > Date.now()) { // Check if token is expired
        setIsAuthenticated(true);
        setUserRole(decoded.role);
      } else {
        // Token expired or invalid, attempt refresh or log out
        // For this dummy app, we'll just log out for simplicity
        logout();
      }
    }
    setLoading(false);
  }, [decodeToken]);

  const value = {
    isAuthenticated,
    userRole,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};