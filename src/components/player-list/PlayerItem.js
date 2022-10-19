import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

function PlayerItem({ id, state, onToggleClick }) {
  function deletePlayer() {}
  return (
    <>
      <Col className="my-2 mx-auto" xs={4}>
        <p>{id}</p>
      </Col>
      <Col className="my-2 mx-auto" xs={4}>
        <p>{state ? "human" : "zombie"}</p>
      </Col>
      <Col
        className="my-2 mx-auto d-flex justify-content-between align-items-center"
        xs={4}
      >
        <label className="switch">
          <Form.Control
            onChange={() => onToggleClick(id)}
            checked={state}
            type="checkbox"
            id="featured"
          />
          <span className="slider round"></span>
        </label>
        <span onClick={deletePlayer} className="fs-2 pb-1">
          &times;
        </span>
      </Col>
    </>
  );
}

export default PlayerItem;
