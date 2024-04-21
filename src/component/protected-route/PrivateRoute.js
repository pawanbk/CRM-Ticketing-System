import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store.tsx";

export default function PrivateRoute() {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
