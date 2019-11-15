import React, { Component } from "react";
import { Form, Button,Container,Row,Col } from "react-bootstrap";

class Login extends Component {
  render() {
    return (
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>User ID</Form.Label>
                <Form.Control type="email" placeholder="Enter User Id" />
                <Form.Text className="text-muted">
                  Your Account is super secure with us !
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
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
