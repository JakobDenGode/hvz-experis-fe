import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  ToggleButton,
  ToggleButtonGroup,
} from "react-bootstrap";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createHeaders } from "./CreateHeaders";
import { useForm } from "react-hook-form";
import FormMessage from "../../common/FormMessage";

const schema = yup.object().shape({
  missionName: yup
    .string()
    .required("Name of mission is required")
    .min(3, "Name must be at least 3 characters"),
  missionDescription: yup
    .string()
    .required("Please enter a description")
    .min(20, "Dame description must be at least 20 characters long")
    .max(200, "Game description must be at most 200 characters long"),
  startTime: yup.string().required("Start time is required"),
  endTime: yup.string().required("End time is required"),
  missionLat: yup
    .number()
    .integer("Value must be an integer")
    .required("Please enter a northwest longitude"),
  missionLng: yup
    .number()
    .integer("Value must be an integer")
    .required("Please enter a southeast latitude"),
});

function EditMission({ onShowEditForm, id }) {
  const [displayModalForm, setDisplayModalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();
  const [missions, setMissions] = useState([]);
  const gameId = useParams();
  const [formData, setFormData] = useState();

  const [radioButton, setRadioButton] = useState("HUMAN");

  useEffect(() => {
    const getMissionUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/missions/${id}/players/9`;
    const postUser = async () => {
      const accessToken = await getAccessTokenSilently();
      try {
        const mission = await fetch(getMissionUrl, {
          method: "GET",
          headers: createHeaders(accessToken),
        });
        const missionResult = await mission.json();
        setMissions(missionResult);
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function displayModal() {
    setDisplayModalForm(!displayModalForm);
    console.log(id);
  }

  //console.log(formData);
  async function onSubmit(data, e) {
    console.log(data);
    setFormData({ ...data, missionVisibility: radioButton });

    setSubmitting(true);
    setPostError(null);

    const accessToken = await getAccessTokenSilently();
    const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/missions/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: createHeaders(accessToken),
        body: JSON.stringify({
          id: id,
          missionName: data.missionName,
          missionDescription: data.missionDescription,
          missionVisibility: radioButton,
          startTime: data.startTime,
          endTime: data.endTime,
          missionLat: data.missionLat,
          missionLat: data.missionLat,
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
      return [null, response];
    } catch (error) {
      console.log(error);
      setPostError(error.toString());
      return [error.message, []];
    } finally {
      setSubmitting(false);
    }
  }

  function changeVisibility(e) {
    console.log(e);
    setRadioButton(e);
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
          onSubmit={handleSubmit(onSubmit)}
          className={`modal--content p-3 d-flex flex-column mx-auto text-start position-relative`}
          autoComplete="off"
        >
          <span onClick={displayModal} className="modal--close">
            &times;
          </span>
          <fieldset disabled={submitting}>
            <Form.Label htmlFor="name" className="mt-3">
              Mission Name
            </Form.Label>
            <Form.Control
              {...register("missionName")}
              id="missionName"
              placeholder="Name of Mission"
              defaultValue={missions.missionName}
            />
            {errors.missionName && (
              <div className="mb-3 text-danger">
                {errors.missionName.message}
              </div>
            )}
            <Form.Label htmlFor="missionDescription" className="mt-3">
              Description
            </Form.Label>
            <Form.Control
              {...register("missionDescription")}
              id="missionDescription"
              as="textarea"
              rows={5}
              placeholder="Describe the mission - max 200 words"
              defaultValue={missions.missionDescription}
            />
            {errors.missionDescription && (
              <div className="mb-3 text-danger">
                {errors.missionDescription.message}
              </div>
            )}
            <Form.Label htmlFor="missionVisibility" className="mt-3">
              Visibility
            </Form.Label>

            <ToggleButtonGroup
              type="radio"
              name="options"
              defaultValue={radioButton}
              onChange={changeVisibility}
            >
              <ToggleButton id={`tbg-radio-${id}-first`} value="HUMAN">
                HUMAN
              </ToggleButton>
              <ToggleButton id={`tbg-radio-${id}-second`} value="ZOMBIE">
                ZOMBIE
              </ToggleButton>
              <ToggleButton id={`tbg-radio-${id}-third`} value="GLOBAL">
                GLOBAL
              </ToggleButton>
            </ToggleButtonGroup>

            <Form.Label htmlFor="nw_lat" className="mt-3">
              Start Time
            </Form.Label>
            <Form.Control
              {...register("startTime")}
              id="startTime"
              placeholder="Mission starts at..."
              defaultValue={missions.startTime}
            />
            {errors.startTime && (
              <div className="mb-3 text-danger">{errors.startTime.message}</div>
            )}
            <Form.Label htmlFor="nw_lng" className="mt-3">
              End Time
            </Form.Label>
            <Form.Control
              {...register("endTime")}
              id="endTime"
              placeholder="Mission ends at..."
              defaultValue={missions.endTime}
            />
            {errors.endTime && (
              <div className="mb-3 text-danger">{errors.endTime.message}</div>
            )}
            <Form.Label htmlFor="missionLat" className="mt-3">
              Mission Latitude
            </Form.Label>
            <Form.Control
              {...register("missionLat")}
              id="missionLat"
              placeholder="Mission Latitude"
              defaultValue={missions.missionLat}
            />
            {errors.missionLat && (
              <div className="mb-3 text-danger">
                {errors.missionLat.message.includes("NaN")
                  ? "Value must be a number (integer)"
                  : errors.missionLat.message}
              </div>
            )}
            <Form.Label htmlFor="missionLng" className="mt-3">
              Mission Longitude
            </Form.Label>
            <Form.Control
              {...register("missionLng")}
              id="missionLng"
              placeholder="Mission Longitude"
              defaultValue={missions.missionLng}
            />
            {errors.missionLng && (
              <div className="mb-3 text-danger">
                {errors.missionLng.message.includes("NaN")
                  ? "Value must be a number (integer)"
                  : errors.missionLng.message}
              </div>
            )}

            <button
              type="submit"
              className="button mt-3 bg-primary text-white w-100 border border-none p-2"
              onClick={formData && onShowEditForm(id, formData)}
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

export default EditMission;
