import React from 'react';
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import RegisterView from "./Views/RegisterView";
import LoginView from "./Views/LoginView";
import HomeView from "./Views/HomeView";
import {useCookies} from 'react-cookie';
import AreaView from './Views/AreaView';
import ApiService from './Services/ApiService';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";
import ServiceView from "./Views/ServiceView";
import ConfigView from "./Views/ConfigView";
import { CircularProgress } from '@material-ui/core';
import ConfigActionView from "./Views/ConfigActionView";

const NoLogRoute = ({isAuth, component: Component, ...rest}) => (
    <Route
        {...rest}
        render={props => isAuth ? (<Redirect to={{pathname: "/home"}} /> )
        : (<Component {...props} />)}
        />
);

const PrivateRoute = ({isAuth, component: Component, ...rest}) => (
    <Route
    {...rest}
    render={props => isAuth ? (<Component {...props} />) : (<Redirect to={{pathname: "/"}} /> )}
    />
);

function App() {
    const theme = createMuiTheme({});

    const [cookies] = useCookies(['token']);
    const [isAuth, setAuth] = React.useState(false);
    const [isLoaded, setLoaded] = React.useState(false);
    const token = cookies.token;

    const verifyToken = async (token) => {
        const response = await ApiService.verifyToken(token);
        if (response.success === true) {
            setAuth(true);
            console.log('le zizi');
        } else {
            console.log('le caca');
            console.log(response);
        }
        setLoaded(true);
    };

    console.log('Is Auth ? : ', isAuth);

    React.useEffect(() => {
        verifyToken(token);
        // eslint-disable-next-line
    }, []);

    return (
        isLoaded ? 
    <MuiThemeProvider theme={theme}>
        <Router>
            <Switch>
                <NoLogRoute exact path="/" component={RegisterView} isAuth={isAuth}/>
                <NoLogRoute path="/login" component={LoginView} isAuth={isAuth}/>
                <PrivateRoute path="/home" component={HomeView} isAuth={isAuth}/>
                <PrivateRoute path="/service/:name" component={ServiceView} isAuth={isAuth}/>
                <PrivateRoute path="/config" component={ConfigView} isAuth={isAuth}/>
                <PrivateRoute path="/area" component={AreaView} isAuth={isAuth} />
                <PrivateRoute path="/action/:service/:name" component={ConfigActionView} isAuth={isAuth} />
            </Switch>
        </Router>
    </MuiThemeProvider>
    :
    <CircularProgress />
  );
}

export default App;
