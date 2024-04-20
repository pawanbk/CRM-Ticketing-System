import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store";

export default function GuestRoute() {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? <Navigate to="/dashboard" /> : <Outlet />;
}
