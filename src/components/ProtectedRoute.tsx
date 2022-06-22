import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: React.FC<{
  children: React.ReactNode;
}> = ({  children }) => {
  const isAuthenticated = localStorage.getItem('token')
  
  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <>
      <Navigate to="/login" replace />
    </>
  );
};

export default ProtectedRoute;
