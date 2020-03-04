import React from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";
import githubLogo from "Assets/github.png";
import "../TrelloButton/TrelloButton.css";

function LogForm(props) {
  function connect() {
    Axios("http://localhost:3000/link/auth/github", {
      method: "GET"
    })
      .then(res => {
        console.log(res.data);
        localStorage.setItem("service", "Github");
        window.open(res.data.url, "_blank");
      })
      .catch(e => {
        console.log(e.toString());
      });
    /*localStorage.removeItem("trello-token");
    Axios("http://localhost:3000/link/auth/trello", {
      method: "GET"
    })
      .then(res => {
        console.log(res.data);
        localStorage.setItem('service', 'Trello');
        window.open(res.data.url, "_blank");
      })
      .catch(err => {
        console.log(err.toString());
      });*/
  }
  return (
    <Button className="TrelloButton" onClick={connect}>
      <img className="ConnectionLogo" src={githubLogo} alt=""></img>
      Github
    </Button>
  );
}

export default LogForm;
