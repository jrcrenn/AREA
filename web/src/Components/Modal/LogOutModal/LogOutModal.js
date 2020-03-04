import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Modal, Container } from "react-bootstrap";
import { logout } from "../../Routes/utils";
import "../LogOutModal/LogOutModal.css";

function LogOutModal(props) {
  const [log, setLog] = useState(0);

  const logOut = () => {
    logout(localStorage.getItem("accessToken"));
    setLog(1);
  };

  return (
    <Modal className="DisconnectModal" {...props}>
      {log === 1 && <Redirect to="/" />}
      <Modal.Header className="DisconnectHeadMod">
        Do you really want to Log Out?
      </Modal.Header>
      <Modal.Body className="DisconnectBodyMod">
        <Container className="DisconnectServiceCard">
          <button className="TrelloButton" onClick={logOut}>
            Yes
          </button>
          <button className="TrelloButton" onClick={props.onHide}>
            No
          </button>
        </Container>
      </Modal.Body>
    </Modal>
  );
}

export default LogOutModal;
