import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { STORAGE_KEY_SQUAD } from "../../const/storageKeys";
import { usePlayer, useSquad } from "../../context/PlayerContext";
import { storageSave } from "../../utils/storage";
import { createHeaders } from "../admin/CreateHeaders";

function JoinSquad({ id }) {
  const gameId = useParams();
  const { player, setPlayer } = usePlayer();
  const { squad, setSquad } = useSquad();
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();

  function joinSquad() {
    const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/squad/${id}/join`;
    const joinSquad = async () => {
      const accessToken = await getAccessTokenSilently();
      console.log(accessToken);
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: createHeaders(accessToken),
          body: JSON.stringify({
            id: id,
            playerId: player.id,
          }),
        });
        console.log(response);
        storageSave(STORAGE_KEY_SQUAD, {
          id: id,
          player: player.id,
        });
        setSquad({
          player: player.id,
        });
        navigate(`/games/${gameId.gameId}/mysquad`);
      } catch (error) {
        console.log(error);
        return [error.message, []];
      }
    };
    joinSquad();
  }

  return (
    <button
      onClick={joinSquad}
      type="button"
      className="btn btn-secondary btn-sm"
    >
      Join
    </button>
  );
}

export default JoinSquad;
