import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Alert } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { login } from "../../Routes/utils";
import "./SignForm.css";

function SignForm(props) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [lastname, setLname] = useState("");
  const [firstname, setFname] = useState("");
  const [redir, setRedir] = useState(0);

  const mail = event => {
    setEmail(event.target.value);
  };
  const passW = event => {
    setPass(event.target.value);
  };
  const Fname = event => {
    setFname(event.target.value);
  };
  const Lname = event => {
    setLname(event.target.value);
  };

  const submit = () => {
    console.log(
      "email:",
      email,
      "pass:",
      pass,
      "last:",
      lastname,
      "first:",
      firstname
    );
    axios
      .post("http://localhost:3000/api/user/register", {
        email: email,
        password: pass,
        lastname: lastname,
        firstname: firstname
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
        <Form.Label className="Typo">Nom</Form.Label>
        <Form.Control type="lastname" placeholder="LastName" onChange={Lname} />
      </Form.Group>
      <Form.Group>
        <Form.Label className="Typo">Prénom</Form.Label>
        <Form.Control
          type="firstname"
          placeholder="FirstName"
          onChange={Fname}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="Typo">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={mail} />
      </Form.Group>
      <Form.Group controlId="formBasicPassword">
        <Form.Label className="Typo">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={passW} />
      </Form.Group>

      <Button onClick={submit}>Submit</Button>
    </Form>
  );
}

export default SignForm;
