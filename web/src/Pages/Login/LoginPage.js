import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import EmailIcon from "@material-ui/icons/Email";
import AddIcon from "@material-ui/icons/Add";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockIcon from "@material-ui/icons/Lock";
import styles from "assets/jss/material-kit-react/views/loginPage.js";
import Axios from "axios";
import Card from "Components/components/Card/Card";
import CardBody from "Components/components/Card/CardBody";
import CardFooter from "Components/components/Card/CardFooter";
import CardHeader from "Components/components/Card/CardHeader";
import Button from "Components/components/CustomButtons/Button";
import CustomInput from "Components/components/CustomInput/CustomInput";
import GridContainer from "Components/components/Grid/GridContainer";
import GridItem from "Components/components/Grid/GridItem";
import React from "react";

const useStyles = makeStyles(styles);

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const [values, setValues] = React.useState({
    mail: "",
    password: ""
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submit = () => {
    console.log("password: " + values.password);
    console.log("mail: " + values.mail);
    Axios({
      method: "POST",
      url: "http://localhost:3000/api/user/register",
      data: values
    })
      .then(res => {
        localStorage.setItem("auth-token", res.data);
        console.log(localStorage.getItem("auth-token"));
        window.location.href = "/dashboard";
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* {err && (
        <div
          style={{ display: "flex", justifyContent: "center" }}
          className="alert alert-danger"
          role="alert"
        >
          {err}
        </div>
      )} */}
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            <Card className={classes[cardAnimaton]}>
              <CardHeader color="danger" style={{ textAlign: "center" }}>
                <h3>Login</h3>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="Email"
                  id="material"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: values.mail,
                    onChange: handleChange("mail"),
                    endAdornment: (
                      <InputAdornment position="end">
                        <EmailIcon />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Mot de passe"
                  id="material"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: values.password,
                    onChange: handleChange("password"),
                    endAdornment: (
                      <InputAdornment position="end">
                        <LockIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </CardBody>
              <CardFooter>
                <GridContainer justify="center">
                  <GridItem xs={6} sm={6} md={6} justify="center">
                    <Button
                      href={"/dashboard"}
                      color="danger"
                      round
                      onClick={submit}
                    >
                      <ExitToAppIcon />
                      Sign In
                    </Button>
                    <Button href={"/sign-up"} color="danger" round>
                      <AddIcon />
                      Sign Up
                    </Button>
                  </GridItem>
                </GridContainer>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
