import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import { BoxArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import UserService from "../../api/UserService";

export default function CustomNavbar() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      if (await UserService.logout()) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar className="top-nav primary">
      <Container>
        <Nav></Nav>
        <Nav>
          <Nav.Link>
            <BoxArrowLeft />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
