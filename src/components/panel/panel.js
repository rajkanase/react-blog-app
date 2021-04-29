import React from "react";
import panelStyle from "./panel.module.css";
import { Button, Dropdown } from "react-bootstrap";

export default class Panel extends React.Component {
  render() {
    return (
      <div className={`${panelStyle.panel}`}>
        <div
          className={`${panelStyle.panelHeader} ${panelStyle.textLight} p-1`}
        >
          Blog Title Here
        </div>
        <div className={`${panelStyle.panelBody}`}>
          <div className={`p-2`}>
            Blog Title Here Blog Title Here Blog Title Here Blog Title Here Blog
            Title Here Blog Title Here Blog Title Here Blog Title Here Blog
            Title Here Blog Title Here Blog Title Here Blog Title Here Blog
            Title Here
          </div>
          <div className={`${panelStyle.panelSubBody} p-2`}>
            <div>Posted By - Raj Kanase</div>
            <div>Date - 24-10-1995</div>
            <div className="d-flex">
              <Dropdown className="mr-2">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Likes
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle className={panelStyle.textLight} variant="warning" id="dropdown-basic">
                  Dislikes
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    Another action
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-3">
                    Something else
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className={`p-2`}>
            <Button variant="danger" type="button">
              Post Comment
            </Button>
          </div>
        </div>
        <div className={`${panelStyle.panelFooter} p-2`}>Show Comments</div>
      </div>
    );
  }
}
