import React from "react";
import { Col } from "react-bootstrap";
import EditSquad from "../admin/EditSquad";

function SquadItemAdmin({ id, name, members, onShowSquadForm, onDeleteSquad }) {
  return (
    <>
      <Col className="my-2 mx-auto" xs={4}>
        <p>{name}</p>
      </Col>
      <Col className="my-2 mx-auto" xs={4}>
        <p>{members}</p>
      </Col>
      <Col
        className="my-2 mx-auto d-flex justify-content-between align-items-center"
        xs={4}
      >
        <EditSquad onShowSquadForm={onShowSquadForm} id={id} />
        <span onClick={() => onDeleteSquad(id)} className="fs-2 pb-1">
          &times;
        </span>
      </Col>
    </>
  );
}

export default SquadItemAdmin;
