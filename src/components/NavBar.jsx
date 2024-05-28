import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants.js";
import api from "../drf.js";
import { useEffect, useState } from "react";
import "../styles/home.css"

const NavBar = () => {
  let [username, setUsername] = useState("");

  const getUser = async () => {
    /** 
     * This function is used to get the username of the current user from the API.
     */
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const decoded = jwtDecode(token);
      const username_id = decoded.user_id;
      const res = await api.get(`/authusers/${username_id}/`);
      console.log("Response:", res.data.username);
      setUsername(res.data.username);
    } catch (error) {
      console.log(error);
      setUsername("Login/Register");
    }}


  useEffect(() => {
    getUser();
  }, []);

  return (
    <Navbar style={{backgroundColor: "rgb(210, 210, 200)"}} data-bs-theme="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Case Manager</Navbar.Brand>
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
              <NavLink to="/login" className="nav-link" style={username === 'Login/Register' ? {} : { display: "none" }}>
                Login
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
            <NavLink to="/register" className="nav-link" style={username === 'Login/Register' ? {} : { display: "none" }}>
                Register
              </NavLink>
            </NavDropdown.Item>
            <NavDropdown.Item>
              <NavLink to="/logout" className="nav-link" style={username === 'Login/Register' ? { display: "none" } : {}}>
                Logout
              </NavLink>
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavBar;
