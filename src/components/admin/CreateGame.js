import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createHeaders } from "./CreateHeaders";
import FormMessage from "../../common/FormMessage";

const apiUrl = "https://hvz-api-noroff.herokuapp.com/game";

const schema = yup.object().shape({
  gameTitle: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
});

function CreateGame() {
  const [displayModalForm, setDisplayModalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function displayModal() {
    setDisplayModalForm(!displayModalForm);
  }

  async function onSubmit(data, e) {
    console.log(data);
    setSubmitting(true);
    setPostError(null);

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: createHeaders(),
        body: JSON.stringify({
          id: 0,
          gameTitle: data.gameTitle,
          gameState: "REGISTRATION",
          nw_lat: 0,
          nw_lng: 0,
          se_lat: 0,
          se_lng: 0,
          players: [0],
          missions: [0],
        }),
      });
      setPostSuccess(true);
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
      <Button onClick={displayModal} className="w-100 mt-3 mb-3">
        Create Game
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
              placeholder="Title of game"
            />
            {errors.gameTitle && (
              <div className="mb-3 text-danger">{errors.gameTitle.message}</div>
            )}
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
              Message was successfully submitted
            </FormMessage>
          )}
        </Form>
      </div>
    </>
  );
}

export default CreateGame;
