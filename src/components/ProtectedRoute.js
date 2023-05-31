import { Children } from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ session, children }) => {
  if (!session) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
