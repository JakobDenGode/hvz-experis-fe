import React from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

function EditSquads() {
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
      <Button className="w-100 border-danger bg-danger">Delete Squad</Button>
    </div>
  );
}

export default EditSquads;
