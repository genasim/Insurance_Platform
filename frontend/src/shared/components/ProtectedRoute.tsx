// ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Right } from "../../models/Rights";
import useJwt from "../hooks/useJwt";

interface ProtectedRouteProps {
  requiredRoles?: Right[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles }) => {
  const jwt = useJwt();

  if (!jwt) {
    return <Navigate to="/login" />;
  }

  if (!requiredRoles?.some((role) => jwt?.rights.includes(role))) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
