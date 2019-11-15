import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

class Login extends Component {
  
  constructor() {
    super();
    this.state = {
      userID: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
      console.log("entry");
      let that = this;
    this.setState({ [event.target.name] : event.target.value },()=> {
        console.log(that.state);
    });
  }

  onSubmit(event) {
      event.preventDefault();
      console.log("sub");

    const logUser = {
      userID: this.state.userID,
      password: this.state.password
    };

    axios.post('http://localhost:5000/api/profile/login',logUser).then((res) =>{
            console.log(res);
            console.log("Login successful");
    }).catch((err)=> {
        console.log(err);
    });

    console.log(logUser);
  }

  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Form onSubmit= {this.onSubmit} >
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User Id"
                  name="userID"
                  value={this.state.userID}
                  onChange={this.onChange}
                />
                <Form.Text className="text-muted">
                  Your Account is super secure with us !
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange}
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label= "Check me out" />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                
              >
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
export default Login;
