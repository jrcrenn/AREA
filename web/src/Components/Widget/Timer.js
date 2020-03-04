import React, { useState } from "react";
import {
  Card,
  Container,
  Dropdown,
  DropdownButton,
  Row,
  Button
} from "react-bootstrap";
import Axios from "axios";
import "./Widget.css";

function Clock(props) {
  const cityArr = [
    "America/Sao_Paulo",
    "Asia/Hong_Kong",
    "Asia/Kuala_Lumpur",
    "Australia/Sydney",
    "Europe/Amsterdam",
    "Europe/Berlin",
    "Europe/Madrid",
    "Europe/Paris",
    "Pacific/Honolulu"
  ];
  const [city, setCity] = useState("Europe/Paris");
  const [time, setTime] = useState();

  const getTime = () => {
    Axios.post("http://localhost:3000/widget/time", {
      city: city
    })
      .then(function(res) {
        console.log(res.data.datetime);
        setTime(res.data.datetime);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  if (props.show === 1) {
    return (
      <div>
        <Card className="WidgetCard">
          <Card.Header className="WeatherWidgetHead">
            <Container>
              <Row>
                <h5>Time in {city}</h5>
              </Row>
              <Row>{time}</Row>
            </Container>
          </Card.Header>
          <Card.Body className="WeatherWidgetBody">
            <Row>
              <DropdownButton className="DropDownTime" title={city}>
                {cityArr.map(cityArr => (
                  <Dropdown.Item
                    className="DropDownTime"
                    onClick={() => {
                      setCity(cityArr);
                    }}
                  >
                    {cityArr}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Row>
            <Button className="AccordionButton" onClick={getTime}>
              Get Time!
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
  return null;
}

export default Clock;
