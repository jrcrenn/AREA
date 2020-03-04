import React from "react";
import Logo from "Assets/logo.png";
import Form from "Components/Form/SignUpForm/SignForm";
import { Modal } from "react-bootstrap";
import "./SignModal.css";

function SignModal(props) {
  return (
    <Modal className="Modal" {...props}>
      <Modal.Header className="HeadMod">
        <img src={Logo} alt="" className="logoMod"></img>
      </Modal.Header>
      <Modal.Body className="BodyMod">
        <Form></Form>
      </Modal.Body>
    </Modal>
  );
}

export default SignModal;
