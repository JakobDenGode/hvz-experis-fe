import React from "react";
import { Row } from "react-bootstrap";
import MissionItem from "./MissionItem";

function MissionList({ missions, onShowEditForm, onDeleteMission }) {
  return (
    <Row className="mt-2">
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
