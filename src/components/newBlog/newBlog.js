import React from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from './../../classes/auth';

export default class NewBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }

  inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  }

  getUsername = () => {
    const user = Auth.getStorage('user');
    console.log('user', user);
    return user.username;
  }

  onBlogSubmit = (event) => {
    event.preventDefault();
    const body = {
      title: this.state.title,
      body: this.state.body,
      username: this.getUsername()
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    };
    fetch(`${Auth.getBaseURL}/newBlog`, requestOptions).then(data => data.json()).then(res => {
      console.log('create blog res', res);
      if (res.success) {
        this.props.history('/blog');
      } else {
        alert('Blog Create Failed', res.message);
      }
    }, error => {
      console.log('error', error);
      alert('Error', error.message);
    })
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.onBlogSubmit}>
          <h5 className="text-muted py-3">Add Blog</h5>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              onChange={this.inputHandler}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Body</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Body"
              rows={5}
              name="body"
              onChange={this.inputHandler}
            />
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
