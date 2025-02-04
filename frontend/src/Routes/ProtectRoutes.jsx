import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export const ProtectRoutes = () => {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};
