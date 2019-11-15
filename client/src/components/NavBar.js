import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { Form, FormControl, Button} from 'react-bootstrap'


class NavBar extends Component {
  render() {
    return (
        <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Wiki Got No Chill</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link to Mars</Nav.Link>
            <NavDropdown title=" Explorer" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profiles</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Groups in College</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something New</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-3" />
            <Button variant="outline-success">Search Profile</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
export default NavBar;