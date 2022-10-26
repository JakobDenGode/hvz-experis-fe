import React from "react";
import { Row } from "react-bootstrap";
import MissionItem from "./MissionItem";

function MissionList({ missions, onShowEditForm, onDeleteMission }) {
  console.log(missions);
  return (
    <Row className="border mt-2">
      {missions.map((mission) => {
        const {
          id,
          missionName,
          missionDescription,
          startTime,
          endTime,
          missionLat,
          missionLng,
        } = mission;

        console.log(missionName);

        return (
          <MissionItem
            key={id}
            id={id}
            name={missionName}
            description={missionDescription}
            startTime={startTime}
            endTime={endTime}
            missionLat={missionLat}
            missionLng={missionLng}
            onShowEditForm={onShowEditForm}
            onDeleteMission={onDeleteMission}
          />
        );
      })}
    </Row>
  );
}

export default MissionList;
