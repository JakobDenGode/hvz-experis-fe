import React, { useState } from "react";
import { Button, Nav, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import ShowBiteCode from "../player/ShowBiteCode";

function HeaderNavBar({ title }) {
  const navigate = useNavigate();

  function goToLanding() {
    navigate("/");
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
