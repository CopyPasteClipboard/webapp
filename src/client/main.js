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
import { PasteBoard } from "./components/pasteboard";
import { Profile } from "./components/profile";

/*************************************************************************/

let theme = {
  primary_color : '#fed330',
  secondary_color : '#4b6584'
};

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
      apiUrl : this.props.API_URL,
      theme : props.theme
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.fetch = this.fetch.bind(this);
  }

  login(username) {
    this.setState({ loggedIn: true });
    localStorage.setItem('username',username);
  }

  logout(ev) {
    this.setState({ loggedIn: false });
    localStorage.clear();
  }

  fetch(route,params={}){
    return fetch(`${this.state.apiUrl}${route}`,params);
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
                theme={this.state.theme}
                {...props}
              />
            )}
          />
          <Route exact path="/" render={props =>
            <Landing {...props} theme={this.state.theme}/>
          }/>
          <Route
            path="/login"
            render={props => (
              <Login
                {...props}
                login={this.login}
                loggedIn={this.state.loggedIn}
                apiUrl={this.state.apiUrl}
                theme={this.state.theme}
              />
            )}
          />
          <Route path="/register" render={props =>
                  <Register {...props} loggedIn={this.state.loggedIn} theme={this.state.theme} login={this.login} fetch={this.fetch}/>}/>
          <Route
            path="/profile/:username"
            render={props =>
              <Profile {...props} theme={this.state.theme} loggedIn={this.state.loggedIn} fetch={this.fetch} apiUrl={this.state.apiUrl}/>
            }
          />
        </Fragment>
      </BrowserRouter>
    );
  }
}

let run = () => {
  let API_URL = "http://34.224.86.78:8080";
  render(<MyApp API_URL={API_URL} theme={theme}/>, document.getElementById("mainDiv"));
};

run();
