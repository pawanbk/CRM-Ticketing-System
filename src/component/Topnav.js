import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Topnav.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo/Logo";
import { LinkContainer } from "react-router-bootstrap";
import { BoxArrowRight, List } from "react-bootstrap-icons";

export default function Topnav() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios
        .delete("http://localhost:3001/v1/user/logout", {
          headers: {
            Authorization: sessionStorage.getItem("accessToken"),
          },
        })
        .then((result) => {
          console.log(result);
          if (result.data.success === true) {
            localStorage.removeItem("refreshToken");
            sessionStorage.removeItem("accessToken");
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Nav>
          <Nav.Link onClick={logout}>Logout</Nav.Link>
        </Nav>
        {/* <div className="menu-icon">
          <List></List>
        </div> */}
      </Container>
    </Navbar>
  );
}
