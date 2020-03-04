import React, { useState } from "react";
import Navbar from "Components/Header/Navbar";
import { Container, Row, Col, Button } from "react-bootstrap";
import Weather from "Components/Widget/Weather";
import "./Login.css";

function Login(...props) {
  const [showWeather, setShowW] = useState(false);
  const [showTime, setShowT] = useState(false);
  const [showSat, setShowS] = useState(false);

  const handleShowW = () => {
    if (showWeather === false) {
      setShowW(true);
    } else setShowW(false);
  };

  const handleShowT = () => {
    if (showTime === false) {
      setShowT(true);
    } else setShowT(false);
  };

  const handleShowS = () => {
    if (showSat === false) {
      setShowS(true);
    } else setShowS(false);
  };

  return (
    <div>
      <Navbar props={false} />
      <Row className="noRow">
        <Col className="middleC" xs={11}>
          <Weather lol={"Weather"} show={showWeather} />
          <Weather lol={"Time"} show={showTime} />
          <Weather lol={"Satelite"} show={showSat} />
        </Col>
        <Col className="noCol" xs={1}>
          <Container className="rightC">
            <Button className="buttonWidget" onClick={handleShowW}>
              Weather
            </Button>
            <Button className="buttonWidget" onClick={handleShowT}>
              Time
            </Button>
            <Button className="buttonWidget" onClick={handleShowS}>
              Satelite
            </Button>
            <Button className="buttonWidget" onClick={handleShowS}>
              Steam
            </Button>
          </Container>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
