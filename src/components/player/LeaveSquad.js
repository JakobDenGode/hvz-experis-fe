import React from "react";
import { Button } from "react-bootstrap";
import { STORAGE_KEY_SQUAD } from "../../const/storageKeys";
import { storageDelete } from "../../utils/storage";
import { createHeaders } from "../admin/CreateHeaders";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { usePlayer } from "../../context/PlayerContext";

function LeaveSquad() {
  const navigate = useNavigate();
  const gameId = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const { player, setPlayer } = usePlayer();

  function leaveSquad() {
    const confirmLogOut = window.confirm(
      "Are you sure you want to leave squad?"
    );
    if (confirmLogOut) {
      // delete player
      deletePlayerFromSquad();

      // delete local storage

      storageDelete(STORAGE_KEY_SQUAD);

      // Navigate back to LandingPage
      navigate(`/games/${gameId.gameId}/squad`);

      // delete squad
    }
  }

  let deletePlayerFromSquad = async () => {
    const accessToken = await getAccessTokenSilently();
    await fetch(
      `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/squad/${player.id}/leave`,
      {
        headers: createHeaders(accessToken),
        method: "DELETE",
      }
    );
  };

  return (
    <Button onClick={leaveSquad} className="w-100">
      Leave Squad
    </Button>
  );
}

export default LeaveSquad;
