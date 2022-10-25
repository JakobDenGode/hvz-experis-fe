import React from "react";
import Row from "react-bootstrap/Col";
import SquadItem from "./SquadItem";

function SquadList({ squads }) {
  return (
    <Row className="">
      {squads.map((squad) => {
        const { name, id, members } = squad;

        return <SquadItem key={id} id={id} name={name} members={members} />;
      })}
    </Row>
  );
}

export default SquadList;
