import React from "react";
import { Col } from "react-bootstrap";
import EditMission from "../admin/EditMission";

function MissionItem({
  id,
  name,
  description,
  startTime,
  endTime,
  missionLat,
  missionLng,
  onShowEditForm,
  onDeleteMission,
}) {
  return (
    <>
      <Col className="my-2 mx-auto fs-3" xs={4}>
        <p>{name}</p>
      </Col>
      <Col className="my-2 mx-auto fs-5" xs={4}>
        <p>{description}</p>
      </Col>
      <Col
        className="my-2 mx-auto d-flex justify-content-between align-items-center"
        xs={4}
      >
        <EditMission
          onShowEditForm={onShowEditForm}
          id={id}
          name={name}
          description={description}
          startTime={startTime}
          endTime={endTime}
          missionLat={missionLat}
          missionLng={missionLng}
        />
        <span onClick={() => onDeleteMission(id)} className="delete--icon pb-1">
          &times;
        </span>
      </Col>
    </>
  );
}

export default MissionItem;
