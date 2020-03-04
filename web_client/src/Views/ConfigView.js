import React from "react";
import Form from "../Components/Form";
import Grid from "@material-ui/core/Grid";
import Header from "../Components/Header";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    textCenter: {
        textAlign: 'center',
    },
    cardContainer: {
        minWidth: '500px',
    }
}));


export default function ConfigView(props) {
    const classes = useStyles();

    const validateConfig = (formData) => {
        console.log(formData);
    };

    const builder = [
        {
            name: 'email',
            label: 'E-Mail',
            description: 'Mail description',
            type: 'input',
        },
        {
            name: 'isChecked',
            label: 'Do you want to check',
            description: 'Mail description',
            type: 'checkbox',
        },
    ];

    return (
        <div>
            <Header />
            <Grid container spacing={3} alignItems={"center"} direction={"column"}>
                <Grid item className={classes.textCenter}>
                    <Typography variant={"h2"}>
                        Configure the XXXXXX Services
                    </Typography>
                </Grid>
                <Grid className={classes.cardContainer} item>
                    <Form formBuilder={builder} onValidate={validateConfig} />
                </Grid>
            </Grid>
        </div>
    );
}