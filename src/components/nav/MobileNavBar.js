import { useAuth0 } from "@auth0/auth0-react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";

function MobileNavBar() {
  const { gameId } = useParams();
  console.log(gameId);
  const { isAuthenticated, user } = useAuth0();

  const { player, setPlayer } = usePlayer();

  /*
  if (user) {
    console.log(user["http://demozero.net/roles"]);
  }player.type === "zombie" ? "dark" : "light"
  console.log(isAuthenticated);
  */

  return (
    <>
      <Navbar
        bg={`${
          !player
            ? "secondary"
            : player.human === "false"
            ? "primary"
            : "secondary"
        }`}
        expand="lg"
        className="position-fixed w-100 bottom-0 right-0 border"
      >
        <Nav className="mx-auto w-100">
          <div className="d-flex justify-content-around">
            {player ? (
              <Link to={`/games/${gameId}/player/${player.id}/squad`}>
                Squads
              </Link>
            ) : (
              <Link to={`/games/${gameId}/squad`}>Squads</Link>
            )}
            {player ? (
              <>
                <Link to={`/games/${gameId}/player/${player.id}/map`}>Map</Link>
                <Link to={`/games/${gameId}/chat`}>Chat</Link>
              </>
            ) : (
              <Link to={`/games/${gameId}/map`}>Map</Link>
            )}
            {user && user["https//:hvz-server.com/roles"].length > 0 && (
              <>
                <Link to={`/games/${gameId}/chat`}>Chat</Link>
                <Link to={`/games/${gameId}/edit`}>Edit</Link>
              </>
            )}
          </div>
        </Nav>
      </Navbar>
    </>
  );
}

export default MobileNavBar;
