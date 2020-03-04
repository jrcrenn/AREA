import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import {useCookies} from 'react-cookie';
import {Link} from "react-router-dom";
import CustomButton from "./CustomButton";

const styles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    title: {
        flexGrow: 1,
        fontWeight: '800',
        letterSpacing: '2px',
        color: 'white',
    },
    linkLabel: {
        fontWeight: '800',
        letterSpacing: '2px',
        color: 'white',
        padding: '10px',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
});

function Header() {
    const classes = styles();

    const [, , removeCookie] = useCookies(['token']);

    const logout = () => {
        removeCookie('token');
        window.location.reload();
    }

    return(
        <div className={classes.root}>
            <AppBar position="static" classes={{root: classes.appBar}}>
                <Toolbar>
                    <IconButton edge="start" aria-label="menu" />
                    <Typography variant="h6" className={classes.title}>
                        AREA
                    </Typography>
                    <Typography variant="h6" className={classes.linkLabel}>
                        <CustomButton hoverColor={'white'} backgroundHoverColor={'#3f51b5'} color={'#3f51b5'} backgroundColor={'white'}>
                            <Link to={"/profile"} className={classes.link}>
                                My Profile
                            </Link>
                        </CustomButton>
                    </Typography>
                    <Typography variant="h6" className={classes.linkLabel}>
                        <CustomButton hoverColor={'white'} backgroundHoverColor={'#3f51b5'} color={'#3f51b5'} backgroundColor={'white'}>
                            <Link to={"/services"} className={classes.link}>
                                Services
                            </Link>
                        </CustomButton>
                    </Typography>
                    <Typography variant="h6" className={classes.linkLabel}>
                        <CustomButton hoverColor={'white'} backgroundHoverColor={'#3f51b5'} color={'#3f51b5'} backgroundColor={'white'} onClick={logout}>
                            Logout
                        </CustomButton>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Header;