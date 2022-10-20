import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormMessage from "../../common/FormMessage";
import { useAuth0 } from "@auth0/auth0-react";
import { createHashRouter, useParams } from "react-router-dom";
import { createHeaders } from "../admin/CreateHeaders";

const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games`;

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Title is required")
    .min(3, "Title must be at least 3 characters"),
});

function CreateSquad() {
  const [displayModalForm, setDisplayModalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();
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
    console.log(data);
    setSubmitting(true);
    setPostError(null);

    const accessToken = await getAccessTokenSilently();

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: createHeaders(accessToken),
        body: JSON.stringify({
          name: data.name,
          game: gameId.gameId,
        }),
      });
      console.log(response);
      setPostSuccess(true);
      e.target.reset();
      setTimeout(() => {
        setDisplayModalForm(false);
      }, 1500);
      if (!response.ok) throw new Error("Could not create user with username");
      console.log(response.headers.get("Location"));

      return [null, response];
    } catch (error) {
      console.log(error);
      setPostError(error.toString());
      return [error.message, []];
    } finally {
      setSubmitting(false);
    }
  }
  console.log(user);

  return (
    <>
      <Button onClick={displayModal} className="w-100 mt-3 mb-3">
        Create New Squad
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
              Give your squad a name
            </Form.Label>
            <Form.Control
              {...register("gameTitle")}
              id="gameTitle"
              placeholder="Name of squad"
            />
            {errors.gameTitle && (
              <div className="mb-3 text-danger">{errors.gameTitle.message}</div>
            )}

            <button
              type="submit"
              className="button mt-3 bg-primary text-white w-100 border border-none p-2"
            >
              {submitting === true ? "Working..." : "Create"}
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

export default CreateSquad;
