import React, { useState } from "react";
import "./ServiceCard.css";
import { Accordion, Card, Button, Form } from "react-bootstrap";
import trelloLogo from "Assets/slack.png";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function SlackCard(props) {
  const [mess, setMess] = useState();
  const [conv, setConv] = useState();

  const createConv = () => {
    Axios.post("http://localhost:3000/action/slack/create", {
      token: localStorage.getItem("slack-token"),
      name: conv
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const messConv = () => {
    Axios.post("http://localhost:3000/action/slack/send", {
      token: localStorage.getItem("slack-token"),
      name: conv,
      message: mess
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  if (props.id === 2)
    return (
      <div>
        <Card className="ServiceCard" style={{ width: "60rem" }}>
          <Card.Img className="ImageCard" variant="top" src={trelloLogo} />
          <Card.Body className="BodyCard">
            <Card.Title>{props.title}</Card.Title>
            <Card.Text>
              <Accordion defaultActiveKey="1">
                <Card className="AccordionCard">
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    Create a conversation!
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="AccordionBody">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Name of your conversation"
                        className="AccordionForm"
                        onChange={e => {
                          setConv(e.target.value);
                        }}
                      />
                      <Button
                        className="AccordionButton"
                        onClick={() => {
                          createConv();
                        }}
                      >
                        Create my conversation!
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Card.Text>
            <Card.Text>
              <Accordion defaultActiveKey="1">
                <Card className="AccordionCard">
                  <Accordion.Toggle as={Card.Header} eventKey="0">
                    Send a message to your conversation!
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="AccordionBody">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Your conversation name"
                        className="AccordionForm"
                        onChange={e => {
                          setConv(e.target.value);
                        }}
                      />
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Your conversation name"
                        className="AccordionForm"
                        onChange={e => {
                          setMess(e.target.value);
                        }}
                      />
                      <Button
                        className="AccordionButton"
                        onClick={() => {
                          messConv();
                        }}
                      >
                        Send!
                      </Button>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              </Accordion>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  return null;
}

export default SlackCard;
