import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createHeaders } from "./CreateHeaders";
import { useForm } from "react-hook-form";
import FormMessage from "../../common/FormMessage";

function EditSquad({ onShowEditForm, id, name, player, members }) {
  const [displayModalForm, setDisplayModalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const [squadName, setSquadName] = useState(name);
  const { user, getAccessTokenSilently } = useAuth0();
  const gameId = useParams();
  const [formData, setFormData] = useState();

  /*
  useEffect(() => {
    const getMissionUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/missions/${id}/players/9`;
    const postUser = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const squad = await fetch(getMissionUrl, {
          method: "GET",
          headers: createHeaders(accessToken),
        });
        const squadResult = await squad.json();
        setMissions(squad);
        console.log(missionResult);

        console.log(missionResult.missionVisibility);
        if (!mission.ok) throw new Error("Could not register kill");
      } catch (error) {
        console.log(error);
        return [error.message, []];
      }
    };
    postUser();
  }, [formData]);
  */

  function displayModal() {
    setDisplayModalForm(!displayModalForm);
    console.log(id);
  }

  function changeInput(e) {
    console.log(e.target.value);
    setSquadName(e.target.value);
  }

  //console.log(formData);
  async function onSubmit(data, e) {
    setSubmitting(true);
    setPostError(null);

    const accessToken = await getAccessTokenSilently();
    const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/squad/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: createHeaders(accessToken),
        body: JSON.stringify({
          id: id,
          name: squadName,
          game: gameId.gameId,
          player: player,
          game: gameId.gameId,
          members: members,
        }),
      });
      console.log(response);
      setPostSuccess(true);
      setTimeout(() => {
        setDisplayModalForm(false);
      }, 1500);
    } catch (error) {
      console.log(error);
      setPostError(error.toString());
      return [error.message, []];
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          displayModal();
        }}
        className="w-75"
      >
        Edit
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
            <Form.Label htmlFor="squadName" className="mt-3">
              Squad Name
            </Form.Label>
            <Form.Control
              id="squadName"
              placeholder="Name of Squad"
              onChange={changeInput}
              defaultValue={name}
            />

            <Button
              onClick={onSubmit}
              className="button mt-3 bg-primary text-white w-100 border border-none p-2"
              //onClick={formData && onShowEditForm(id, formData)}
            >
              {submitting === true ? "Working..." : "Submit"}
            </Button>
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

export default EditSquad;
