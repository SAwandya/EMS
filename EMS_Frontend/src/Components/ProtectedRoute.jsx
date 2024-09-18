import React from "react";
import { useAuth } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { authToken } = useAuth();

  return authToken ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
