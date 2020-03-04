import React from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "Pages/Login/Login";
import PrivateRoute from "./Components/Routes/PrivateRoutes";
import Dashboard from "Pages/Dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <PrivateRoute exact component={Dashboard} path="/dashboard" />
          <Route exact component={Login} path="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
