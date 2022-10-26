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
  const [displayModalForm, setDisplayModalForm] = useState(false);

  useEffect(() => {
    const findMissions = async () => {
      const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/missions/9`;
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

  function changeArray(id, formData) {
    console.log(id);
    console.log(formData);
    if (formData) {
      console.log("hi");
      const newMissions = missions.map((mission) => {
        return mission;
      });
      console.log(newMissions);
      //setMissions(newMissions);
    }
  }

  function deleteMission(id) {
    console.log(id);
    const newMissions = missions.filter((mission) => {
      if (id !== mission.id) {
        return mission;
      }
    });
    const deleteMission = async () => {
      const apiUrl2 = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/missions/${id}`;
      const accessToken = await getAccessTokenSilently();
      try {
        const response = await fetch(apiUrl2, {
          method: "DELETE",
          headers: createHeaders(accessToken),
        });
        console.log(response);
      } catch (error) {
        console.log(error);
        return [error.message, []];
      }
    };
    deleteMission();
    setMissions(newMissions);
  }
  console.log(missions);
  return (
    <div>
      <div className="bg-secondary rounded mt-3 mb-3">
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
          <MissionList
            missions={missions}
            onShowEditForm={changeArray}
            onDeleteMission={deleteMission}
          />
        </Container>
      </div>
      <Button className="w-100 border-danger bg-danger">Delete mission</Button>
    </div>
  );
}

export default EditMissions;
