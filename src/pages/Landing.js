import React, { useState } from "react";
import Login from "../component/auth/login/Login.tsx";
import Register from "../component/auth/Register.tsx";
import "./Landing.css";
import CardBody from "react-bootstrap/CardBody";
import Card from "react-bootstrap/Card";
import AuthLayout from "../layout/AuthLayout";

export default function Landing() {
  const [activeForm, setActiveForm] = useState("login");
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
