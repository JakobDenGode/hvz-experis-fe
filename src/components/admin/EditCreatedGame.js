import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, ToggleButton } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createHeaders } from "./CreateHeaders";
import FormMessage from "../../common/FormMessage";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

function EditCreatedGame({
  gameTitle,
  gameDescription,
  nw_lat,
  nw_lng,
  se_lat,
  se_lng,
  gameState,
  gameData,
}) {
  const [displayModalForm, setDisplayModalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const gameId = useParams();
  //const [gameData, setGame] = useState([]);
  const [title, setTitle] = useState([]);
  console.log(title);
  const [description, setDescription] = useState([]);
  const [nwLat, setNwLat] = useState([]);
  const [nwLng, setNwLng] = useState([]);
  const [seLat, setSeLat] = useState([]);
  const [seLng, setSeLng] = useState([]);
  const [stateValue, setStateValue] = useState([]);
  console.log(gameData);
  console.log(gameData.gameTitle);
  console.log(title);

  useEffect(() => {
    setTitle(gameData.gameTitle);
    setDescription(gameData.gameDescription);
    setNwLat(gameData.nw_lat);
    setNwLng(gameData.nw_lng);
    setSeLat(gameData.se_lat);
    setSeLng(gameData.se_lng);
    setStateValue(gameData.gameState);
    console.log(title);
  }, [gameData.gameTitle]);

  console.log(title);
  const radioButtons = [
    { name: "REGISTRATION", value: "REGISTRATION" },
    { name: "IN_PROGRESS", value: "IN_PROGRESS" },
    { name: "COMPLETE", value: "COMPLETE" },
  ];

  function displayModal() {
    setDisplayModalForm(!displayModalForm);
  }

  async function editGame(data, e) {
    console.log(stateValue);
    setSubmitting(true);
    setPostError(null);

    const accessToken = await getAccessTokenSilently();
    console.log(gameId.gameId);
    console.log(title);
    console.log(stateValue);
    console.log(description);
    console.log(nwLat);
    console.log(nwLng);
    console.log(seLat);
    console.log(seLng);

    try {
      const response = await fetch(
        `https://hvz-api-noroff.herokuapp.com/api/v1/games/${gameId.gameId}`,
        {
          method: "PUT",
          headers: createHeaders(accessToken),
          body: JSON.stringify({
            id: gameId.gameId,
            gameTitle: title,
            gameState: stateValue,
            gameDescription: description,
            nw_lat: nwLat,
            nw_lng: nwLng,
            se_lat: seLat,
            se_lng: seLng,
          }),
        }
      );
      setPostSuccess(true);
      setTimeout(() => {
        setDisplayModalForm(false);
      }, 1500);
      if (!response.ok) throw new Error("Could not create user with username");
      console.log(response);
      return [null, response];
    } catch (error) {
      setPostError(error.toString());
      console.log(error);
      return [error.message, []];
    } finally {
      setSubmitting(false);
    }
  }

  console.log(title);
  console.log(description);

  return (
    <>
      <Button
        onClick={displayModal}
        className="w-100 mt-3 mb-3 bg-primary fs-2"
      >
        Edit Game
      </Button>
      <div className={`modal ${displayModalForm ? "d-block" : "d-none"}`}>
        <Form
          className={`modal--content p-3 d-flex flex-column mx-auto text-start position-relative`}
          autoComplete="off"
        >
          <span onClick={displayModal} className="modal--close">
            &times;
          </span>
          <fieldset disabled={submitting}>
            <Form.Label htmlFor="name" className="mt-3">
              Name
            </Form.Label>
            <Form.Control
              id="gameTitle"
              onChange={(event) => setTitle(event.target.value)}
              defaultValue={gameData.gameTitle}
            />

            <Form.Label htmlFor="gameDescription" className="mt-3">
              About the game
            </Form.Label>
            <Form.Control
              id="gameDescription"
              as="textarea"
              rows={5}
              defaultValue={gameDescription}
              onChange={(event) => setDescription(event.target.value)}
            />

            <Form.Label htmlFor="nw_lat" className="mt-3">
              Northwest latitude
            </Form.Label>
            <Form.Control
              id="nw_lat"
              defaultValue={nw_lat}
              onChange={(event) => setNwLat(event.target.value)}
            />

            <Form.Label htmlFor="nw_lng" className="mt-3">
              Northwest longitude
            </Form.Label>
            <Form.Control
              id="nw_lng"
              defaultValue={nw_lng}
              onChange={(event) => setNwLng(event.target.value)}
            />

            <Form.Label htmlFor="se_lat" className="mt-3">
              Southeast latitude
            </Form.Label>
            <Form.Control
              id="se_lat"
              defaultValue={se_lat}
              onChange={(event) => setSeLat(event.target.value)}
            />

            <Form.Label htmlFor="se_lng" className="mt-3">
              Southeast longitude
            </Form.Label>
            <Form.Control
              id="se_lng"
              defaultValue={se_lng}
              onChange={(event) => setSeLng(event.target.value)}
            />

            <Form.Label htmlFor="gameState" className="mt-3">
              State of game
            </Form.Label>

            <ButtonGroup className="d-block">
              {radioButtons.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={"outline-primary"}
                  name="radio"
                  value={radio.value}
                  checked={stateValue === radio.value}
                  onChange={(e) => setStateValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>

            <button
              onClick={editGame}
              className="button mt-3 bg-primary text-white w-100 border border-none p-2"
            >
              {submitting === true ? "Working..." : "Submit"}
            </button>
          </fieldset>
          {postError && (
            <FormMessage styling="form--error">
              Something went wrong when posting data
            </FormMessage>
          )}
          {postSuccess && (
            <FormMessage styling="form--success">
              Game was successfully edited
            </FormMessage>
          )}
        </Form>
      </div>
    </>
  );
}

export default EditCreatedGame;
