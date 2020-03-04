import React from "react";
import Logo from "Assets/logo.png";
import Form from "Components/Form/LogForm/LogForm";
import { Modal } from "react-bootstrap";
import "./LogModal.css";

function LogModal(props) {
  return (
    <Modal className="Modal" {...props}>
      <Modal.Header className="HeadMod">
        <img src={Logo} alt="" className="logoMod"></img>
      </Modal.Header>
      <Modal.Body className="LogBodyMod">
        <Form></Form>
      </Modal.Body>
    </Modal>
  );
}

export default LogModal;
