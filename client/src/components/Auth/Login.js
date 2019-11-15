import React, { Component } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: "",
      password: ""
    };
  }

  handleClick(event) {
    var apiBaseUrl = "http://localhost:5000/api/profile/";
    //var self = this;
    var payload = {
      userID: "jhaji12",
      password: "myPa"
    };
    console.log(payload);
    axios
      .post(apiBaseUrl + "login", payload)
      .then(function(response) {
        console.log(response);
        if (response.data.code === 200) {
          console.log("Login successfull");
        //   self.props.appContext.setState({
        //     loginPage: [],
        //     uploadScreen: uploadScreen
        //   });
        } else if (response.data.code === 204) {
          console.log("Username password do not match");
          alert("username password do not match");
        } else {
          console.log("Username does not exists");
          alert("Username does not exist");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User ID</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter User Id"
                  onChange={(event, newValue) =>
                    this.setState({ userID: newValue })
                  }
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
                  onChange={(event, newValue) =>
                    this.setState({ password: newValue })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                onClick={event => this.handleClick(event)}
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
