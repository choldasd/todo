import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UserProvider } from './context/UserContext';

// Components & Guards
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// Protected Pages
import Dashboard from './pages/Dashboard';
import TodoList from './pages/TodoList';
import CreateTodo from './pages/CreateTodo';
import Users from './pages/Users';
import Profile from './pages/settings/Profile';
import ChangePassword from './pages/settings/ChangePassword';

import './styles/App.scss';
import Posts from './pages/posts/Posts';
import SimplePosts from './pages/posts/SimplePosts';
import AdvancePosts from './pages/posts/AdvancePosts';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <div className="app-layout">
          <Navbar />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/todos" element={<TodoList />} />
                <Route path="/create" element={<CreateTodo />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/change-password" element={<ChangePassword />} />
                <Route path="/users" element={<Users />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/simple-posts" element={<SimplePosts />} />
                <Route path="/advance-posts" element={<AdvancePosts />} />
              </Route>
            </Routes>
          </main>
        </div>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
