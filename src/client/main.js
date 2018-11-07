/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

// Necessary modules
import React, { Component, Fragment } from "react";
import { render } from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";

import { Header } from "./components/header";
import { Landing } from "./components/landing";
import { Login } from "./components/login";
import { Register } from "./components/register";
import { Profile } from "./components/profile";

/*************************************************************************/

const defaultUser = {
  username: "",
  first_name: "",
  last_name: "",
  primary_email: "",
  city: "",
  games: []
};

class MyApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: localStorage.getItem("username") !== null,
      apiUrl : this.props.API_URL
    };
    console.log(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(ev) {
    this.setState({ loggedIn: true });
  }

  logout(ev) {
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Route
            path="/"
            render={props => (
              <Header
                loggedIn={this.state.loggedIn}
                logout={this.logout}
                apiUrl={this.state.apiUrl}
                {...props}
              />
            )}
          />
          <Route exact path="/" component={Landing} />
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                login={this.login}
                loggedIn={this.state.loggedIn}
                apiUrl={this.state.apiUrl}
              />
            )}
          />
          <Route path="/register" render={props =>
                  <Register {...props} loggedIn={this.state.loggedIn} apiUrl={this.state.apiUrl}/>}
                 component={Register} />
          <Route
            path="/profile/:username"
            render={props => (
              <Profile {...props} loggedIn={this.state.loggedIn} apiUrl={this.state.apiUrl}
              />
            )}
          />
        </Fragment>
      </BrowserRouter>
    );
  }
}

let run = () => {
  let API_URL = "http://localhost:8080";
  render(<MyApp API_URL={API_URL}/>, document.getElementById("mainDiv"));
};

run();
