import React from "react";
import { Button, Form } from 'react-bootstrap';
import regStyle from "./register.module.css";

export default class Register extends React.Component {
    render() {
        return (
            <div className={regStyle.loginForm}>
                <Form className={regStyle.form}>
                    <h5 className="text-muted py-3">Sign Up</h5>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>
                    
                    <Form.Group controlId="formBasicUsrName">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicMob">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="number" placeholder="Enter Mobile" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    
                    <Button variant="dark" type="submit">
                        Sign Up
                    </Button>
                </Form>
            </div>
        )
    }
}