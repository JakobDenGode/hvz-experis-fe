import React from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { createHeaders } from "../admin/CreateHeaders";

function EditGame() {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const gameId = useParams();

  //Delete a game
  let deleteGame = async () => {
    const accessToken = await getAccessTokenSilently();
    await fetch(
      `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}`,
      {
        headers: createHeaders(accessToken),
        method: "DELETE",
      }
    );
    navigate("/");
    console.log("deleted");
  };

  

  return (
    <div>
      <Button className="w-100">Edit game</Button>
      <Form className="bg-secondary rounded mt-3 mb-3">
        <h2 className="text-center">Game</h2>

        <Container>
          <Row>
            <Col className="border text-center" xs={4}>
              Player
            </Col>
            <Col className="border text-center" xs={4}>
              Status
            </Col>
            <Col className="border text-center" xs={4}>
              Change
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col xs={4}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Row>
        </Container>
      </Form>
      <Button className="w-100 border-danger bg-danger" onClick={deleteGame}>
        Delete current game
      </Button>
    </div>
  );
}

export default EditGame;
