import React, { useState } from "react";
import Logo from "Assets/logo.png";
import LogOutModal from "Components/Modal/LogOutModal/LogOutModal";
import ConnectModal from "Components/Modal/ConnectModal/ConnectModal";
import "./Header.css";

function Header(props) {
  const [nshow, nsetShow] = useState(false);
  const [sshow, ssetShow] = useState(false);

  return (
    <div className="Header">
      <img className="Logo" src={Logo} alt=""></img>
      <div className="RightItem">
        <button className="Button" onClick={() => ssetShow(true)}>
          Connect your services
        </button>
        <ConnectModal show={sshow} onHide={() => ssetShow(false)} />
        <button className="Button" onClick={() => nsetShow(true)}>
          Log Out
        </button>
        <LogOutModal show={nshow} onHide={() => nsetShow(false)} />
      </div>
    </div>
  );
}

export default Header;
