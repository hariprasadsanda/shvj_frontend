import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // If no token, redirect to landing page
  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
