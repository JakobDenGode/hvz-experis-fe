import React from "react";
import Row from "react-bootstrap/Row";
import GameItem from "./GameItem";

function GameList({ games }) {
  return (
    <Row className="border">
      {games.map((game) => {
        const { gameTitle, gameState, players, id } = game;

        return (
          <GameItem
            key={id}
            gameTitle={gameTitle}
            gameState={gameState}
            players={players}
            id={id}
          />
        );
      })}
    </Row>
  );
}

export default GameList;
