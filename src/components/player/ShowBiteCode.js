import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { usePlayer } from "../../context/PlayerContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { createHeaders } from "../admin/CreateHeaders";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import FormMessage from "../../common/FormMessage";

const schema = yup.object().shape({
  bitecode: yup
    .string()
    .required("Bite code is required")
    .min(5, "Bite code must be at least 5 characters"),
});

function ShowBiteCode() {
  const { player, setPlayer } = usePlayer();
  const [displayHumanCode, setDisplayHumanCode] = useState(false);
  const [displayZombieCode, setDisplayZombieCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const gameId = useParams();
  const { getAccessTokenSilently } = useAuth0();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function showBiteCode() {
    const apiUrl2 = `${process.env.REACT_APP_API_SERVER_URL}game/${gameId.gameId}/player/Sjekk1`;

    try {
    } catch {}

    if (player.human === "true") {
      setDisplayHumanCode(!displayHumanCode);
    } else {
      setDisplayZombieCode(!displayZombieCode);
    }
  }

  async function onSubmit(data, e) {
    console.log(gameId);
    const accessToken = await getAccessTokenSilently();
    const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}game/${gameId.gameId}/kill/Sjekk1`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: createHeaders(accessToken),
        body: JSON.stringify({
          id: 0,
          timeOfDeath: "string",
          lat: 0,
          lng: 0,
          game: gameId.gameId,
          playerKiller: 15,
          playerDeath: 0,
        }),
      });
      console.log(response);
      setPostSuccess(true);
      e.target.reset();
      setTimeout(() => {
        setDisplayZombieCode(false);
      }, 1500);
      if (!response.ok) throw new Error("Could not register kill");
      return [null, response];
    } catch (error) {
      console.log(error);
      setPostError(error.toString());
      return [error.message, []];
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {player && (
        <Button
          onClick={showBiteCode}
          className={`${
            player.human === "true" ? "btn-secondary" : "btn-primary"
          }`}
        >
          Bite Code
        </Button>
      )}
      <div className={`modal ${displayHumanCode ? "d-block" : "d-none"}`}>
        <Form
          className={`modal--content p-3 d-flex flex-column mx-auto text-start position-relative`}
          autoComplete="off"
        >
          <span onClick={showBiteCode} className="modal--close">
            &times;
          </span>
          <h4>Your bite code</h4>
          {player && <p>#{player.bitecode}</p>}
        </Form>
      </div>
      <div className={`modal ${displayZombieCode ? "d-block" : "d-none"}`}>
        <Form
          onSubmit={handleSubmit(onSubmit)}
          className={`modal--content p-3 d-flex flex-column mx-auto text-start position-relative`}
          autoComplete="off"
        >
          <span onClick={showBiteCode} className="modal--close">
            &times;
          </span>
          <fieldset disabled={submitting}>
            <Form.Label htmlFor="name" className="mt-3">
              Name
            </Form.Label>
            <Form.Control
              {...register("bitecode")}
              id="bitecode"
              placeholder="Insert bite code of your victim"
            />
            {errors.bitecode && (
              <div className="mb-3 text-danger">{errors.bitecode.message}</div>
            )}
            <button
              type="submit"
              className="button mt-3 bg-primary text-white w-100 border border-none p-2"
            >
              {submitting === true
                ? "Biting in progress..."
                : "Bite your victim!"}
            </button>
          </fieldset>
          {postError && (
            <FormMessage styling="form--error">
              You faild to bite the victim
            </FormMessage>
          )}
          {postSuccess && (
            <FormMessage styling="form--success">
              You zombified the victim
            </FormMessage>
          )}
        </Form>
      </div>
    </div>
  );
}

export default ShowBiteCode;
