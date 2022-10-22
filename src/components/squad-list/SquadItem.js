import React from "react";
import { Col } from "react-bootstrap";
import JoinSquad from "../player/JoinSquad";

function SquadItem({ name, members, id }) {
  return (
    <Col className="border my-2 mx-auto" xs={12} md={4} lg={3}>
      <div className="game-card d-flex align-items-center justify-content-around border">
        <div>
          <h3> {name}</h3>
          <p>Total members: {members.length}</p>
        </div>
        <JoinSquad id={id} />
      </div>
    </Col>
  );
}

export default SquadItem;
