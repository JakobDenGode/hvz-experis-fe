import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { json, Link, useNavigate, useParams } from "react-router-dom";
import { createHeaders } from "../components/admin/CreateHeaders";
import JoinButton from "../components/map/JoinButton";
import Map from "../components/map/Map";
import MobileNavBar from "../components/nav/MobileNavBar";
import { STORAGE_KEY_PLAYER } from "../const/storageKeys";
import { usePlayer } from "../context/PlayerContext";
import { storageSave } from "../utils/storage";

const MapPage = () => {
  const gameId = useParams();
  const { user, getAccessTokenSilently } = useAuth0();
  const [submitting, setSubmitting] = useState(false);
  const { player, setPlayer } = usePlayer();
  const navigate = useNavigate();
  console.log(player);

  const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}game/${gameId.gameId}/player`;
  const apiUrl2 = `${process.env.REACT_APP_API_SERVER_URL}user/current`;

  async function joinButton() {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: createHeaders(accessToken),
      });

      const playerId = await fetch(apiUrl2, {
        method: "GET",
        headers: createHeaders(accessToken),
      });

      const playerIdResult = await playerId.json();

      const apiUrl3 = `${process.env.REACT_APP_API_SERVER_URL}game/${gameId.gameId}/player/${playerIdResult.player}`;

      const biteCode = await fetch(apiUrl3, {
        method: "GET",
        headers: createHeaders(accessToken),
      });
      const biteCodeIdResult = await biteCode.json();

      if (!response.ok) throw new Error("Could not create user with username");
      console.log(response);

      setSubmitting(true);
      storageSave(STORAGE_KEY_PLAYER, {
        id: playerIdResult.player,
        human: "false",
        bitecode: biteCodeIdResult.biteCode,
      });
      setPlayer({
        id: playerIdResult.player,
        human: "false",
        bitecode: biteCodeIdResult.biteCode,
      });

      window.history.replaceState(
        null,
        "",
        `/game/${gameId.gameId}/player/${playerIdResult.player}/map`
      );
    } catch (error) {
      //setPostError(error.toString());
      return [error.message, []];
    } finally {
      //setSubmitting(false);
    }
  }

  return (
    <div className="position-relative">
      <Map />
      {user && !user["http://demozero.net/roles"].length > 0 && (
        <div>
          {submitting ? (
            <div className="text-center">Player is added</div>
          ) : (
            <JoinButton handleOnClick={joinButton} />
          )}
        </div>
      )}
      <MobileNavBar />
    </div>
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
