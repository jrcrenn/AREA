import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import GridContainer from "Components/components/Grid/GridContainer.js";
import GridItem from "Components/components/Grid/GridItem.js";
import Button from "Components/components/CustomButtons/Button.js";
import Card from "Components/components/Card/Card";
import CardBody from "Components/components/Card/CardBody.js";
import CardHeader from "Components/components/Card/CardHeader.js";
import CardFooter from "Components/components/Card/CardFooter.js";
import CustomInput from "Components/components/CustomInput/CustomInput.js";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import CustomLinearProgress from "Components/components/CustomLinearProgress/CustomLinearProgress.js";
const useStyles = makeStyles(styles);

export default function FacebookForm() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={4}>
          <Card className={classes[cardAnimaton]}>
            <CardHeader color="danger" style={{ textAlign: "center" }}>
              <Button color="transparent">
                <i className={" fab fa-facebook"} style={{ fontSize: 200 }} />
              </Button>
            </CardHeader>
            <CardBody>
              <h5>Veuillez renseigné vos identifiants Facebook</h5>
              <CustomLinearProgress
                variant="determinate"
                color="success"
                value={50}
                style={{ width: "100%", display: "inline-block" }}
              />
              <form>
                <CustomInput
                  labelText="Email"
                  id="Email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Mot de passe"
                  id="pass"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </form>
            </CardBody>
            <CardFooter>
              <Button href={"/slack"} color="success" round>
                <CheckIcon />
                Next
              </Button>
              <Button href={"/slack"} color="danger" round>
                <CancelIcon />
                Ignore
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
