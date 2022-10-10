import React from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

function EditGame() {
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
      <Button className="w-100 border-danger bg-danger">Delete game</Button>
    </div>
  );
}

export default EditGame;
