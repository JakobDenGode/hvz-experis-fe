import React from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";

function GameItem({ gameTitle, gameState, players, id }) {
  const { player, setPlayer } = usePlayer();

  return (
    <Col className="border my-2 mx-auto" xs={12} md={4} lg={3}>
      {
        <Link to={`/games/${id}/map`}>
          <h3>{gameTitle}</h3>
          <p>{players.length} players</p>
          <p>{gameState}</p>
        </Link>
      }
      <Link to={`/games/${id}/admin`}>
        <Button className="w-100">Edit game</Button>
      </Link>
    </Col>
  );
}

export default GameItem;
