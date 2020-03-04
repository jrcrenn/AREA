import GoogleLogin from 'react-google-login';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import emailValidate from "../Utils/EmailValid";
import {FormControlLabel} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import CustomButton from "../Components/CustomButton";
import ApiService from '../Services/ApiService';
import { useCookies } from 'react-cookie';
import Auth from '../Utils/Auth';

function onSignIn(googleUser)
{
    const profile = googleUser.getBasicProfile();

    console.log('Name: ' + profile.getName());
    const token = googleUser.getAuthResponse().id_token;

    console.log('Google token : ' + token);

    //TODO: Send token to back-end
}

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Team Gade
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://www.blogenium.com/wp-content/uploads/2019/08/blogenium-cool-technologies-wallpapers-18.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    facebook: {
        backgroundColor: 'blue',
        color: 'white',
        '&:hover': {
            backgroundColor: 'blue',
            color: 'white',
        },
    }
}));

export default function LoginView() {
    //TODO: Error management on Google login / Facebook login

    const componentClicked = () => {console.log('zozo');};
    const responseFacebook = (response) => {console.log(response);};

    const [, setCookies] = useCookies(['token']);
    const [state, setState] = React.useState({
        emailValid: true,
        passwordValid: true,
        email: '',
        password: '',
        rememberMe: false,
    });

    const classes = useStyles();

    const onEmailChange = (e) => {
        const mail = e.target.value;
        console.log(mail);
        const isValid = emailValidate(mail);
        if (isValid) {
            setState({...state, emailValid: true, email: mail});
        } else {
            setState({...state, emailValid: false, email: mail});
        }
    };

    const loginAction = (e) => {
        e.preventDefault();

        const fetchData = async (email, password) => {
            const response = await ApiService.login(email, password);
            if (response.success === true) {
                setCookies('token', response.token, {path: '/'});
                Auth.authenticate();
                window.location.href = '/home';
            } else {
                alert(response.error);
            }
        }

        if (state.emailValid && state.passwordValid && state.email.trim() !== '' && state.password.trim() !== '') {
            fetchData(state.email, state.password);
        } else {
            alert('mabite')
        }
    };

    const onPasswordChange = (e) => {
        const pass = e.target.value;
        setState({...state, password: pass});
    };

    const onRememberChange = (e) => {
        setState({...state, rememberMe: e.target.checked});
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={!state.emailValid}
                            onChange={e => onEmailChange(e)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={!state.passwordValid}
                            onChange={e => onPasswordChange(e)}
                        />
                        <FormControlLabel onChange={e => onRememberChange(e)} control={<Checkbox />} label={"Remember me"} />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={e => loginAction(e)}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/" variant="body2">
                                    {"Not already have an account? Sign Up"}
                                </Link>
                            </Grid>
                            <Grid container spacing={3} justify={"center"}>
                                <Grid item>
                                    <GoogleLogin
                                        clientId="12906168737-9v1ildio54gfsic452snnvubv5j8nkm5.apps.googleusercontent.com"
                                        buttonText={"Login with google"}
                                        onSuccess={onSignIn}
                                        onFailure={onSignIn}
                                        render={ renderProps => (
                                            <CustomButton onClick={renderProps.onClick} color={'white'} backgroundColor={'red'} hoverColor={'red'} backgroundHoverColor={'white'}>
                                                Login with google
                                            </CustomButton>
                                        )}
                                        className={classes.googleButton}
                                    />
                                </Grid>
                                <Grid item>
                                    <FacebookLogin
                                        appId="2546265472152778"
                                        autoLoad={false}
                                        fields="name,email,picture"
                                        onClick={componentClicked}
                                        callback={responseFacebook}
                                        render={ renderProps => (
                                            <CustomButton onClick={renderProps.onClick} color={'white'} backgroundColor={'blue'} hoverColor={'blue'} backgroundHoverColor={'white'}>
                                                Login with Facebook
                                            </CustomButton>
                                        )}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}