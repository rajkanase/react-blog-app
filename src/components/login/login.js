import React from "react";
import { Button, Form } from "react-bootstrap";
import loginStyle from "./login.module.css";

export default class Login extends React.Component {
  render() {
    return (
      <div className={loginStyle.loginForm}>
        <Form className={loginStyle.form}>
          <h5 className="text-muted py-3">Sign In</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="dark" type="submit">
            Sign In
          </Button>
        </Form>
      </div>
    );
  }
}
