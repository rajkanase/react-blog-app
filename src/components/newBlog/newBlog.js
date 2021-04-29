import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class NewBlog extends React.Component {
  render() {
    return (
      <div>
        <Form>
          <h5 className="text-muted py-3">Add Blog</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Title" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Body</Form.Label>
            <Form.Control as="textarea" placeholder="Body" rows={5} />
          </Form.Group>
          <Link to="/blog">
            <Button className="mr-2" variant="warning" type="button">
              Go Back
            </Button>
          </Link>
          <Button variant="dark" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    );
  }
}
