import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { createHeaders } from "../components/admin/CreateHeaders";
import JoinButton from "../components/map/JoinButton";
import Map from "../components/map/Map";
import MobileNavBar from "../components/nav/MobileNavBar";
import { usePlayer } from "../context/PlayerContext";

const apiUrl = `https://hvz-api-noroff.herokuapp.com/game/player`;

const MapPage = () => {
  const gameId = useParams();
  console.log(gameId.gameId);
  const { getAccessTokenSilently } = useAuth0();
  const [submitting, setSubmitting] = useState(false);
  const { player, setPlayer } = usePlayer();

  console.log(getAccessTokenSilently());

  async function joinButton() {
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify({
          id: 0,
          biteCode: "string",
          game: gameId.gameId,
          human: true,
        }),
      });
      if (!response.ok) throw new Error("Could not create user with username");
      console.log(response);
      setSubmitting(true);

      return [null, response];
    } catch (error) {
      //setPostError(error.toString());
      return [error.message, []];
    } finally {
      //setSubmitting(false);
    }
  }

  //console.log(useAuth0());

  return (
    <>
      <Map />
      {submitting ? (
        <div className="text-center">Player is added</div>
      ) : (
        <JoinButton handleOnClick={joinButton} />
      )}

      <MobileNavBar />
    </>
  );
};

export default withAuthenticationRequired(MapPage, {
  onRedirecting: () => <div>Redirecting to Login page</div>,
});

export const getProtectedResource = async (accessToken) => {
  const config = {
    url: ``,
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  };
};
