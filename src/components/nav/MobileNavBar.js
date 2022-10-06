import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function MobileNavBar() {
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="position-fixed w-100 bottom-0 right-0 border"
    >
      <Nav className="mx-auto  w-100">
        <div className="d-flex justify-content-around">
          <Nav.Link href="/squad">Squads</Nav.Link>
          <Nav.Link href="/map">Map</Nav.Link>
          <Nav.Link href="/chat">Chat</Nav.Link>
        </div>
      </Nav>
    </Navbar>
  );
}

export default MobileNavBar;
