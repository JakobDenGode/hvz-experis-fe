import React, { useState } from "react";
import { Button, Nav, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";
import ShowBiteCode from "../player/ShowBiteCode";

function HeaderNavBar({ title }) {
  const navigate = useNavigate();

  function goToLanding() {
    const confirmLogOut = window.confirm("Are you sure you want to log out?");

    if (confirmLogOut) {
      navigate("/");

      // delete player
      // delete squad
      // delete local storage
    }
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
