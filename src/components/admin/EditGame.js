import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import PlayerList from "../player-list/PlayerList";
import { createHeaders } from "./CreateHeaders";

function EditGame() {
  const gameId = useParams();
  const [players, setPlayers] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/players`;

  useEffect(() => {
    const findGames = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: createHeaders(accessToken),
        });
        //if (!response.ok) throw new Error("Could not complete request");
        const players = await response.json();
        console.log(players);
        setPlayers(players);
      } catch (error) {
        return [error.message, []];
      }
    };
    findGames();
  }, [apiUrl]);

  return (
    <div>
      <Form className="bg-secondary rounded mt-3 mb-3">
        <h2 className="text-center">Game</h2>

        <Container>
          <Row>
            <Col className="border text-center" xs={4}>
              Player
            </Col>
            <Col className="border text-center" xs={4}>
              Status
            </Col>
            <Col className="border text-center" xs={4}>
              Change
            </Col>
          </Row>
          <PlayerList players={players} />
        </Container>
      </Form>
      <Button className="w-100 border-danger bg-danger">Delete game</Button>
    </div>
  );
}

export default EditGame;
