import React from "react";
import "./LandingPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Nav } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";
import CardBody from "Components/components/Card/CardBody";
import GridContainer from "Components/components/Grid/GridContainer.js";
import GridItem from "Components/components/Grid/GridItem.js";
import NavPills from "Components/components/NavPills/NavPills.js";
import CardHeader from "Components/components/Card/CardHeader.js";
import Button from "Components/components/CustomButtons/Button.js";
import Slack from "assets/img/slack.png";
import Trello from "assets/img/trello.png";
import Plus from "assets/img/plus.png";
import Github from "assets/img/github.png";
import Epitech from "assets/img/epitech.png";

import {
  cardTitle,
  cardLink,
  cardSubtitle
} from "assets/jss/material-kit-react.js";

const styles = {
  cardTitle,
  cardLink,
  cardSubtitle
};
const useStyles = makeStyles(styles);

export default function LandingPage(props) {
  const classes = useStyles();
  return (
    <div class="main">
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="danger" style={{ textAlign: "center" }}>
              <h1>Create a Zap</h1>
            </CardHeader>
            <div class="cardzap">
              <h4 className={classes.cardTitle}>Slack to Trello</h4>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={3}>
                  <img src={Slack} height="100" />
                  {/* <img src={Slack} height="100" /> */}
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <img src={Plus} height="100" />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <img
                    src={Trello}
                    className={
                      classes.imgRoundedCircle + " " + classes.imgFluid
                    }
                    height="100"
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Button style={{ background: "#e63b37" }}>Try this!</Button>
                </GridItem>
              </GridContainer>
            </div>
            <div class="cardzap">
              <h4 className={classes.cardTitle}>Github to Slack</h4>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={3}>
                  <img src={Github} height="100" />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <img src={Plus} height="100" />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <img src={Slack} height="100" />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Button style={{ background: "#e63b37" }}>Try this!</Button>
                </GridItem>
              </GridContainer>
            </div>
            <div class="cardzap">
              <h4 className={classes.cardTitle}>Intra Epitech to Github</h4>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={3}>
                  <img src={Epitech} height="100" />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <img src={Plus} height="100" />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <img src={Github} height="100" />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={12}
                  md={3}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Button style={{ background: "#e63b37" }}>Try this!</Button>
                </GridItem>
              </GridContainer>
            </div>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card color="warning">
            <NavPills
              color="danger"
              tabs={[
                {
                  color: "danger",
                  tabButton: "MyZap",
                  tabContent: (
                    <span>
                      <p>Here put history of all zap of user</p>
                      <p>APP|TRIGER|APP|DATE</p>
                    </span>
                  )
                },
                {
                  tabButton: "Settings",
                  tabContent: <span></span>
                },
                {
                  tabButton: "Options",
                  tabContent: <span></span>
                }
              ]}
            />
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
