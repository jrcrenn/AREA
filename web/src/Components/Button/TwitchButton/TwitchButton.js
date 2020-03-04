import React from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";
import twitchLogo from "Assets/twitch.png";
import "../TrelloButton/TrelloButton.css";

function LogForm(props) {
  function connect() {
    Axios("http://localhost:3000/link/auth/twitch", {
      method: "GET"
    })
      .then(res => {
        console.log(res.data);
        localStorage.setItem("service", "Twitch");
        window.open(res.data.url, "_blank");
      })
      .catch(e => {
        console.log(e.toString());
      });
  }
  return (
    <Button className="TrelloButton" onClick={connect}>
      <img className="ConnectionLogo" src={twitchLogo} alt=""></img>
      Twitch
    </Button>
  );
}

export default LogForm;
