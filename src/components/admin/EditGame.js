import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

import Accordion from "react-bootstrap/Accordion";
import { useNavigate } from "react-router-dom";
import { createHeaders } from "../admin/CreateHeaders";

import { useParams } from "react-router-dom";
import PlayerList from "../player-list/PlayerList";

function EditGame() {
  const gameId = useParams();
  const navigate = useNavigate();
  const [players, setPlayers] = useState([]);
  const [toggle, setToggle] = useState();
  const { getAccessTokenSilently } = useAuth0();

  function goToLanding() {
    const confirmLogOut = window.confirm(
      "Are you sure you want to delete the game?"
    );
    if (confirmLogOut) {
      // delete player
      deleteGame();
      // Navigate back to LandingPage
      navigate("/");
    }
  }

  //Delete a game
  let deleteGame = async () => {
    const accessToken = await getAccessTokenSilently();
    await fetch(
      `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}`,
      {
        headers: createHeaders(accessToken),
        method: "DELETE",
      }
    );
  };

  useEffect(() => {
    const findPlayers = async () => {
      const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/players`;
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
    findPlayers();
  }, []);

  function toggleHumanZombie(id) {
    const newPlayers = players.map((player) => {
      // find the same id as you click on
      console.log(player);
      if (player.id === id) {
        const updatePlayer = async () => {
          const apiUrl2 = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/players/${id}`;
          const accessToken = await getAccessTokenSilently();
          try {
            const response = await fetch(apiUrl2, {
              method: "PUT",
              headers: createHeaders(accessToken),
              body: JSON.stringify({
                id: id,
                game: gameId.gameId,
                human: !player.human,
              }),
            });
            console.log(response);
            if (!response.ok) throw new Error("Could not register kill");
          } catch (error) {
            console.log(error);
            return [error.message, []];
          }
        };
        updatePlayer();

        return { ...player, human: !player.human };
      }
      return player;
    });

    setPlayers(newPlayers);
    console.log(players);
  }

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
          <PlayerList players={players} onToggleClick={toggleHumanZombie} />
        </Container>
      </Form>
      <Button className="w-100 border-danger bg-danger" onClick={goToLanding}>
        Delete game
      </Button>
    </div>
  );
}

export default EditGame;
