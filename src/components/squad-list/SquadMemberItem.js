import React from "react";
import { Col } from "react-bootstrap";

function SquadMemberItem({ id, members, players }) {
  return (
    <Col className="border my-2 mx-auto" xs={12} md={4} lg={3}>
      <h3> {}</h3>
      <p>{members.length}</p>
    </Col>
  );
}

export default SquadMemberItem;
