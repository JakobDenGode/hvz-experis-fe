import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import SquadListAdmin from "../squad-list/SquadListAdmin";
import { createHeaders } from "./CreateHeaders";

function EditSquads() {
  const gameId = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [squads, setSquads] = useState([]);

  useEffect(() => {
    const findSquads = async () => {
      const apiUrl = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/squads`;
      const accessToken = await getAccessTokenSilently();
      try {
        const squadList = await fetch(apiUrl, {
          method: "GET",
          headers: createHeaders(accessToken),
        });
        const squadListResult = await squadList.json();
        console.log(squadListResult);
        setSquads(squadListResult);
      } catch (error) {
        return [error.message, []];
      }
    };
    findSquads();
  }, []);

  function changeArray(id, formData) {
    console.log("change");
  }

  function deleteSquad(id) {
    console.log(id);
    const newSquads = squads.filter((squad) => {
      if (id !== squad.id) {
        return squad;
      }
    });
    const deleteSquad = async () => {
      const apiUrl2 = `${process.env.REACT_APP_API_SERVER_URL}games/${gameId.gameId}/squad/${id}`;
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
    deleteSquad();
    setSquads(newSquads);
  }

  return (
    <div>
      <Form className="bg-secondary bg-dark text-light rounded mt-3 mb-3">
        <h2 className="text-center p-3">Game</h2>

        <Container>
          <Row className="fs-4 border-bottom">
            <Col className="text-center fs-4" xs={4}>
              Squad
            </Col>
            <Col className="text-center fs-4" xs={4}>
              Total members
            </Col>
            <Col className="text-center fs-4" xs={4}>
              Change
            </Col>
          </Row>
          <SquadListAdmin
            squads={squads}
            //onShowSquadForm={changeArray}
            onDeleteSquad={deleteSquad}
          />
        </Container>
      </Form>
      <Button className="w-100 border-danger bg-danger">Delete Squad</Button>
    </div>
  );
}

export default EditSquads;
