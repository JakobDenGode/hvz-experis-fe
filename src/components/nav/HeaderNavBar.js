import React, { useEffect, useState } from "react";
import { Button, Nav, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import ShowBiteCode from "../player/ShowBiteCode";
import { useAuth0 } from "@auth0/auth0-react";
import { createHeaders } from "../admin/CreateHeaders";
import { storageSave } from "../../utils/storage";
import { STORAGE_KEY_PLAYER } from "../../const/storageKeys";
import Heading from "../../common/Heading";

function HeaderNavBar() {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const gameId = useParams();
  const { player, setPlayer } = usePlayer();
  const [title, setTitle] = useState([]);

  console.log("hi");

  useEffect(() => {
    const findPlayer = async () => {
      const accessToken = await getAccessTokenSilently();

      const apiUrl2 = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}`;
      try {
        if (player) {
          const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/players/${player.id}`;
          const playerId = await fetch(apiUrl, {
            method: "GET",
            headers: createHeaders(accessToken),
          });

          const playerIdResults = await playerId.json();
          if (playerIdResults.human !== player.human) {
            storageSave(STORAGE_KEY_PLAYER, {
              id: player.id,
              human: !player.human,
              biteCode: playerIdResults.biteCode,
            });
            setPlayer({
              id: player.id,
              human: !player.human,
              biteCode: playerIdResults.biteCode,
            });
          }
        }

        const gameTitle = await fetch(apiUrl2, {
          method: "GET",
          headers: createHeaders(accessToken),
        });
        const gameIdResults = await gameTitle.json();
        setTitle(gameIdResults.gameTitle);
      } catch (error) {
        return [error.message, []];
      }
    };
    findPlayer();
  }, []);

  function goToLanding() {
    const confirmLogOut = window.confirm("Are you sure you want to log out?");
    if (confirmLogOut) {
      // delete player
      deletePlayerFromGame();

      // delete local storage

      localStorage.clear();

      // Navigate back to LandingPage
      navigate("/games");

      // delete squad
    }
  }

  let deletePlayerFromGame = async () => {
    const accessToken = await getAccessTokenSilently();
    await fetch(
      `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/players/${player.id}`,
      {
        headers: createHeaders(accessToken),
        method: "DELETE",
      }
    );
  };

  return (
    <Nav className="w-100 d-flex align-items-center justify-content-around">
      <img
        className="back-arrow"
        src="/assets/back.png"
        onClick={goToLanding}
      />
      <h2
        style={{
          color: "black",
          fontSize: "40px",
          fontWeight: "600",
          textAlign: "center",
          padding: "20px",
        }}
      >
        {title}
      </h2>

      <ShowBiteCode />
    </Nav>
  );

  /*
  useEffect(() => {
    const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}`;
    const getGame = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const game = await fetch(apiUrl, {
          method: "GET",
          headers: createHeaders(accessToken),
        });
        const gameResult = await game.json();
        console.log(gameResult);
        if (!response.ok) throw new Error("Could not register kill");
      } catch (error) {
        console.log(error);
        return [error.message, []];
      }
    };
    getGame();
  }, []);
  */
}

export default HeaderNavBar;
