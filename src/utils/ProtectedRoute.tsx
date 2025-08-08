import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import type { RootState } from "../redux/store";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[]; // optional array of roles allowed to access
};

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user's role is allowed
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Unauthorized: logout user and redirect to login
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render children components
  return <>{children}</>;
};

export default ProtectedRoute;
