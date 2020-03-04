import React, { useState } from "react";
import "./ServiceCard.css";
import { Accordion, Card, Button, Form } from "react-bootstrap";
import trelloLogo from "Assets/github.png";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

function GithubCard(props) {
  const [repo, setRepo] = useState("");
  const [mate, setMate] = useState("");

  const createRepo = () => {
    Axios.post("http://localhost:3000/action/github/create", {
      token: localStorage.getItem("github-token"),
      repo: repo
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const deleteRepo = () => {
    Axios.post("http://localhost:3000/action/github/delete", {
      token: localStorage.getItem("github-token"),
      repo: repo
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const addMate = () => {
    Axios.post("http://localhost:3000/action/github/invit", {
      token: localStorage.getItem("github-token"),
      repo: repo,
      user: mate
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const kickMate = () => {
    Axios.post("http://localhost:3000/action/github/kick", {
      token: localStorage.getItem("github-token"),
      repo: repo,
      user: mate
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const transfert = () => {
    Axios.post("http://localhost:3000/action/github/transfer", {
      token: localStorage.getItem("github-token"),
      repo: repo,
      user: mate
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  if (props.id === 3)
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
                    Create a repository!
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="AccordionBody">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Name of your repo"
                        className="AccordionForm"
                        onChange={e => {
                          setRepo(e.target.value);
                        }}
                      />
                      <Button
                        className="AccordionButton"
                        onClick={() => {
                          createRepo();
                        }}
                      >
                        Create my repo!
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
                    Delete a repository!
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="AccordionBody">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Name of your Repo"
                        className="AccordionForm"
                        onChange={e => {
                          setRepo(e.target.value);
                        }}
                      />
                      <Button
                        className="AccordionButton"
                        onClick={() => {
                          deleteRepo();
                        }}
                      >
                        Delete my board!
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
                    Invite a mate on your repo!
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="AccordionBody">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Name of your Repo"
                        className="AccordionForm"
                        onChange={e => {
                          setRepo(e.target.value);
                        }}
                      />
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Name of your Mate"
                        className="AccordionForm"
                        onChange={e => {
                          setMate(e.target.value);
                        }}
                      />
                      <Button
                        className="AccordionButton"
                        onClick={() => {
                          addMate();
                        }}
                      >
                        Add my mate!
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
                    Kick a mate a your repository!
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="AccordionBody">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Name of your Repo"
                        className="AccordionForm"
                        onChange={e => {
                          setRepo(e.target.value);
                        }}
                      />
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Name of your Mate"
                        className="AccordionForm"
                        onChange={e => {
                          setMate(e.target.value);
                        }}
                      />
                      <Button
                        className="AccordionButton"
                        onClick={() => {
                          kickMate();
                        }}
                      >
                        Kick my mate!
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
                    Give repo to a friend!
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey="0">
                    <Card.Body className="AccordionBody">
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Name of your Repo"
                        className="AccordionForm"
                        onChange={e => {
                          setRepo(e.target.value);
                        }}
                      />
                      <Form.Control
                        size="lg"
                        type="text"
                        placeholder="Name of your Mate"
                        className="AccordionForm"
                        onChange={e => {
                          setMate(e.target.value);
                        }}
                      />
                      <Button
                        className="AccordionButton"
                        onClick={() => {
                          transfert();
                        }}
                      >
                        transfer your code!
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

export default GithubCard;
