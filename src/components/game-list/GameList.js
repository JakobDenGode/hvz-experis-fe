import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import GameItem from "./GameItem";

function GameList({ games }) {
  return (
    <Row className="border">
      {games.map((game) => {
        const { name, age, id } = game;

        return <GameItem key={id} name={name} age={age} />;
      })}
    </Row>
  );
}

export default GameList;
