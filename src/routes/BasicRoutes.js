import React from "react";
import { Switch } from "react-router-dom";
import Dashboard from "../pages/Dashboard/Dashboard";
import Appointment from "../pages/Appointment/Appointment";
import Patient from "../pages/Patient/Patient";
import PIQ from "../pages/PIQ/PIQ";
import Commission from "../pages/Commision/Commission";
import Login from "../components/Auth/Login";
import LoginLayoutRoute from "./LoginLayoutRoutes";
import BasicLayout from "../layout/BasicLayout";
import LoginLayout from "../layout/LoginLayout";
import LoginRoutes from "./LoginRoutes";

const BasicRoutes = () => {
  return (
    <Switch>
      {/* <Route
        exact
        path="/"
        render={() => {
          return user ? <Redirect to="/Dashboard" /> : <Redirect to="/Login" />;
        }}
      /> */}
      <LoginLayoutRoute path="/PIQ" component={PIQ} layout={BasicLayout} />
      <LoginLayoutRoute
        exact
        path="/"
        component={Dashboard}
        layout={BasicLayout}
      />
      <LoginLayoutRoute
        exact
        path="/Dashboard"
        component={Dashboard}
        layout={BasicLayout}
      />
      <LoginLayoutRoute
        path="/Appointment"
        component={Appointment}
        layout={BasicLayout}
      />
      <LoginLayoutRoute
        path="/Commission"
        component={Commission}
        layout={BasicLayout}
      />
      <LoginRoutes path="/Login" component={Login} layout={LoginLayout} />
      <LoginLayoutRoute path="/:id" component={Patient} layout={BasicLayout} />
    </Switch>
  );
};

export default BasicRoutes;
