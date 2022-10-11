import React from "react";
import { Button } from "react-bootstrap";

function JoinButton() {
  function joinGame() {
    console.log("hi");
  }

  return (
    <div className="text-center">
      <Button
        onClick={joinGame}
        className="border w-50 rounded-circle text-center mx-auto"
      >
        Join!
      </Button>
    </div>
  );
}

export default JoinButton;
