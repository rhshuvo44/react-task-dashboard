import type { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../redux/features/auth/authSlice";
import type { RootState } from "../redux/store";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified, check if user's role is allowed
  if (role !== undefined && role !== user?.role) {
    // Unauthorized: logout user and redirect to login
    dispatch(logout());
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render children components
  return <>{children}</>;
};

export default ProtectedRoute;
