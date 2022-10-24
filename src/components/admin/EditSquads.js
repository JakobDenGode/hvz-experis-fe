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
    console.log("delete");
  }

  return (
    <div>
      <Form className="bg-secondary rounded mt-3 mb-3">
        <h2 className="text-center">Game</h2>

        <Container>
          <Row>
            <Col className="border text-center" xs={4}>
              Squad
            </Col>
            <Col className="border text-center" xs={4}>
              Total members
            </Col>
            <Col className="border text-center" xs={4}>
              Change
            </Col>
          </Row>
          <SquadListAdmin
            squads={squads}
            onShowSquadForm={changeArray}
            onDeleteSquad={deleteSquad}
          />
        </Container>
      </Form>
      <Button className="w-100 border-danger bg-danger">Delete Squad</Button>
    </div>
  );
}

export default EditSquads;
