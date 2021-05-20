import React from "react";
import { Route, Switch } from "react-router-dom";
import Signin from "./auth/Signin";
import Home from "./core/Home";
import EditProfile from "./user/EditProfile";
import Profile from "./user/Profile";
import Signup from "./user/Signup";
import Users from "./user/Users";
import PrivateRoute from "./auth/PrivateRoute";
import Menu from './core/Menu'

const MainRouter = () => {
  return (
    <>
      <Menu />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/users" component={Users} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
        <Route path="/user/:userId" component={Profile} />
      </Switch>
    </>
  );
};

export default MainRouter;
