import React from "react";
import { Button, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";

function HeaderNavBar({ title }) {
  const navigate = useNavigate();
  const { player, setPlayer } = usePlayer();
  console.log(player);

  function goToLanding() {
    navigate("/");
  }

  return (
    <Nav className="mx-auto w-100 bg-light justify-content-around">
      <div onClick={goToLanding}>Exit</div>
      <h2>{title}</h2>
      {player && (
        <Button
          className={`${
            player.type === "zombie" ? "btn-secondary" : "btn-primary"
          }`}
        >
          Bite Code
        </Button>
      )}
    </Nav>
  );
}

export default HeaderNavBar;
