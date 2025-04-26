import React, { createContext, useContext, useState, ReactNode } from 'react';


const defaultContext = {
  user: null,
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
  loading: false,
  sidebarOpen: true,
  toggleSidebar: () => {},
};

const AppContext = createContext(defaultContext);

export const useAppContext = () => useContext(AppContext);


export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock login function
  const login = async (email, password) => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful login with admin user
        if (email === 'admin@hospital.com' && password === 'password') {
          setUser({
            id: 1,
            name: 'Admin User',
            email: email,
            role: 'admin',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
          });
          setLoading(false);
          resolve(true);
        } else {
          setLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    sidebarOpen,
    toggleSidebar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};