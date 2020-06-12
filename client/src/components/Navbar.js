import React from "react";
import {
  Nav,
  Navbar,
  FormControl,
  ButtonGroup,
  Form,
  Button
} from "react-bootstrap";

const MyNavbar = ({ onLoginOpenModal, onRegisterOpenModal }) => {
  return (
    <Navbar
      bg="primary"
      variant="dark"
      style={{ padding: "10px 50px 10px 50px" }}
    >
      <Navbar.Brand href="#home">GraphQL Playground</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="#events">Events</Nav.Link>
      </Nav>
      <ButtonGroup aria-label="Basic example">
        <Button onClick={onLoginOpenModal} variant="outline-light">
          Login
        </Button>
        <Button onClick={onRegisterOpenModal} variant="outline-light">
          Sign Up
        </Button>
      </ButtonGroup>
    </Navbar>
  );
};

export default MyNavbar;
