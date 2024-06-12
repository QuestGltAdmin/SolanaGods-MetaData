import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const UserPrivateRoute = ({ children }) => {
  const { user, isUserAuthenticated } = useAuth();
  const location = useLocation();
  if ( isUserAuthenticated) {
    return children;
  } else {
    return <Navigate to="/" state={{ from: location }} />;
  }
};

export default UserPrivateRoute;