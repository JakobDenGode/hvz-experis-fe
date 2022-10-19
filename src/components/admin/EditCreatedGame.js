import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
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
});

function EditCreatedGame() {
  const [displayModalForm, setDisplayModalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const gameId = useParams();

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
    console.log("---");
    console.log(data);
    console.log("---");
    setSubmitting(true);
    setPostError(null);

    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(
        `https://hvz-api-noroff.herokuapp.com/api/v1/games/${gameId.gameId}`,
        {
          headers: createHeaders(accessToken),
          method: "PUT",
          body: JSON.stringify({
            gameTitle: data.gameTitle,
          }),
        }
      );
      console.log(gameId);
      console.log(data);
      setPostSuccess(true);
      e.target.reset();
      setTimeout(() => {
        setDisplayModalForm(false);
      }, 1500);
      if (response.ok) throw new Error("could not ");
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
        Edit Created Game
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
              Message was successfully edited
            </FormMessage>
          )}
        </Form>
      </div>
    </>
  );
}

export default EditCreatedGame;
