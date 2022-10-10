import React from "react";
import { Button, Col, Container, Form, Row, Table } from "react-bootstrap";

function EditGame() {
  return (
    <div>
      <Button className="w-100">Create game</Button>
      <Form className="bg-secondary rounded mt-3 mb-3">
        <h2 className="text-center">Game</h2>

        <Container>
          <Row>
            <Col xs={4}>Player</Col>
            <Col xs={4}>Status</Col>
            <Col xs={4}>Change stat</Col>
          </Row>
          <Row>
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
