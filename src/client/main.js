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
import { Logout } from "./components/logout";

/*************************************************************************/

let theme = {
  primary_color : '#fed330',
  secondary_color : '#4b6584'
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

  async login({username}) {
    try {
      let url = `${this.props.apiUrl}/v1/login`;
      let user = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify( { username : username })
      });

      let data = await user.json();
      this.setState({ loggedIn: true });
      localStorage.setItem('USER::username',data.username);
      localStorage.setItem('USER::id', data.id);
      localStorage.setItem('USER::phone_number', data.phone_number)

      // everything went okay
      return Promise.resolve();
    } catch (err) {
      // signal caller login failed
      return Promise.reject();
    }

  }

  /**
   * clear local storage and set state to logged out
   */
  logout() {
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
                theme={this.state.theme}
              />
            )}
          />
          <Route path="/register" render={props =>
                  <Register {...props} loggedIn={this.state.loggedIn} theme={this.state.theme} login={this.login} fetch={this.fetch}/>}/>

          <Route path="logout" render={
            props => <Logout history={this.props.history} logout={this.logOut} {...props}/>
          }/>
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
  render(<MyApp theme={theme} />, document.getElementById("mainDiv"));
};

run();
