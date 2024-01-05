import React, { useEffect, useState } from "react";
import Login from "../component/auth/login/Login";
import Register from "../component/auth/Register";
import "./Landing.css";
import CardBody from "react-bootstrap/CardBody";
import Card from "react-bootstrap/Card";
import AuthLayout from "../layout/AuthLayout";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const [activeForm, setActiveForm] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.getItem("accessToken") && navigate("/dashboard");
  }, [navigate]);
  return (
    <AuthLayout>
      <div className="container">
        <Card>
          <CardBody>
            <Card.Title className="align-center mb-4 titlefd">TCRM SYSTEM</Card.Title>
            {activeForm === "login" && <Login setActiveForm={setActiveForm} />}
            {activeForm === "register" && <Register setActiveForm={setActiveForm} />}
          </CardBody>
        </Card>
      </div>
    </AuthLayout>
  );
}
