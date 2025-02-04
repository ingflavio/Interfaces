import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

export const NoProtectRoutes = () => {
  const { isAuthenticated } = useAuthStore();
  return !isAuthenticated ? <Outlet /> : <Navigate to="/admin" />;
};
