import React, { useState } from "react";
import Logo from "Assets/logo.png";
import LogModal from "Components/Modal/LogModal/LogModal";
import SignModal from "Components/Modal/SignModal/SignModal";
import "./UnHeader.css";

function UnHeader(props) {
  const [show, setShow] = useState(false);
  const [nshow, nsetShow] = useState(false);
  return (
    <div className="UnHeader">
      <img className="Logo" src={Logo} alt=""></img>
      <div className="RightItem">
        <button className="Button" onClick={() => setShow(true)}>
          Log In
        </button>
        <LogModal show={show} onHide={() => setShow(false)} />
        <button className="Button" onClick={() => nsetShow(true)}>
          Sign Up
        </button>
        <SignModal show={nshow} onHide={() => nsetShow(false)} />
      </div>
    </div>
  );
}

export default UnHeader;
