import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants.js";
import api from "../drf.js";
import { useEffect, useState } from "react";

const NavBar = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  const decoded = jwtDecode(token);
  const username_id = decoded.user_id;

  let [username, setUsername] = useState("");

  const getUser = async () => {
    const res = await api.get(`/authusers/${username_id}/`);
    console.log("Response:", res.data.username);
    setUsername(res.data.username);
  };

  useEffect(() => {
    getUser();
  }, []);

return (
  <Navbar className="bg-body-tertiary" expand="lg">
    <Container>
      <Navbar.Brand href="#home">Case Manager</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/incident" className="nav-link">
            Incidents
          </NavLink>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <NavDropdown title={username} id="basic-nav-dropdown">
          <NavDropdown.Item>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);}
export default NavBar;
