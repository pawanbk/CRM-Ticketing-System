import React from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import "./Navbar.css";
import { BoxArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

export default function CustomNavbar() {
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
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="primary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">TCRM</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>TCRM</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <LinkContainer to="/dashboard">
                    <Nav.Link>Dashboard</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/tickets">
                    <Nav.Link>Tickets</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/profile">
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                  <div className="icon-btn" onClick={logout}>
                    <BoxArrowLeft className="icon" />
                    <Nav.Link>Logout</Nav.Link>
                  </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
