import React, { useEffect } from "react";
import "./AuthLayout.css";
import { useNavigate } from "react-router-dom";

export default function AuthLayout({ children }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("accessToken") && sessionStorage.getItem("accessToken") != null) {
      navigate("/dashboard");
    }
  }, [navigate]);
  return <div className="bg">{children}</div>;
}
