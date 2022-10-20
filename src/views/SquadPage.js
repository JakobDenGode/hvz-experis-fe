import React, { useEffect, useState } from "react";
import SquadList from "../components/squad-list/SquadList";
import Heading from "../common/Heading";
import HeaderNavBar from "../components/nav/HeaderNavBar";
import MobileNavBar from "../components/nav/MobileNavBar";
import { useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import { useAuth0 } from "@auth0/auth0-react";
import { createHeaders } from "../components/admin/CreateHeaders";
import CreateSquad from "../components/player/CreateSquad";

function SquadPage() {
  const gameId = useParams();
  const { player, setPlayer } = usePlayer();
  const [squads, setSquad] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const findSquads = async () => {
      const accessToken = await getAccessTokenSilently();
      const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/squads`;
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: createHeaders(accessToken),
        });

        if (!response.ok) throw new Error("Could not complete request");
        const data = await response.json();
        console.log(data);
        setSquad(data);
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };

    findSquads();
  }, []);

  return (
    <div>
      <Heading title="Squads" />
      {player && <CreateSquad />}
      <CreateSquad />
      <SquadList squads={squads} />
      <MobileNavBar />
    </div>
  );
}

export default SquadPage;
