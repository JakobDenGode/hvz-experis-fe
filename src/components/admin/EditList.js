import React from "react";

import Accordion from "react-bootstrap/Accordion";
import EditGame from "./EditGame";

function EditList() {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="text-end">Game Info</Accordion.Header>
        <Accordion.Body>
          <EditGame />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Missions</Accordion.Header>
        <Accordion.Body>Lorem ipsum</Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Squad</Accordion.Header>
        <Accordion.Body>Lorem ipsum</Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default EditList;
