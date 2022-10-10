import React from "react";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function GameItem({ gameTitle, gameState, players, id }) {
  return (
    <Col className="border my-2 mx-auto" xs={12} md={4} lg={3}>
      <Link to={`/games/${id}/map`}>
        <h3>{gameTitle}</h3>
        <p>{players.length} players</p>
        <p>{gameState}</p>
      </Link>
    </Col>
  );
}

export default GameItem;
