import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useState } from "react";
import { json, useParams } from "react-router-dom";
import { createHeaders } from "../components/admin/CreateHeaders";
import JoinButton from "../components/map/JoinButton";
import Map from "../components/map/Map";
import MobileNavBar from "../components/nav/MobileNavBar";
import { STORAGE_KEY_PLAYER } from "../const/storageKeys";
import { usePlayer } from "../context/PlayerContext";
import { storageSave } from "../utils/storage";

const MapPage = () => {
  const gameId = useParams();

  const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}game/${gameId.gameId}/player`;
  const apiUrl2 = `${process.env.REACT_APP_API_SERVER_URL}user/current`;

  const { getAccessTokenSilently } = useAuth0();
  const [submitting, setSubmitting] = useState(false);
  const { player, setPlayer } = usePlayer();
  console.log(player);

  async function joinButton() {
    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: createHeaders(accessToken),
      });

      const response2 = await fetch(apiUrl2, {
        method: "GET",
        headers: createHeaders(accessToken),
      });
      const result = await response2.json();
      console.log(result);

      if (!response.ok) throw new Error("Could not create user with username");
      console.log(response);

      setSubmitting(true);
      storageSave(STORAGE_KEY_PLAYER, {
        id: result.player,
        human: "true",
        bitecode: "",
      });
      setPlayer({ id: result.player, type: "", bitecode: "" });

      //return [null, response];
    } catch (error) {
      //setPostError(error.toString());
      return [error.message, []];
    } finally {
      //setSubmitting(false);
    }
  }

  //console.log(useAuth0());

  return (
    <div className="position-relative">
      <Map />
      {submitting ? (
        <div className="text-center">Player is added</div>
      ) : (
        <JoinButton handleOnClick={joinButton} />
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
