import React from "react";
import "./Sidenav.css";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { BoxArrowLeft } from "react-bootstrap-icons";

export default function SideNav() {
  return (
    <div className="side-nav">
      <LinkContainer to="/dashboard">
        <Nav.Link>Dashboard</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/tickets">
        <Nav.Link>Tickets</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/tickets">
        <Nav.Link>Profile</Nav.Link>
      </LinkContainer>
      <LinkContainer to="/tickets">
        <Nav.Link>
          <BoxArrowLeft className="m-2"></BoxArrowLeft>Logout
        </Nav.Link>
      </LinkContainer>
    </div>
  );
}
