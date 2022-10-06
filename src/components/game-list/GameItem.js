import React from "react";
import Col from "react-bootstrap/Col";

function GameItem({ name, age }) {
  return (
    <Col className="border my-2 mx-auto" xs={12} md={4} lg={3}>
      <h3>{name}</h3>
      <p>{age}</p>
    </Col>
  );
}

export default GameItem;
