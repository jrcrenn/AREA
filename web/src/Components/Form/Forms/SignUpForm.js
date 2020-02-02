import React from "react";
import Axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import People from "@material-ui/icons/People";
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

export default function SighUpForm() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [values, setValues] = React.useState({
    firstName: "",
    lastName: "",
    mail: "",
    password: ""
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const submit = () => {
    console.log("password: " + values.password);
    console.log("mail: " + values.mail);
    console.log("firstName: " + values.firstName);
    console.log("lastName: " + values.lastName);
    Axios({
      method: "POST",
      url: "http://localhost:3000/api/user/register",
      data: values
    })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
              <h1>Sign-Up</h1>
            </CardHeader>
            <CardBody>
              <h5>Veuillez renseigné vos informations</h5>
              <CustomLinearProgress
                variant="determinate"
                color="success"
                value={25}
                style={{ width: "100%", display: "inline-block" }}
              />
              <form>
                <CustomInput
                  labelText="Prénom"
                  id="Firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: values.firstName,
                    onChange: handleChange("firstName"),
                    endAdornment: (
                      <InputAdornment position="end">
                        <People />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Nom"
                  id="Lastname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    value: values.lastName,
                    onChange: handleChange("lastName"),
                    endAdornment: (
                      <InputAdornment position="end">
                        <People />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Email"
                  id="Email"
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
                  id="pass"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    type: "Password",
                    value: values.password,
                    onChange: handleChange("password"),
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
              <Button color="success" onClick={submit} round>
                <CheckIcon />
                Next
              </Button>
              <Button href={"/"} color="danger" round>
                <CancelIcon />
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
