import React, { useEffect, useState } from "react";

import Accordion from "react-bootstrap/Accordion";
import EditGame from "./EditGame";
import EditMissions from "./EditMissions";
import EditSquads from "./EditSquads";
import EditCreatedGame from "./EditCreatedGame";
import { useParams } from "react-router-dom";
import HeaderNavBar from "../nav/HeaderNavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { createHeaders } from "../admin/CreateHeaders";
import { Button } from "react-bootstrap";

function EditList() {
  const { getAccessTokenSilently } = useAuth0();
  const gameId = useParams();
  const [gameData, setGame] = useState([]);

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
    console.log("deleted");
  };

  //Get game
  useEffect(() => {
    const findGames = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}`,
          { headers: createHeaders(accessToken) }
        );
        //if (!response.ok) throw new Error("Could not complete request");
        console.log(response);
        const data = await response.json();
        setGame(data);
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };
    findGames();
  }, []);

  return (
    <Accordion className="mt-2">
      <h1>test</h1>
      <HeaderNavBar title={gameData.gameTitle} />
      <Button className="w-100 border-danger bg-danger" onClick={deleteGame}>
        Delete current game
      </Button>
      <Accordion.Item eventKey="0">
        <Accordion.Header className="text-end">Game Info</Accordion.Header>
        <Accordion.Body>
          <EditGame />
          <EditCreatedGame />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Missions</Accordion.Header>
        <Accordion.Body>
          <EditMissions />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="2">
        <Accordion.Header>Squad</Accordion.Header>
        <Accordion.Body>
          <EditSquads />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default EditList;
