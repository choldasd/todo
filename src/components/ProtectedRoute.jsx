import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ requireAdmin = false }) => {
  const { currentUser, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div className="animate-fade-in" style={{textAlign: 'center', marginTop: '2rem'}}>Checking authentication...</div>;
  }

  if (!currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && currentUser.role !== 'Admin') {
    return <Navigate to="/" replace />; // Or a custom 403 page
  }

  return <Outlet />;
};

export default ProtectedRoute;
