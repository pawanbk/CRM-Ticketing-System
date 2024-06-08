import React, { useState } from "react";
import "./Sidebar.css";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ListTask, PersonFill, Speedometer2 } from "react-bootstrap-icons";

export default function Sidebar() {
  const [active, setActive] = useState("dashboard");

  const changeActive = (param) => {
    setActive(param);
  };
  return (
    <div className="sidebar">
      <Navbar className="d-flex flex-column">
        <Navbar.Brand href="/" className="text-white mb-5">
          TCRM
        </Navbar.Brand>
        <ul>
          <li className={active === "dashboard" ? "active" : ""}>
            <LinkContainer to="/">
              <Nav.Link>
                <Speedometer2></Speedometer2>Dashboard
              </Nav.Link>
            </LinkContainer>
          </li>
          <li className={active === "tickets" ? "active" : ""}>
            <LinkContainer to="/tickets" onClick={() => changeActive("tickets")}>
              <Nav.Link>
                <ListTask />
                Tickets
              </Nav.Link>
            </LinkContainer>
          </li>
          <li className={active === "profile" ? "active" : ""}>
            <LinkContainer to="/profile" onClick={() => changeActive("profile")}>
              <Nav.Link>
                <PersonFill />
                Profile
              </Nav.Link>
            </LinkContainer>
          </li>
        </ul>
      </Navbar>
    </div>
  );
}
