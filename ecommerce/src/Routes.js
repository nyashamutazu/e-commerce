import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./user/SignIn";
import SignUp from "./user/SignUp";
import Nav from "./core/shared/navigation/Nav";
import Home from "./core/Home";

const Routes = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/sign-in" exact component={SignIn} />
        <Route path="/sign-up" exact component={SignUp} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
