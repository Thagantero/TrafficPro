import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Initialize auth state from localStorage
  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = JSON.parse(localStorage.getItem('user'));
      
      if (token && userData) {
        try {
          // Verify token is still valid
          const isValid = await verifyToken(token);
          if (isValid) {
            setIsAuthenticated(true);
            setUser(userData);
            setIsAdmin(userData.role === 'admin');
          } else {
            // Token is invalid, clear storage
            clearAuthData();
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          clearAuthData();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const clearAuthData = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUser(null);
  };

  const verifyToken = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/verify-token', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return response.ok;
    } catch (error) {
      return false;
    }
  };

  const refreshAuthToken = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token available');
      
      const response = await fetch('http://localhost:5000/api/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });

      if (!response.ok) throw new Error('Token refresh failed');
      
      const data = await response.json();
      localStorage.setItem('token', data.token);
      return data.token;
    } catch (error) {
      clearAuthData();
      navigate('/login');
      throw error;
    }
  };

  const authFetch = async (url, options = {}) => {
    let token = localStorage.getItem('token');
    
    // Set up default headers
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
      'Authorization': `Bearer ${token}`
    };

    try {
      const response = await fetch(url, { ...options, headers });
      
      // If token is invalid, try to refresh it
      if (response.status === 401) {
        const newToken = await refreshAuthToken();
        headers.Authorization = `Bearer ${newToken}`;
        return await fetch(url, { ...options, headers });
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
      }
      
      return await response.json();
    } catch (error) {
      if (error.message.includes('Invalid token') || error.message.includes('401')) {
        clearAuthData();
        navigate('/login');
        toast.error('Session expired. Please login again.');
      }
      throw error;
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsAuthenticated(true);
      setUser(data.user);
      setIsAdmin(data.user.role === 'admin');

      toast.success('Welcome back!');
      navigate('/dashboard');
      return data;
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
      setIsAuthenticated(true);
      setUser(data.user);
      setIsAdmin(data.user.role === 'admin');

      toast.success('Registration successful!');
      navigate('/dashboard');
      return data;
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuthData();
    navigate('/login');
    toast.success('You have been logged out.');
  };

  const simulateTraffic = async (url, visits, trafficType) => {
    try {
      await authFetch('http://localhost:5000/api/simulate-traffic', {
        method: 'POST',
        body: JSON.stringify({ url, visits, trafficType }),
      });
      toast.success(`Traffic simulation started for ${url}`);
    } catch (error) {
      toast.error(`Simulation failed: ${error.message}`);
      throw error;
    }
  };

  const getTrafficRecords = async (timeRange = '7d') => {
    try {
      return await authFetch(`http://localhost:5000/api/traffic-records?timeRange=${timeRange}`);
    } catch (error) {
      console.error('Failed to fetch records:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      register,
      loading,
      isAdmin,
      simulateTraffic,
      getTrafficRecords,
      authFetch, // Expose the authFetch method for other API calls
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};