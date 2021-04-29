import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import NavStyle from "./navbar.module.css";

export default class NavBar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand>
            <Link to="/login" className={NavStyle.fontColor}>
              MERN Blog
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="mx-5">
              <Nav className="mr-3">
                <Link to="/login" className={NavStyle.fontColor}>
                  Login
                </Link>
              </Nav>
              <Nav className="mr-3">
                <Link to="/register" className={NavStyle.fontColor}>
                  Register
                </Link>
              </Nav>
              <Nav className="mr-3">
                <Link to="/dashboard" className={NavStyle.fontColor}>
                  Dashboard
                </Link>
              </Nav>
              <Nav className="mr-3">
                <Link to="/profile" className={NavStyle.fontColor}>
                  Profile
                </Link>
              </Nav>
              <Nav className="mr-3">
                <Link to="/blog" className={NavStyle.fontColor}>
                  Blog
                </Link>
              </Nav>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}
