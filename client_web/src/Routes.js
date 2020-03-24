import React from 'react';
import { Switch, Redirect} from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  NotFound as NotFoundView,
  Services as ServicesView,
  Hooks as HooksView,
  Profile as ProfileView,
  History as HistoryView,
  Account as AccountView,
} from './views';


const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/hooks"
      />
      <RouteWithLayout
        component={ServicesView}
        exact
        layout={MainLayout}
        path="/services"
      />
      <RouteWithLayout
        component={HooksView}
        exact
        layout={MainLayout}
        path="/hooks"
      />
      <RouteWithLayout
        component={HistoryView}
        exact
        layout={MainLayout}
        path="/history"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      {/* <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      /> */}
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
