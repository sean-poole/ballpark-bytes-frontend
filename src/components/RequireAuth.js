import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

export default function RequireAuth() {
  const { auth } = useAuth();
  const location = useLocation();

  return (
    auth?.token
      ? <Outlet />
      : <Navigate to="/" state={{ from: location }} replace />
  );
}
