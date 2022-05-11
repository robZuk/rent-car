import { Navigate, Outlet } from "react-router-dom";
import { useAuthStatus, useAdminAuthStatus } from "../hooks/useAuthStatus";
import Loader from "./Loader";

export const PrivateRoute = () => {
  const { loggedIn, checkingStatus } = useAuthStatus();

  if (checkingStatus) {
    return <Loader />;
  }

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export const AdminPrivateRoute = () => {
  const { adminLoggedIn, adminCheckingStatus } = useAdminAuthStatus();

  if (adminCheckingStatus) {
    return <Loader />;
  }

  return adminLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};
