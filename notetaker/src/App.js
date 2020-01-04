import React from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";

import "assets/vendor/nucleo/css/nucleo.css";
import "assets/vendor/font-awesome/css/font-awesome.min.css";
import "assets/scss/argon-design-system-react.scss";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

import Home from "pages/Home.jsx";
import Landing from "pages/Landing.jsx";
import Login from "pages/Login.jsx";
import Profile from "pages/examples/Profile.jsx";
import Register from "pages/Register.jsx";

const App = props => {
    const { isAuthenticated, isVerifying } = props;

    return (
        <Switch>
            <Route path="/" exact render={props => <Landing {...props} />} />
            <Route path="/login-page" exact render={props => <Login {...props} />} />
            <Route
            path="/profile-page"
            exact
            render={props => <Profile {...props} />}
            />
            <Route
            path="/register-page"
            exact
            render={props => <Register {...props} />}
            />
            <ProtectedRoute
                exact
                path="/home"
                component={Home}
                isAuthenticated={isAuthenticated}
                isVerifying={isVerifying}
            />
            <Redirect to="/" />
        </Switch>
    );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);