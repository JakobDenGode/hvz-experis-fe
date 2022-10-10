import React from "react";
import Row from "react-bootstrap/Row";
import GameItem from "./GameItem";

function GameList({ games }) {
  return (
    <Row className="border">
      {games.map((game) => {
        const { name, age, id } = game;

        return <GameItem key={id} name={name} age={age} id={id} />;
      })}
    </Row>
  );
}

export default GameList;
