import React from "react";
import { Badge } from "react-bootstrap";
import "./ConnectModal.css";

function ConnectMarquer(props) {
  if (!props.connect) {
    return (
      <div>
        <Badge variant="danger" className="ConnectionMarquer">
          Not Connected
        </Badge>
      </div>
    );
  }
  return (
    <div>
      <Badge variant="success" className="ConnectionMarquer">
        Connected
      </Badge>
    </div>
  );
}

export default ConnectMarquer;
