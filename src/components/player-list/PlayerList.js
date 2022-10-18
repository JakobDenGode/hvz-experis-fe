import React from "react";
import { Row } from "react-bootstrap";
import PlayerItem from "./PlayerItem";

function PlayerList({ players, onToggleClick }) {
  return (
    <Row className="border mt-2">
      {players.map((player) => {
        const { id, human } = player;

        return (
          <PlayerItem
            key={id}
            id={id}
            state={human}
            onToggleClick={onToggleClick}
          />
        );
      })}
    </Row>
  );
}

export default PlayerList;
