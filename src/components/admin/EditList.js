import React from "react";

import Accordion from "react-bootstrap/Accordion";
import EditGame from "./EditGame";
import EditMissions from "./EditMissions";
import EditSquads from "./EditSquads";
import EditCreatedGame from "./EditCreatedGame";
import CreateMission from "./CreateMission";

function EditList() {
  return (
    <Accordion className="mt-2" defaultActiveKey="1">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="text-end">Game Info</Accordion.Header>
        <Accordion.Body>
          <EditGame />
          <EditCreatedGame />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Missions</Accordion.Header>
        <Accordion.Body>
          <CreateMission />
          <EditMissions />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Squad</Accordion.Header>
        <Accordion.Body>
          <EditSquads />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default EditList;
