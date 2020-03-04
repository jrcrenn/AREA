import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";


export default function CustomButton(props)
{
    const useStyles = makeStyles(theme => ({
        buttonColor: {
            backgroundColor: props.backgroundColor,
            color: props.color || 'white',
            borderRadius: '24px',
            border: `2px solid ${props.backgroundColor}`,
            '&:hover': {
                backgroundColor: props.backgroundHoverColor,
                color: props.hoverColor || 'white',
            }
        },
    }));

    const classes = useStyles();

    return (
        <Button
            size={"large"}
            className={classes.buttonColor}
            startIcon={props.icon}
            onClick={props.onClick}
        >
            {props.children}
        </Button>
    )
}