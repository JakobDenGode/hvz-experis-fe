import React from "react";
import { Button } from "react-bootstrap";

function JoinButton({ handleOnClick }) {
  return (
    <div className="text-center">
      <Button
        onClick={handleOnClick}
        className="border rounded-circle join-button position-absolute start-50 translate-middle"
      >
        Join!
      </Button>
    </div>
  );
}

export default JoinButton;
