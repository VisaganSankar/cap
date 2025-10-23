import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Check authentication state on app load
    const savedLoginState = localStorage.getItem('isLoggedIn') === 'true';
    const savedUsername = localStorage.getItem('username') || '';
    const savedUserEmail = localStorage.getItem('userEmail') || '';
    
    setIsLoggedIn(savedLoginState);
    setUsername(savedUsername);
    setUserEmail(savedUserEmail);
  }, []);

  const login = (userData) => {
    setIsLoggedIn(true);
    setUsername(userData.username);
    setUserEmail(userData.email);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', userData.username);
    localStorage.setItem('userEmail', userData.email);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setUserEmail('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('userEmail');
  };

  const value = {
    isLoggedIn,
    username,
    userEmail,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
