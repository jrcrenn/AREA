import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";
import { login } from "../../Routes/utils";
import "./LogForm.css";

function LogForm(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [redir, setRedir] = useState(0);
  const mail = event => {
    setEmail(event.target.value);
  };
  const passW = event => {
    setPass(event.target.value);
  };

  const submit = () => {
    axios
      .post("http://localhost:3000/api/user/login", {
        email: email,
        password: pass
      })
      .then(function(response) {
        console.log(response);
        login(response.data.authToken);
        setRedir(1);
      })
      .catch(function(error) {
        console.log(error);
        setRedir(2);
      });
  };
  return (
    <Form>
      {redir === 1 && <Redirect to="/dashboard" />}
      {redir === 2 && <Alert variant="danger">Wrong Email or Password</Alert>}
      <Form.Group>
        <Form.Label className="Typo">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={mail} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="Typo">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={passW} />
      </Form.Group>
      <Button className="LogFormButton" onClick={submit}>
        Submit
      </Button>
    </Form>
  );
}

export default LogForm;
