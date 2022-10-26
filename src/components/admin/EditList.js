import React, { useEffect, useState } from "react";

import Accordion from "react-bootstrap/Accordion";
import EditGame from "./EditGame";
import EditMissions from "./EditMissions";
import EditSquads from "./EditSquads";
import EditCreatedGame from "./EditCreatedGame";
import { useNavigate, useParams } from "react-router-dom";
import HeaderNavBar from "../nav/HeaderNavBar";
import { useAuth0 } from "@auth0/auth0-react";
import { createHeaders } from "../admin/CreateHeaders";
import CreateMission from "./CreateMission";

function EditList() {
  const { getAccessTokenSilently } = useAuth0();
  const gameId = useParams();
  const [gameData, setGame] = useState([]);

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

  const {
    id,
    gameTitle,
    gameDescription,
    nw_lat,
    nw_lng,
    se_lat,
    se_lng,
    gameState,
  } = gameData;

  return (
    /*
    <Accordion className="mt-2">
      <h1>test</h1>
      <HeaderNavBar title={gameData.gameTitle} />
    */

    <Accordion className="mt-2" defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header className="text-end">Game Info</Accordion.Header>
        <Accordion.Body>
          <EditCreatedGame
            gameTitle={gameTitle}
            gameDescription={gameDescription}
            nw_lat={nw_lat}
            nw_lng={nw_lng}
            se_lat={se_lat}
            se_lng={se_lng}
            gameState={gameState}
            gameData={gameData}
          />
          <EditGame />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Missions</Accordion.Header>
        <Accordion.Body>
          <CreateMission />
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
