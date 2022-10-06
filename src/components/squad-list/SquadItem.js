import React from "react";
import { Col } from "react-bootstrap";

function SquadItem({ name }) {
  return (
    <Col className="border my-2 mx-auto" xs={12} md={4} lg={3}>
      <h3> {name}</h3>
    </Col>
  );
}

export default SquadItem;
