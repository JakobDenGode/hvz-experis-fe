import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormMessage from "../../common/FormMessage";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { createHeaders } from "../admin/CreateHeaders";
import { usePlayer, useSquad } from "../../context/PlayerContext";
import { STORAGE_KEY_SQUAD } from "../../const/storageKeys";
import { storageSave } from "../../utils/storage";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("Squad name is required")
    .min(3, "Squad name must be at least 3 characters"),
});

function CreateSquad() {
  const [displayModalForm, setDisplayModalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();
  const { player, setPlayer } = usePlayer();
  const { squad, setSquad } = useSquad();
  console.log(squad);

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
    const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/squad`;
    const apiUrl2 = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/squads`;

    try {
      const newSquadPost = await fetch(apiUrl, {
        method: "POST",
        headers: createHeaders(accessToken),
        body: JSON.stringify({
          name: data.name,
          game: gameId.gameId,
          player: player.id,
        }),
      });

      const allSquadsFetch = await fetch(apiUrl2, {
        method: "GET",
        headers: createHeaders(accessToken),
      });

      const allSquadsFetchResult = await allSquadsFetch.json();
      console.log(allSquadsFetchResult);
      setPostSuccess(true);
      setSquad({});
      storageSave(STORAGE_KEY_SQUAD, {
        id: allSquadsFetchResult[allSquadsFetchResult.length - 1].id,
        player: player.id,
      });
      setSquad({
        id: allSquadsFetchResult[allSquadsFetchResult.length - 1].id,
        player: player.id,
      });
      setTimeout(() => {
        setDisplayModalForm(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setPostError(error.toString());
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
              {...register("name")}
              id="name"
              placeholder="Name of squad"
            />
            {errors.name && (
              <div className="mb-3 text-danger">{errors.name.message}</div>
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
