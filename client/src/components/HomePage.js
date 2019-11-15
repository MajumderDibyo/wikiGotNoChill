import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { browserHistory } from "react-router";
import { Alert,Card } from "react-bootstrap";
import Login from "./Auth/Login";

class HomePage extends Component {
  render() {
    return (
      <div>
        <Card style={{ width: "20rem" }}>
          <Card.Body>
            <Card.Title>Account Name</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">
              Card Subtitle
            </Card.Subtitle>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
          </Card.Body>
        </Card>
        <Login />
      </div>
    );
    // [
    //   'success'
    // ].map((variant, idx) => (
    //   <Alert key={idx} variant={variant}>
    //     You Visited the HomePage!
    //     <Alert.Link href="#">  Sign Up</Alert.Link> If You Like to Rock !!!
    //   </Alert>
    // ))
  }
}
export default HomePage;
