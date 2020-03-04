import React from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";
import trelloLogo from "Assets/trello.png";
import "./TrelloButton.css";

function LogForm(props) {
  function connect() {
    localStorage.removeItem("trello-token");
    Axios("http://localhost:3000/link/auth/trello", {
      method: "GET"
    })
      .then(res => {
        console.log(res.data);
        localStorage.setItem("service", "Trello");
        window.open(res.data.url, "_blank");
      })
      .catch(err => {
        console.log(err.toString());
      });
  }
  return (
    <Button className="TrelloButton" onClick={connect}>
      <img className="ConnectionLogo" src={trelloLogo} alt=""></img>
      Trello
    </Button>
  );
}

export default LogForm;
