import React from "react";
import { Col } from "react-bootstrap";

function SquadItem({ name, members }) {
  return (
    <Col className="border my-2 mx-auto" xs={12} md={4} lg={3}>
      <h3> {name}</h3>
      <p>{members.length}</p>
      <button type="button" className="btn btn-secondary btn-sm">
        Join
      </button>
    </Col>
  );
}

export default SquadItem;
