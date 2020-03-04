import React from "react";
import Header from "Components/Header/Header";
import UnHeader from "Components/Header/UnHeader";

function Navbar(props) {
  if (props.props === true) {
    return <Header></Header>;
  } else {
    return <UnHeader></UnHeader>;
  }
}

export default Navbar;
