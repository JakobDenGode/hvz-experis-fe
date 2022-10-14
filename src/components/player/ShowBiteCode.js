import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { usePlayer } from "../../context/PlayerContext";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function showBiteCode() {
    if (player.type === "human") {
      setDisplayHumanCode(!displayHumanCode);
    } else {
      setDisplayZombieCode(!displayZombieCode);
    }
  }

  async function onSubmit(data, e) {
    console.log(data);
  }

  return (
    <div>
      {player && (
        <Button
          onClick={showBiteCode}
          className={`${
            player.type === "zombie" ? "btn-secondary" : "btn-primary"
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
        </Form>
      </div>
    </div>
  );
}

export default ShowBiteCode;
