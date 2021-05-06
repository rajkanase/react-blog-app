import React from "react";
import panelStyle from "./panel.module.css";
import { Button, Dropdown } from "react-bootstrap";
import Auth from './../../classes/auth';
import { withRouter } from "react-router-dom";
class Panel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
      cmntText: 'Show Comments'
    };
  }

  isMyBlog = (createdBy) => {
    return createdBy === Auth.getUsername()
  }

  inputChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  onComtBtn = () => {
    this.setState({
      showCmntInp: true
    });
  }

  showCmnts = () => {
    this.setState({
      showComments: !this.state.showComments,
      cmntText: !this.state.showComments ? 'Hide Comments' : 'Show Comments'
    });
  }

  cancelCmnt = () => {
    this.setState({
      commentBody: '',
      showCmntInp: false
    });
  }

  likeBlog = (id) => {
    const body = { id: id };
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getToken() },
      body: JSON.stringify(body)
    };
    fetch(`${Auth.getBaseURL()}/likeBlog`, requestOptions).then(data => data.json()).then(res => {
      console.log('Like response', res);
      if (res.success) {
        this.props.refreshBlogs();
      } else {
        alert('Blog Like Error', res.message);
      }
    }, error => {
      console.log('Error', error);
      alert('Error', error.message);
    });
  }

  dislikeBlog = (id) => {
    const body = { id: id };
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getToken() },
      body: JSON.stringify(body)
    };
    fetch(`${Auth.getBaseURL()}/dislikeBlog`, requestOptions).then(data => data.json()).then(res => {
      console.log('Dislike response', res);
      if (res.success) {
        this.props.refreshBlogs();
      } else {
        alert('Blog Dislike Error', res.message);
      }
    }, error => {
      console.log('Error', error);
      alert('Error', error.message);
    });
  }

  commentBlog = (id) => {
    const body = {
      id: id,
      comment: this.state.commentBody
    };
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getToken() },
      body: JSON.stringify(body)
    }
    fetch(`${Auth.getBaseURL()}/comment`, requestOptions).then(data => data.json()).then(res => {
      console.log('Comment response', res);
      if (res.success) {
        this.cancelCmnt();
        this.props.refreshBlogs();
      } else {
        alert('Comment Error', res.message);
      }
    }, error => {
      console.log('Error', error);
      alert('Error', error.message);
    });
  }

  onEdit = (id) => {
    this.props.history.push(`/blog/add/${id}`);
  }

  render() {
    const { _id, title, body, createdBy, createdAt, comments, likes, dislikes, likedBy, dislikedBy } = this.props.blog;
    const cmntTemp = comments.map(cmnt => {
      return <div key={cmnt._id}><strong>{cmnt.commentator} : </strong>{cmnt.comment}</div>
    });
    const likesTemp = likedBy.map(lk => {
      return <Dropdown.Item key={lk}>{lk}</Dropdown.Item>
    });
    const disLikesTemp = dislikedBy.map(dslk => {
      return <Dropdown.Item key={dslk}>{dslk}</Dropdown.Item>
    });
    return (
      <div className={`${panelStyle.panel} mb-3`}>
        <div
          className={`${panelStyle.panelHeader} ${panelStyle.textLight} p-1`}
        >
          {title}
        </div>
        <div className={`${panelStyle.panelBody}`}>
          <div className={`p-2`}>
            {body}
          </div>
          <div className={`${panelStyle.panelSubBody} p-2`}>
            <div>Posted By - {createdBy}</div>
            <div>Date - {createdAt}</div>
            {!this.isMyBlog(createdBy) && <div className="d-flex">
              <Dropdown className="mr-2">
                <Dropdown.Toggle onClick={() => { this.likeBlog(_id) }} variant="success" id="dropdown-basic">
                  Likes ({likes})
                </Dropdown.Toggle>
                {
                  likedBy.length > 0 && <Dropdown.Menu>
                    {likesTemp}
                  </Dropdown.Menu>
                }
              </Dropdown>
              <Dropdown>
                <Dropdown.Toggle onClick={() => { this.dislikeBlog(_id) }} className={panelStyle.textLight} variant="warning" id="dropdown-basic">
                  Dislikes ({dislikes})
                </Dropdown.Toggle>
                {
                  dislikedBy.length > 0 && <Dropdown.Menu>
                    {disLikesTemp}
                  </Dropdown.Menu>
                }
              </Dropdown>
            </div>}
            {
              this.isMyBlog(createdBy) && <div className="d-flex">
                <Button className="mr-2" variant="danger" type="button">
                  Delete
                </Button>
                <Button variant="warning" type="button" onClick={() => { this.onEdit(_id) }}>
                  Edit
                </Button>
              </div>
            }
          </div>
          <div className={`p-2`}>
            <Button variant="danger" type="button" onClick={this.onComtBtn} disabled={this.state?.showCmntInp}>
              Post Comment
            </Button>
            {
              this.state?.showCmntInp && <div>
                <textarea name="commentBody" className="form-control my-2" rows="6" onChange={this.inputChangeHandler}></textarea>
                <Button className="mr-2" variant="primary" type="button" disabled={!this.state?.commentBody} onClick={() => { this.commentBlog(_id,) }}>
                  Submit Post
                </Button>
                <Button variant="danger" type="button" onClick={this.cancelCmnt}>
                  Cancel
                </Button>
              </div>
            }
          </div>
        </div>
        <div className={`${panelStyle.panelFooter} p-2`}>
          <div onClick={this.showCmnts} className="pointer">
            {this.state.cmntText} ({comments.length})
          </div>
          {this.state.showComments &&
            <div>{cmntTemp}</div>
          }
        </div>
      </div>
    );
  }
}

export default withRouter(Panel);
