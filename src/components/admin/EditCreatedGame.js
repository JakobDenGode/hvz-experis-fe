import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, ToggleButton } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createHeaders } from "./CreateHeaders";
import FormMessage from "../../common/FormMessage";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";

const apiUrl = "https://hvz-api-noroff.herokuapp.com/api/v1/games";

const schema = yup.object().shape({
  gameTitle: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
  nw_lat: yup
    .number()
    .integer("Value must be an integer")
    .required("Please enter a northwest latitude"),
  nw_lng: yup
    .number()
    .integer("Value must be an integer")
    .required("Please enter a northwest longitude"),
  se_lat: yup
    .number()
    .integer("Value must be an integer")
    .required("Please enter a southeast latitude"),
  se_lng: yup
    .number()
    .integer("Value must be an integer")
    .required("Please enter a southeast longitude"),
  gameDescription: yup
    .string()
    .required("Please enter a description")
    .min(20, "Dame description must be at least 20 characters long")
    .max(200, "Game description must be at most 200 characters long"),
});

function EditCreatedGame() {
  const [displayModalForm, setDisplayModalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const gameId = useParams();
  const [gameData, setGame] = useState([]);

  const [stateValue, setStateValue] = useState();
  const radioButtons = [
    { name: "REGISTRATION", value: "REGISTRATION" },
    { name: "IN_PROGRESS", value: "IN_PROGRESS" },
    { name: "COMPLETE", value: "COMPLETE" },
  ];

  //Get data to display
  //Get game
  useEffect(() => {
    const findGames = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const response = await fetch(
          `https://hvz-api-noroff.herokuapp.com/api/v1/games/${gameId.gameId}`,
          { headers: createHeaders(accessToken) }
        );
        //if (!response.ok) throw new Error("Could not complete request");
        console.log("responsen min: ");
        console.log(response);
        const data = await response.json();
        setGame(data);
        console.log(gameData);
        return [null, data];
      } catch (error) {
        return [error.message, []];
      }
    };
    findGames();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function displayModal() {
    setDisplayModalForm(!displayModalForm);
  }

  async function onSubmit(data, e) {
    console.log(stateValue);
    setSubmitting(true);
    setPostError(null);

    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(
        `https://hvz-api-noroff.herokuapp.com/api/v1/games/${gameId.gameId}`,
        {
          method: "PUT",
          headers: createHeaders(accessToken),
          body: JSON.stringify({
            id: gameId.gameId,
            gameTitle: data.gameTitle,
            gameState: stateValue,
            gameDescription: data.gameDescription,
            nw_lat: data.nw_lat,
            nw_lng: data.nw_lng,
            se_lat: data.se_lat,
            se_lng: data.se_lng,
          }),
        }
      );
      console.log("my radio: ");
      console.log(stateValue);
      console.log("test");
      console.log(data);
      setPostSuccess(true);
      e.target.reset();
      setTimeout(() => {
        setDisplayModalForm(false);
      }, 1500);
      if (!response.ok) throw new Error("Could not create user with username");
      console.log(response);
      return [null, response];
    } catch (error) {
      setPostError(error.toString());
      return [error.message, []];
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button onClick={displayModal} className="w-100 mt-3 mb-3 btn-success">
        Edit Game
      </Button>
      <div className={`modal ${displayModalForm ? "d-block" : "d-none"}`}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
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
              {...register("gameTitle")}
              id="gameTitle"
              defaultValue={gameData.gameTitle}
            />
            {errors.gameTitle && (
              <div className="mb-3 text-danger">{errors.gameTitle.message}</div>
            )}
            <Form.Label htmlFor="gameDescription" className="mt-3">
              About the game
            </Form.Label>
            <Form.Control
              {...register("gameDescription")}
              id="gameDescription"
              as="textarea"
              rows={5}
              defaultValue={gameData.gameDescription}
            />
            {errors.gameDescription && (
              <div className="mb-3 text-danger">
                {errors.gameDescription.message}
              </div>
            )}
            <Form.Label htmlFor="nw_lat" className="mt-3">
              Northwest latitude
            </Form.Label>
            <Form.Control
              {...register("nw_lat")}
              id="nw_lat"
              defaultValue={gameData.nw_lat}
            />
            {errors.nw_lat && (
              <div className="mb-3 text-danger">
                {errors.nw_lat.message.includes("NaN")
                  ? "Value must be a number (integer)"
                  : errors.nw_lat.message}
              </div>
            )}
            <Form.Label htmlFor="nw_lng" className="mt-3">
              Northwest longitude
            </Form.Label>
            <Form.Control
              {...register("nw_lng")}
              id="nw_lng"
              defaultValue={gameData.nw_lng}
            />
            {errors.nw_lng && (
              <div className="mb-3 text-danger">
                {errors.nw_lng.message.includes("NaN")
                  ? "Value must be a number (integer)"
                  : errors.nw_lng.message}
              </div>
            )}
            <Form.Label htmlFor="se_lat" className="mt-3">
              Southeast latitude
            </Form.Label>
            <Form.Control
              {...register("se_lat")}
              id="se_lat"
              defaultValue={gameData.se_lat}
            />
            {errors.se_lat && (
              <div className="mb-3 text-danger">
                {errors.se_lat.message.includes("NaN")
                  ? "Value must be a number (integer)"
                  : errors.se_lat.message}
              </div>
            )}
            <Form.Label htmlFor="se_lng" className="mt-3">
              Southeast longitude
            </Form.Label>
            <Form.Control
              {...register("se_lng")}
              id="se_lng"
              defaultValue={gameData.se_lng}
            />
            {errors.se_lng && (
              <div className="mb-3 text-danger">
                {errors.se_lng.message.includes("NaN")
                  ? "Value must be a number (integer)"
                  : errors.se_lng.message}
              </div>
            )}
            <Form.Label htmlFor="gameState" className="mt-3">
              State of game
            </Form.Label>
            {/*
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
            */}
            <button
              type="submit"
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
