import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
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

  function test() {
    storageSave(STORAGE_KEY_PLAYER, {
      id: 1,
      type: "zombie",
      bitecode: "3424234",
    });
    setPlayer({ id: 1, type: "zombie", bitecode: "3424234" });
  }

  async function joinButton() {
    const accessToken = await getAccessTokenSilently();

    try {
      /*
      const response2 = await fetch(apiUrl2, {
        method: "GET",
        headers: createHeaders(accessToken),
      });
      console.log(response2);
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: createHeaders(accessToken),
      });

      if (!response.ok) throw new Error("Could not create user with username");
      console.log(response);
*/
      setSubmitting(true);
      storageSave(STORAGE_KEY_PLAYER, {
        id: 1,
        type: "zombie",
        bitecode: "3424234",
      });
      setPlayer({ id: 1, type: "zombie", bitecode: "3424234" });

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
