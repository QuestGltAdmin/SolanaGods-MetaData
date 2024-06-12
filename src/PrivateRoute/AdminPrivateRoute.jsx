import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const AdminPrivateRoute = ({ children }) => {
  const { user, isUserAuthenticated } = useAuth();
  const location = useLocation();
  if ( isUserAuthenticated && user.user_role === "ADMIN") {
    return children;
  } else {
    return <Navigate to="/admin-login" state={{ from: location }} />;
  }
};

export default AdminPrivateRoute;