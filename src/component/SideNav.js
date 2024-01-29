import React from "react";
import "./Sidenav.css";
import { LinkContainer } from "react-router-bootstrap";
import { Nav } from "react-bootstrap";
import { BoxArrowLeft } from "react-bootstrap-icons";

export default function SideNav({ visibility, show }) {
  const overlay = `sidenav-overlay ${visibility}`;
  const sidenav = `sidenav ${show}`;
  const hide = () => {
    visibility = "";
    show = "";
  };
  return (
    <div className={overlay}>
      <div className={sidenav}>
        <span className="sidenav-close" onClick={hide}>
          &times;
        </span>
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
    </div>
  );
}
