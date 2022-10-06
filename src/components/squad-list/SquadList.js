import React from "react";
import Row from "react-bootstrap/Col";
import SquadItem from "./SquadItem";

function SquadList({ squads }) {
  return (
    <Row className="border">
      {squads.map((squad) => {
        const { name, id } = squad;

        return <SquadItem key={id} id={id} name={name} />;
      })}
    </Row>
  );
}

export default SquadList;
