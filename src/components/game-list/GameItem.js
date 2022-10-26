import React from "react";
import { Button } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import { useAuth0 } from "@auth0/auth0-react";

function GameItem({ gameTitle, gameState, players, id }) {
  const { player, setPlayer } = usePlayer();
  const { user, getAccessTokenSilently } = useAuth0();

  return (
    <Col className="my-2 mx-auto" xs={12} md={6} lg={4}>
      {
        <Link to={`/games/${id}/map`} className="link">
          <div className="game-card">
            <div className="d-flex text-primary align-items-center justify-content-around">
              <div className="mt-3">
                <h3 className="mt-2">{gameTitle}</h3>
                <p>{players.length} players</p>
              </div>
              <p>{gameState}</p>
            </div>
            {/* TODO: ADMIN RESTRICTION HERE */}
            {user && user["https//:hvz-server.com/roles"].length > 0 && (
              <Link to={`/games/${id}/admin`}>
                <div className="text-center">
                  <Button className="w-50 text-dark bg-danger border-secondary mb-3">
                    Edit game
                  </Button>
                </div>
              </Link>
            )}
          </div>
        </Link>
      }
    </Col>
  );
}

export default GameItem;
