import { useAuth0 } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { usePlayer, useSquad } from "../../context/PlayerContext";

function MobileNavBar() {
  const { gameId } = useParams();
  console.log(gameId);
  const { isAuthenticated, user } = useAuth0();
  const { squad, setSquad } = useSquad();
  const { player, setPlayer } = usePlayer();

  /*
  if (user) {
    console.log(user["http://demozero.net/roles"]);
  }player.type === "zombie" ? "dark" : "light"
  console.log(isAuthenticated);
  */

  return (
    <>
      <div
        className={`d-flex justify-content-around border position-fixed w-100 bottom-0 right-0 border ${
          !player
            ? "bg-secondary"
            : player.human === false
            ? "bg-primary"
            : "bg-secondary"
        }`}
      >
        {squad ? (
          <Link
            className="nav-link w-100  p-3 text-center border"
            to={`/games/${gameId}/mysquad`}
          >
            Squads
          </Link>
        ) : (
          <Link
            className="nav-link w-100  p-3 text-center border"
            to={`/games/${gameId}/squad`}
          >
            Squads
          </Link>
        )}
        {player && (
          <Link
            className="nav-link w-100 p-3 text-center  border"
            to={`/games/${gameId}/chat`}
          >
            Chat
          </Link>
        )}
        <Link
          className="nav-link w-100 text-center p-3 text-center border"
          to={`/games/${gameId}/map`}
        >
          Map
        </Link>
        {user && user["https//:hvz-server.com/roles"].length > 0 && (
          <>
            <Link
              className="nav-link w-100  p-3 text-center border"
              to={`/games/${gameId}/chat`}
            >
              Chat
            </Link>
            <Link
              className="nav-link w-100  p-3 text-center border"
              to={`/games/${gameId}/edit`}
            >
              Edit
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default MobileNavBar;
