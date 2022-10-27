import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function SquadMemberItem({ rank, member }) {
  return (
    <>
      <Col className="text-light p-2 fs-3 text-center" xs={6}>
        {member}
      </Col>
      <Col className="text-light p-2 fs-3 text-center" xs={6}>
        {rank}
      </Col>
    </>
  );
}

export default SquadMemberItem;
