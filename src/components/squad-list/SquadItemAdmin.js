import React from "react";
import { Col } from "react-bootstrap";
import EditSquad from "../admin/EditSquad";

function SquadItemAdmin({
  id,
  name,
  members,
  player,
  onShowSquadForm,
  onDeleteSquad,
}) {
  return (
    <>
      <Col className="my-2 mx-auto fs-4" xs={4}>
        <p>{name}</p>
      </Col>
      <Col className="my-2 mx-auto fs-4" xs={4}>
        <p className="text-end">{members}</p>
      </Col>
      <Col
        className="my-2 mx-auto d-flex justify-content-between align-items-center"
        xs={4}
      >
        <EditSquad
          //onShowSquadForm={onShowSquadForm}
          id={id}
          name={name}
          player={player}
          members={members}
        />
        <span onClick={() => onDeleteSquad(id)} className="delete--icon pb-1">
          &times;
        </span>
      </Col>
    </>
  );
}

export default SquadItemAdmin;
