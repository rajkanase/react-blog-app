import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import NavStyle from "./navbar.module.css";
import Auth from './../../classes/auth';

class NavBar extends React.Component {
  constructor(props) {
    console.log('props-nav-9', props)
    super(props);
  }

  onLogout = () => {
    Auth.logout(() => {
      this.props.history.push('/login');
    });
  }

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
            {!Auth.isLoggedIn() && <Nav className="mx-5">
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
            </Nav>}
            {
              Auth.isLoggedIn() && <Nav>
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
                <Nav className="mr-3">
                  <Nav className={NavStyle.fontColor} onClick={this.onLogout}>
                    Logout
                  </Nav>
                </Nav>
              </Nav>
            }
          </Navbar.Collapse>
        </Container>
      </Navbar >
    );
  }
}

export default withRouter(NavBar)