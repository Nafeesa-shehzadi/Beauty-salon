import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, currentUser } = useSelector((state: RootState) => ({
    isAuthenticated: state.users.isAuthenticated,
    currentUser: state.users.currentUser,
  }));

  // Check if user is authenticated and if they are an admin
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (currentUser && !currentUser.isAdmin) {
    return <Navigate to="/home" replace />; // Redirect non-admins to home
  }

  return <>{children}</>; // Render children if the user is authenticated and authorized
};

export default ProtectedRoute;
