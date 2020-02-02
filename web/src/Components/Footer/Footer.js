import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { form, Nav, Button } from "react-bootstrap";

export default function Footer(props) {
  return (
    <nav class="navbar fixed-bottom bg-white d-flex justify-content-around">
      <a class="text-muted" href="#">
        Home
      </a>
      <a class="text-muted" href="#">
        About Us
      </a>
    </nav>
  );
}
