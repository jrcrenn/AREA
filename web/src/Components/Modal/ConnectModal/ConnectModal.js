import React, { useEffect, useState } from "react";
import { Modal, Container } from "react-bootstrap";
import ConnectMarquer from "Components/Modal/ConnectModal/ConnectMarquer";
import "./ConnectModal.css";
import TrelloButton from "../../Button/TrelloButton/TrelloButton";
import GithubButton from "../../Button/GithubButton/GithubButton";
import YammerButton from "../../Button/YammerButton/YammerButton";
import TwitchButton from "../../Button/TwitchButton/TwitchButton";
import SlackButton from "../../Button/SlackButton/SlackButton";
import FacebookButton from "../../Button/FacebookButton/FacebookButton";
import Axios from "axios";

function ConnectModal(props) {
  const [trelloCo, setTrelloCo] = useState(false);
  const [yammerCo, setYammerCo] = useState(false);
  const [githubCo, setGithubCo] = useState(false);
  const [twitchCo, setTwitchCo] = useState(false);
  const [slackCo, setSlackCo] = useState(false);
  const [facebookCo, setFacebookCo] = useState(false);

  function setYammerToken() {
    if (
      localStorage.getItem("service") !== null &&
      localStorage.getItem("service") === "Yammer"
    ) {
      let token = window.location.href.split("=");
      Axios("http://localhost:3000/link/access/yammer", {
        method: "POST",
        data: {
          code: token[1]
        }
      })
        .then(res => {
          console.log(res.data.yammer_token);
          localStorage.setItem("yammer-token", res.data.yammer_token);
          localStorage.removeItem("service");
          window.close();
          window.reload();
        })
        .catch(err => {
          console.log(err.toString);
        });
    }
  }

  function setSlackToken() {
    if (
      localStorage.getItem("service") !== null &&
      localStorage.getItem("service") === "Slack"
    ) {
      const token = window.location.href.split("&");
      const hash = token[0].split("=");
      console.log(hash[1]);
      Axios("http://localhost:3000/link/access/slack", {
        method: "POST",
        data: {
          code: hash[1]
        }
      })
        .then(res => {
          console.log(res.data.slack_token);
          localStorage.setItem("slack-token", res.data.slack_token);
          localStorage.removeItem("service");
          window.close();
          window.reload();
        })
        .catch(err => {
          console.log(err.toString());
        });
    }
  }

  function setTwitchToken() {
    if (
      localStorage.getItem("service") !== null &&
      localStorage.getItem("service") === "Twitch"
    ) {
      let token = window.location.href.split("&");
      console.log(token);
      let hash = token[0].split("=");
      console.log(hash);
      Axios("http://localhost:3000/link/access/twitch", {
        method: "POST",
        data: {
          code: hash[1]
        }
      }).then(res => {
        console.log(res.data.twitch_token);
        localStorage.setItem("twitch-token", res.data.twitch_token);
        localStorage.removeItem("service");
        window.close();
        window.reload();
      });
    }
  }

  function setFacebookToken() {
    if (
        localStorage.getItem('service') != null &&
        localStorage.getItem('service') === 'Facebook'
    ) {
        let token = window.location.href.split('?');
        console.log(token);
        let hash = token[1].split('code=');
        console.log(hash);
        Axios('http://localhost:3000/link/access/facebook', {
          method: 'POST',
          data: {
            code: hash[1]
          }
        })
            .then(res => {
              console.log(res.data.facebook_token);
              localStorage.setItem('facebook-token', res.data.facebook_token);
              localStorage.removeItem('service');
              window.close();
              window.reload();
            })
    }
  }

  useEffect(() => {
    setSlackToken();
    setTwitchToken();
    setYammerToken();
    setFacebookToken();
    if (localStorage.getItem("trello-token") !== null) setTrelloCo(true);
    if (localStorage.getItem("github-token") !== null) setGithubCo(true);
    if (localStorage.getItem("twitch-token") !== null) setTwitchCo(true);
    if (localStorage.getItem("slack-token") !== null) setSlackCo(true);
    if (localStorage.getItem("yammer-token") !== null) setYammerCo(true);
    if (localStorage.getItem("facebook-token") !== null) setFacebookCo(true);
    if (
      localStorage.getItem("service") !== null &&
      localStorage.getItem("service") === "Trello"
    ) {
      let token = window.location.hash.substr(1);
      const splitedToken = token.split("=");
      localStorage.setItem("trello-token", splitedToken[1]);
      localStorage.removeItem("service");
      window.close();
      window.location.reload();
    }
    if (
      localStorage.getItem("service") !== null &&
      localStorage.getItem("service") === "Github"
    ) {
      let token = window.location.href.split("=");
      Axios("http://localhost:3000/link/access/github", {
        method: "POST",
        data: {
          code: token[1]
        }
      })
        .then(res => {
          localStorage.setItem("github-token", res.data.github_token);
          localStorage.removeItem("service");
          window.close();
          window.reload();
        })
        .catch(err => {
          console.log(err.toString());
        });
    }
  }, []);
  return (
    <Modal className="ConnectModal" {...props}>
      <Modal.Header className="ConnectHeadMod">
        Here you can connect to all your services
      </Modal.Header>
      <Modal.Body className="ConnectBodyMod">
        <Container className="ConnectServiceCard">
          <TrelloButton></TrelloButton>
          <ConnectMarquer connect={trelloCo}></ConnectMarquer>
        </Container>
        <Container className="ConnectServiceCard">
          <GithubButton></GithubButton>
          <ConnectMarquer connect={githubCo}></ConnectMarquer>
        </Container>
        <Container className="ConnectServiceCard">
          <YammerButton></YammerButton>
          <ConnectMarquer connect={yammerCo}></ConnectMarquer>
        </Container>
        <Container className="ConnectServiceCard">
          <TwitchButton></TwitchButton>
          <ConnectMarquer connect={twitchCo}></ConnectMarquer>
        </Container>
        <Container className="ConnectServiceCard">
          <SlackButton></SlackButton>
          <ConnectMarquer connect={slackCo}></ConnectMarquer>
        </Container>
        <Container className="ConnectServiceCard">
          <FacebookButton></FacebookButton>
          <ConnectMarquer connect={facebookCo}></ConnectMarquer>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default ConnectModal;
