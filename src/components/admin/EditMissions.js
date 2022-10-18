import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import MissionList from "../mission-list/MissionList";
import { createHeaders } from "./CreateHeaders";

function EditMissions() {
  const gameId = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [missions, setMissions] = useState([]);

  useEffect(() => {
    const findMissions = async () => {
      const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/missions/32`;
      const accessToken = await getAccessTokenSilently();
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: createHeaders(accessToken),
        });
        //if (!response.ok) throw new Error("Could not complete request");
        const missions = await response.json();
        console.log(missions);
        setMissions(missions);
      } catch (error) {
        return [error.message, []];
      }
    };
    findMissions();
  }, []);

  return (
    <div>
      <Form className="bg-secondary rounded mt-3 mb-3">
        <h2 className="text-center">Game</h2>

        <Container>
          <Row>
            <Col className="border text-center" xs={4}>
              Mission
            </Col>
            <Col className="border text-center" xs={4}>
              Description
            </Col>
            <Col className="border text-center" xs={4}>
              Change
            </Col>
          </Row>
          <MissionList missions={missions} />
        </Container>
      </Form>
      <Button className="w-100 border-danger bg-danger">Delete mission</Button>
    </div>
  );
}

export default EditMissions;
