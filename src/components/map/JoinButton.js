import React from "react";
import { Button } from "react-bootstrap";

function JoinButton({ handleOnClick }) {
  return (
    <div className="text-center">
      <Button
        onClick={handleOnClick}
        className="border w-50 rounded-circle text-center mx-auto"
      >
        Join!
      </Button>
    </div>
  );
}

export default JoinButton;
