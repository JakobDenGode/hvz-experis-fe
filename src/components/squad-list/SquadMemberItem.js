import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function SquadMemberItem({ rank, member }) {
  return (
    <Form className="bg-secondary rounded mt-3 mb-3">
      <Row>
        <Col className="border text-center" xs={6}>
          Player ID
        </Col>
        <Col className="border text-center" xs={6}>
          Rank
        </Col>
      </Row>
      <Row>
        <Col className="border text-center" xs={6}>
          {member}
        </Col>
        <Col className="border text-center" xs={6}>
          {rank}
        </Col>
      </Row>
    </Form>
  );
}

export default SquadMemberItem;
