import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function JoinButton({ handleOnClick }) {
  return (
    <div className="text-center">
      <Button
        onClick={handleOnClick}
        className="border fs-1 rounded-circle join-button position-absolute start-50 translate-middle"
      >
        Join
      </Button>
    </div>
  );
}

export default JoinButton;
