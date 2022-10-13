import React from "react";
import { Nav } from "react-bootstrap";

function HeaderNavBar({ title }) {
  return (
    <Nav className="mx-auto w-100 bg-light justify-content-around">
      <div>Exit</div>
      <div>{title}</div>
      <div>Bite Code</div>
    </Nav>
  );
}

export default HeaderNavBar;
