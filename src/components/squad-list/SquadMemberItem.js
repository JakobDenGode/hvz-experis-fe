import React from "react";
import { Col, Form, Row } from "react-bootstrap";

function SquadMemberItem({ rank, member }) {
  return (
    <>
      <Col className="form-table-data border text-center" xs={6}>
        {member}
      </Col>
      <Col className="form-table-data border text-center" xs={6}>
        {rank}
      </Col>
    </>
  );
}

export default SquadMemberItem;
