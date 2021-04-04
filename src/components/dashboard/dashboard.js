import React from "react";
import { Jumbotron } from "react-bootstrap";

export default class Dashboard extends React.Component {
  render() {
    return (
      <Jumbotron className='m-3'>
        <h1>Hello!</h1>
        <p>This is a simple react application, created for learning purpose.</p>
      </Jumbotron>
    );
  }
}
