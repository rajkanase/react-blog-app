import React from "react";
import { Button, Form } from "react-bootstrap";
import loginStyle from "./login.module.css";
import Auth from './../../classes/auth';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value })
  }

  onLogin = (event) => {
    event.preventDefault();
    const body = {
      username: this.state.username,
      password: this.state.password
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    fetch(`${Auth.getBaseURL()}/login`, requestOptions).then(res => res.json()).then(data => {
      console.log(data);
      if (data.success === true) {
        Auth.setStorage('token', data.token);
        Auth.setStorage('user', data.user);
        this.props.history.push('/dashboard');
      } else {
        alert('Login failed', data.message);
      }
    }, (error) => {
      console.log('error 33', error);
      alert('Login Error', error.message);
    })
  }

  render() {
    return (
      <div className={loginStyle.loginForm}>
        <Form className={loginStyle.form} onSubmit={this.onLogin}>
          <h5 className="text-muted py-3">Sign In</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              name="username"
              placeholder="Enter username"
              required
              onChange={this.handleUserInput}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              required
              onChange={this.handleUserInput}
            />
          </Form.Group>
          <Button variant="dark" type="submit">
            Sign In
          </Button>
        </Form>
      </div>
    );
  }
}
