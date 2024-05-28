import React from "react";
import "./Sidebar.css";
import { Navbar, Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { ListTask, PersonFill, Speedometer2 } from "react-bootstrap-icons";

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
              <Nav.Link>
                <Speedometer2></Speedometer2>Dashboard
              </Nav.Link>
            </LinkContainer>
          </li>
          <li>
            <LinkContainer to="/tickets">
              <Nav.Link>
                <ListTask />
                Tickets
              </Nav.Link>
            </LinkContainer>
          </li>
          <li>
            <LinkContainer to="/profile">
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
