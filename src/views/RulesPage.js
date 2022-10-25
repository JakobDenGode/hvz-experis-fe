import React from "react";
import { useNavigate } from "react-router-dom";

function RulesPage() {
  const navigate = useNavigate();

  function backToGame() {
    navigate(-1);
  }

  return (
    <div className="position-relative">
      <img
        className="back-arrow position-absolute mt-2 mx-2"
        src="/assets/back.png"
        onClick={backToGame}
      />
      <h1 className="mt-4 text-center">Rules</h1>
      <div className="p-3">
        <p>
          Humans vs. Zombies is a game of tag. All players begin as humans, and
          one is randomly chosen to be the “Original Zombie.” The Original
          Zombie tags human players and turns them into zombies. Zombies must
          tag and eat a human every 48 hours or they starve to death and are out
          of the game.
        </p>{" "}
        <h2 className="text-center">Objective</h2>{" "}
        <p>
          The Zombies win when all human players have been tagged and turned
          into zombies. The Humans win by surviving long enough for all of the
          zombies to starve.
        </p>
        <p>
          Read more at{" "}
          <a className="text-secondary" href="https://humansvszombies.org/">
            humansvszombies.org
          </a>
        </p>
      </div>
    </div>
  );
}

export default RulesPage;
