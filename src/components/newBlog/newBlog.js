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

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.setState({ id: id })
      this.getBlogDetails(id);
    }
  }

  getBlogDetails = (id) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getToken() }
    };
    fetch(`${Auth.getBaseURL()}/singleBlog/${id}`, requestOptions).then(data => data.json()).then(res => {
      console.log('res', res);
      if (res.success) {
        this.setState({
          title: res.blog.title,
          body: res.blog.body
        });
        console.log(this.state);
      } else {
        alert('Get Blogs Failed', res.message);
      }
    }, error => {
      console.log('error', error);
      alert('Error', error.message);
    });
  }

  onBlogSubmit = (event) => {
    event.preventDefault();
    const body = {
      title: this.state.title,
      body: this.state.body,
      createdBy: this.getUsername()
    };
    if (this.state.id) { body['_id'] = this.state.id; delete body['createdBy'] }

    const requestOptions = {
      method: this.state.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getToken() },
      body: JSON.stringify(body)
    };
    fetch(this.state.id ? `${Auth.getBaseURL()}/updateBlog` : `${Auth.getBaseURL()}/newBlog`, requestOptions).then(data => data.json()).then(res => {
      console.log('create blog res', res);
      if (res.success) {
        this.props.history.push('/blog');
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
              value={this.state.title}
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
              value={this.state.body}
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
