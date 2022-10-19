import React from "react";
import { Col } from "react-bootstrap";
import EditMission from "../admin/EditMission";

function MissionItem({ id, name, description, onShowEditForm }) {
  return (
    <>
      <Col className="my-2 mx-auto" xs={4}>
        <p>{name}</p>
      </Col>
      <Col className="my-2 mx-auto" xs={4}>
        <p>{description}</p>
      </Col>
      <Col
        className="my-2 mx-auto d-flex justify-content-between align-items-center"
        xs={4}
      >
        <EditMission onShowEditForm={onShowEditForm} id={id} />
        <span className="fs-2 pb-1">&times;</span>
      </Col>
    </>
  );
}

export default MissionItem;
