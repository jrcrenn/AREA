import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {Collapse} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = makeStyles({
    container: {
        position: 'relative'
    },
    icon: {
        position: 'absolute',
        right: '0px'
    },
    collapse: {
        marginTop: '10px',
        marginBottom: '10px',
    }
});

export default function CollapseItem(props)
{
    const [isCollapsed, setCollapsed] = React.useState(false);
    const collapse = () => {
        setCollapsed(!isCollapsed);
    };
    const classes = styles();

    return (
        <>
        <Grid className={classes.container} container direction={"row"} justify={"space-evenly"}>
            <Typography variant={"h6"} >
                {props.name}
            </Typography>
            <IconButton onClick={collapse} className={classes.icon}>
                {isCollapsed ? <ExpandMore /> : <ExpandLess />}
            </IconButton>
        </Grid>
        <Collapse in={isCollapsed} className={classes.collapse}>
            <Typography>
                {props.description}
            </Typography>
        </Collapse>
        </>
    )
}