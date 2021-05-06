import React from "react";
import { Button, Form } from "react-bootstrap";
import regStyle from "./register.module.css";
import Auth from './../../classes/auth';
export default class Register extends React.Component {
  constructor(props) {
    console.log('props', props);
    super(props);
    this.state = {
      email: "",
      username: "",
      mobile: "",
      password: "",
      errorMsgs: [],
      error: false
    };
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  checkEmailExists = () => {
    console.log('email', this.state.email);
    console.log('email.length', this.state.email.length);
    if (this.state.email.length > 0) {
      const requestOptions = {
        method: 'GET'
      };
      fetch(`${Auth.getBaseURL()}/checkEmail/${this.state.email}`, requestOptions).then(data => data.json()).then(res => {
        console.log('email check response', res);
        const errorMsgs = this.state.errorMsgs;
        console.log('errorMsgs', errorMsgs)
        errorMsgs.push(res.message);
        console.log('errorMsgs 2', errorMsgs)
        res.success === true ? this.setState({ error: false }) : this.setState({ error: true, errorMsgs });
      }, (error) => {
        console.log('email check error', error);
        // this.showToast('error', error.message);
        const errorMsgs = this.state.errorMsgs;
        errorMsgs.push(error.message);
        this.setState({
          error: true,
          errorMsgs
        })
      })
    }
  }

  checkUsernameExists = () => {
    if (this.state.username.length > 0) {
      console.log('username', this.state.username);
      const requestOptions = {
        method: 'GET'
      };
      fetch(`${Auth.getBaseURL()}/checkUsername/${this.state.username}`, requestOptions).then(data => data.json()).then(res => {
        console.log('username check response', res);
        const errorMsgs = this.state.errorMsgs;
        console.log('errorMsgs', errorMsgs)
        errorMsgs.push(res.message);
        console.log('errorMsgs 2', errorMsgs)
        res.success === true ? this.setState({ error: false }) : this.setState({ error: true, errorMsgs });
      }, error => {
        console.log('username check error', error.json);
        // this.showToast('error', error.message);
        this.setState({
          error: true,
          errorMsgs: this.state.errorMsgs.push(error.message)
        })
      })
    }
  }

  registerUser = (event) => {
    event.preventDefault();
    if (this.state.error && this.state.errorMsgs.length > 0) {
      alert(this.state.errorMsgs.join());
      return;
    }
    const body = {
      email: this.state.email,
      username: this.state.username,
      mobile: this.state.mobile,
      password: this.state.password
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    fetch(`${Auth.getBaseURL()}/register`, requestOptions).then(res => res.json()).then(data => {
      console.log('reg response', data);
      if (data.success === true) {
        alert('Registration Successful!!!');
        this.props.history.push('/login');
      } else {
        alert('Registration Failed -', data.message);
      }
    },
      error => {
        console.log('reg error', error);
        alert('Registration Failed -', error.message);
      })
  }


  render() {
    return (
      <div className={regStyle.loginForm}>
        <Form className={regStyle.form} onSubmit={this.registerUser}>
          <h5 className="text-muted py-3">Sign Up</h5>
          <Form.Group
            controlId="formBasicEmail"
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              required
              onChange={this.handleUserInput}
              onBlur={this.checkEmailExists}
            />
          </Form.Group>

          <Form.Group
            controlId="formBasicUsrName"
          >
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Username"
              name="username"
              required
              onChange={this.handleUserInput}
              onBlur={this.checkUsernameExists}
            />
          </Form.Group>

          <Form.Group
            controlId="formBasicMob"
          >
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Mobile"
              name="mobile"
              pattern="/^(\+\d{1,3}[- ]?)?\d{10}$/"
              required
              onChange={this.handleUserInput}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              min="6"
              required
              onChange={this.handleUserInput}
            />
          </Form.Group>

          <Button variant="dark" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    );
  }
}
