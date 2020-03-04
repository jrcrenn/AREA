import FormControl from "@material-ui/core/FormControl";
import {InputLabel} from "@material-ui/core";
import Input from "@material-ui/core/Input";
import FormHelperText from "@material-ui/core/FormHelperText";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
    root: {
        padding: 'auto',
    }
}));

export default function CustomInput(props) {
    const classes = useStyles();

    return (
        <FormControl className={classes.root}>
            <InputLabel>{props.label}</InputLabel>
            <Input name={props.name} value={props.value} onChange={props.onChange}/>
            {props.description ?? <FormHelperText>{props.description}</FormHelperText>}
        </FormControl>
    )
}
