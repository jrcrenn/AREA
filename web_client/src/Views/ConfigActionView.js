import React from 'react';
import {useParams} from "react-router-dom";
import Header from "../Components/Header";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
    container: {
        textAlign: 'center',
    },
    title: {
        fontSize: '2.3em'
    }
}));

export default function ConfigActionView() {
    let {service, name} = useParams();

    const classes = useStyles();
    return (
        <>
            <Header/>
            <Grid container direction={"column"} className={classes.container} >
                <Typography className={classes.title} variant={"h2"}>
                    Configure action {name} for the service {service}
                </Typography>
            </Grid>
        </>
    );
}
