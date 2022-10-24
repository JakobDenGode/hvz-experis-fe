import React from "react";
import { Row } from "react-bootstrap";
import SquadItemAdmin from "./SquadItemAdmin";

function SquadListAdmin({ squads, onShowSquadForm, onDeleteSquad }) {
  return (
    <Row className="border mt-2">
      {squads.map((squad) => {
        const { id, name, members } = squad;

        return (
          <SquadItemAdmin
            key={id}
            id={id}
            name={name}
            members={members}
            onShowSquadForm={onShowSquadForm}
            onDeleteSquad={onDeleteSquad}
          />
        );
      })}
    </Row>
  );
}

export default SquadListAdmin;
