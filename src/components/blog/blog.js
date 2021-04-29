import React from "react";
import { Button } from "react-bootstrap";
import Panel from "../panel/panel";
import blogStyle from "./blog.module.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NewBlog from "../newBlog/newBlog";

export default class Blog extends React.Component {
  render() {
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
        <Panel />
      </div>
    );
  }
}
