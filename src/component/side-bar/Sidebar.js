import React from "react";
import "./Sidebar.css";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar className="d-flex flex-column">
        <Navbar.Brand href="/" className="text-white mb-5">
          TCRM
        </Navbar.Brand>
        <ul>
          <li>
            <LinkContainer to="/dashboard">
              <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
          </li>
          <li>
            <LinkContainer to="/tickets">
              <Nav.Link>Tickets</Nav.Link>
            </LinkContainer>
          </li>
          <li>
            <LinkContainer to="/profile">
              <Nav.Link>Profile</Nav.Link>
            </LinkContainer>
          </li>
        </ul>
      </Navbar>
    </div>
  );
}