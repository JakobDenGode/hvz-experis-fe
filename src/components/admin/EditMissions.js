import React from "react";
import { Form, Button, Col, Container, Row } from "react-bootstrap";

function EditMissions() {
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
      <Button className="w-100 border-danger bg-danger">Delete mission</Button>
    </div>
  );
}

export default EditMissions;
