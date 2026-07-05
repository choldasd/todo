import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize and seed users if necessary
  useEffect(() => {
    const initializeAuth = async () => {
      // 1. Seed users if not in localStorage
      let storedUsers = localStorage.getItem('users');
      if (!storedUsers) {
        try {
          const res = await fetch('https://dummyjson.com/users?limit=20');
          const data = await res.json();
          const mappedUsers = data.users.map(u => ({
            id: u.id.toString(),
            name: `${u.firstName} ${u.lastName}`,
            email: u.email,
            password: u.password, // storing plain for simulation
            role: u.id === 1 ? 'Admin' : 'User', // Make the first user an Admin
            status: 'Active',
            createdAt: new Date().toISOString()
          }));
          localStorage.setItem('users', JSON.stringify(mappedUsers));
        } catch (error) {
          console.error('Failed to seed users', error);
          localStorage.setItem('users', JSON.stringify([]));
        }
      }

      // 2. Check for active session
      const session = localStorage.getItem('currentUser');
      if (session) {
        setCurrentUser(JSON.parse(session));
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
      if (user.status !== 'Active') {
        throw new Error('Account is inactive. Please contact administrator.');
      }
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    throw new Error('Invalid email or password');
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (userData) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    if (storedUsers.some(u => u.email === userData.email)) {
      throw new Error('Email is already registered');
    }
    const newUser = {
      ...userData,
      id: Date.now().toString(),
      role: 'User',
      status: 'Active',
      createdAt: new Date().toISOString()
    };
    storedUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(storedUsers));
    // Auto login
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const updateProfile = (updatedData) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = storedUsers.map(u => u.id === currentUser.id ? { ...u, ...updatedData } : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    const newUser = { ...currentUser, ...updatedData };
    setCurrentUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  const changePassword = (currentPassword, newPassword) => {
    if (currentUser.password !== currentPassword) {
      throw new Error('Incorrect current password');
    }
    updateProfile({ password: newPassword });
  };

  const validateEmailForReset = (email) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const user = storedUsers.find(u => u.email === email);
    if (!user) {
      throw new Error('No account found with this email address');
    }
    return user; // Return user object for simulation purposes
  };

  const resetPassword = (userId, newPassword) => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = storedUsers.map(u => u.id === userId ? { ...u, password: newPassword } : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      loading, 
      login, 
      logout, 
      register, 
      updateProfile, 
      changePassword,
      validateEmailForReset,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};
