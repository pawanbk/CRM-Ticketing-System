import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import UserService from "../../api/UserService";
import { capitalize } from "lodash";
import { useAuthStore } from "../../store.tsx";
import { PersonCircle, PersonFill, PersonSquare } from "react-bootstrap-icons";

export default function CustomNavbar() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
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
        <Nav><button onClick={logout}>logout</button></Nav>
        <Nav>
          <Nav.Link>
            <PersonCircle style={{ fontSize: '30px', color: '#111a45' }} />
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
