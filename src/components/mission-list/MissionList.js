import React from "react";
import { Row } from "react-bootstrap";
import MissionItem from "./MissionItem";

function MissionList({ missions, onShowEditForm }) {
  return (
    <Row className="border mt-2">
      {missions.map((mission) => {
        const { id, missionName, missionDescription } = mission;

        return (
          <MissionItem
            key={id}
            id={id}
            name={missionName}
            description={missionDescription}
            onShowEditForm={onShowEditForm}
          />
        );
      })}
    </Row>
  );
}

export default MissionList;
