import React from "react";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

function GameItem({ name, age, id }) {
  console.log(name);
  return (
    <Col className="border my-2 mx-auto" xs={12} md={4} lg={3}>
      <Link to={`/games/${id}/map`}>
        <h3>{name}</h3>
        <p>{age}</p>
      </Link>
    </Col>
  );
}

export default GameItem;
