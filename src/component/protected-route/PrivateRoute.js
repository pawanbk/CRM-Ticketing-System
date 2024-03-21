import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { loginSuccess } from "../auth/login/LoginSlice";

export default function PrivateRoute() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.login);

  useEffect(() => {
    sessionStorage.getItem("accessToken") && dispatch(loginSuccess());
  });
  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
}
