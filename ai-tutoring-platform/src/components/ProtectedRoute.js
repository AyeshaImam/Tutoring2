import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../components/UserContext"; // Import the context

const ProtectedRoute = ({ role, children }) => {
  const { user, isAuthenticated, loading } = useContext(UserContext); // Access context data

  // If still loading, return loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If the user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If a role is required and the user role does not match, redirect
  if (role && role !== user.role) {
    return <Navigate to="/" />;
  }

  // If the user is authenticated and role matches, render the children
  return children;
};

export default ProtectedRoute;
