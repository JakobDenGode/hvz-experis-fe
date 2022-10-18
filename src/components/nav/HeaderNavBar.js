import React, { useEffect, useState } from "react";
import { Button, Nav, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import ShowBiteCode from "../player/ShowBiteCode";
import { useAuth0 } from "@auth0/auth0-react";
import { createHeaders } from "../admin/CreateHeaders";

function HeaderNavBar({ title }) {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const gameId = useParams();
  const { player, setPlayer } = usePlayer();

  function goToLanding() {
    const confirmLogOut = window.confirm("Are you sure you want to log out?");
    if (confirmLogOut) {
      // delete player
      deletePlayerFromGame();

      // delete local storage

      localStorage.clear();

      // Navigate back to LandingPage
      navigate("/");
      
      
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
    )
  };
  

  return (
    <Nav className="mx-auto w-100 bg-light justify-content-around">
      <div onClick={goToLanding}>Exit</div>
      <h2>{title}</h2>

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