import React from "react";
import Home from "./Pages/Login/LoginPage";
import Signup from "./Pages/Signup/Signup";
import Header from "Components/components/Header/Header";
import HeaderLinks from "Components/components/Header/HeaderLinks";
import Footer from "Components/Footer/Footer";
import FacebookSignIn from "./Pages/FacebookSignIn/FacebookSignIn";
import Dashboard from "./Pages/LandingPage/LandingPage";
import SlackSignIn from "./Pages/SlackSignIn/SlackSignIn";
import GithubSignIn from "./Pages/GithubSignIn/GithubSignIn";
import { Switch, Route } from "react-router-dom";
import Logo from "assets/img/logo1.png";
import "./App.css";

function App() {
  return (
    <div class="App">
      <Header
        color="white"
        brand={<img src={Logo} height="50" />}
        rightLinks={<HeaderLinks />}
        fixed
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Home} />
        <Route exact path="/sign-up" component={Signup} />
        <Route exact path="/facebook" component={FacebookSignIn} />
        <Route exact path="/slack" component={SlackSignIn} />
        <Route exact path="/github" component={GithubSignIn} />
        <Route exact path="/dashboard" component={Dashboard} />
      </Switch>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
