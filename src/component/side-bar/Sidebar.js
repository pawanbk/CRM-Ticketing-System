import React from "react";
import "./Sidebar.css";
import { Navbar } from "react-bootstrap";
import { ListTask, PersonFill, Speedometer2 } from "react-bootstrap-icons";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Navbar className="d-flex flex-column">
        <Navbar.Brand href="/" className="text-white mb-5">
          TCRM
        </Navbar.Brand>
        <ul>
          <li>
            <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
              <Speedometer2></Speedometer2>Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/tickets" className={({ isActive }) => (isActive ? "active" : "")}>
              <ListTask />
              Tickets
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={({ isActive }) => (isActive ? "active" : "")}>
              <PersonFill />
              Profile
            </NavLink>
          </li>
        </ul>
      </Navbar>
    </div>
  );
}
