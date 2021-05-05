import React from "react";
import { Button } from "react-bootstrap";
import Panel from "../panel/panel";
import blogStyle from "./blog.module.css";
import Auth from './../../classes/auth';
import { Link } from "react-router-dom";

export default class Blog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      blogs: []
    }
  }

  componentDidMount() {
    this.getBlogs();
  }

  getBlogs = () => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getToken() }
    };
    fetch(`${Auth.getBaseURL()}/allBlogs`, requestOptions).then(data => data.json()).then(res => {
      console.log('res', res);
      if (res.success) {
        this.setState({
          blogs: res.message
        });
        console.log('this.state.blogs', this.state.blogs);
      } else {
        alert('Get Blogs Failed', res.message);
      }
    }, error => {
      console.log('error', error);
      alert('Error', error.message);
    });
  }

  render() {
    console.log('this.state.blogs', this.state.blogs)
    const blogsTemp = this.state.blogs.map(blog => {
      return <Panel blog={blog} key={blog._id} />
    });
    return (
      <div>
        <h3 className="my-3">Blog Feed</h3>
        <div className="my-3">
          <Link to="/blog/add">
            <Button
              className={`mr-3 ${blogStyle.textLight}`}
              variant="warning"
              type="button"
            >
              New Post
            </Button>
          </Link>
          <Button variant="secondary" type="button">
            Reload
          </Button>
        </div>
        {blogsTemp}
      </div>
    );
  }
}
