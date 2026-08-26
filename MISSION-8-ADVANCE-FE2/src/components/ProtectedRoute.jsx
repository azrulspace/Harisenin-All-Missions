import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const userRole = localStorage.getItem('user_role');

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
