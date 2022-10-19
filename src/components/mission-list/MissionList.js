import React from "react";
import { Row } from "react-bootstrap";
import MissionItem from "./MissionItem";

function MissionList({ missions }) {
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
          />
        );
      })}
    </Row>
  );
}

export default MissionList;
