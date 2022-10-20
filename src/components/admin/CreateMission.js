import { useAuth0 } from "@auth0/auth0-react";
import React, { useState } from "react";
import { Button, ButtonGroup, Form, ToggleButton } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createHeaders } from "./CreateHeaders";
import FormMessage from "../../common/FormMessage";
import { useParams } from "react-router-dom";

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

function CreateMission() {
  const [displayModalForm, setDisplayModalForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState(null);
  const [postSuccess, setPostSuccess] = useState(false);
  const { user, getAccessTokenSilently } = useAuth0();
  const gameId = useParams();

  const [radioValue, setRadioValue] = useState("HUMAN");

  const radioButtons = [
    { name: "HUMAN", value: "HUMAN" },
    { name: "ZOMBIE", value: "ZOMBIE" },
  ];

  console.log(radioValue);

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
    console.log(radioValue);
    setSubmitting(true);
    setPostError(null);

    const accessToken = await getAccessTokenSilently();
    const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/missions`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: createHeaders(accessToken),
        body: JSON.stringify({
          missionName: data.missionName,
          missionDescription: data.missionDescription,
          missionVisibility: data.missionVisibility,
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

  return (
    <>
      {user && user["https//:hvz-server.com/roles"].length > 0 && (
        <Button onClick={displayModal} className="w-100 mt-3 mb-3">
          Create Mission
        </Button>
      )}
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
            />
            {errors.missionDescription && (
              <div className="mb-3 text-danger">
                {errors.missionDescription.message}
              </div>
            )}
            <Form.Label htmlFor="missionVisibility" className="mt-3">
              Visibility
            </Form.Label>

            <ButtonGroup className="d-block">
              {radioButtons.map((radio, idx) => (
                <ToggleButton
                  key={idx}
                  id={`radio-${idx}`}
                  type="radio"
                  variant={idx % 2 ? "outline-primary" : "outline-secondary"}
                  name="radio"
                  value={radio.value}
                  checked={radioValue === radio.value}
                  onChange={(e) => setRadioValue(e.currentTarget.value)}
                >
                  {radio.name}
                </ToggleButton>
              ))}
            </ButtonGroup>

            <Form.Label htmlFor="nw_lat" className="mt-3">
              Start Time
            </Form.Label>
            <Form.Control
              {...register("startTime")}
              id="startTime"
              placeholder="Mission starts at..."
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

export default CreateMission;
