import React, { useEffect, useState } from "react";
import { Button, Nav, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import ShowBiteCode from "../player/ShowBiteCode";

function HeaderNavBar({ title }) {
  const navigate = useNavigate();
  const gameId = useParams();

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

  function goToLanding() {
    const confirmLogOut = window.confirm("Are you sure you want to log out?");

    if (confirmLogOut) {
      navigate("/");

      // delete player
      // delete squad
      // delete local storage
    }
  }

  return (
    <Nav className="mx-auto w-100 bg-light justify-content-around">
      <div onClick={goToLanding}>Exit</div>
      <h2>{title}</h2>

      <ShowBiteCode />
    </Nav>
  );
}

export default HeaderNavBar;
