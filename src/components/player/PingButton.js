import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useMapCords, usePlayer, useSquad } from "../../context/PlayerContext";
import { createHeaders } from "../admin/CreateHeaders";

function PingButton({ squadMembers }) {
  const gameId = useParams();
  const { user, getAccessTokenSilently } = useAuth0();
  const { squad, setSquad } = useSquad();
  const { mapCords, setMapCords } = useMapCords();
  const { player, setPlayer } = usePlayer();

  function pingLocation() {
    console.log(squadMembers[0]);
    const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/squads/${squad.id}/check-in`;
    const pingMember = async () => {
      const accessToken = await getAccessTokenSilently();
      console.log(accessToken);
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: createHeaders(accessToken),
          body: JSON.stringify({
            lat: mapCords.lat,
            lng: mapCords.lng,
            endTime: "string",
            game: gameId.gameId,
            squadMember: player.id,
          }),
        });
        console.log(response);
        if (!response.ok) throw new Error("Could not register kill");
      } catch (error) {
        console.log(error);
        return [error.message, []];
      }
    };
    pingMember();
  }

  return (
    <Button
      onClick={pingLocation}
      className="w-100 border border-none bg-success mb-2 mt-3"
    >
      PingButton
    </Button>
  );
}

export default PingButton;
