/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component, Fragment } from "react";

import { FormParent, FormLabel, FormInput } from "./components";

import md5 from "md5";

/*************************************************************************/

export class Login extends Component {
  constructor(props) {
    super(props);

    if (props.loggedIn) {
      this.props.history.push(`/profile/:${localStorage.getItem("username")}`);
    }

    this.state = {
      username: "",
      password: "",
      error: ""
    };

    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.login = this.login.bind(this);
  }

  usernameChange(ev) {
    let val = ev.target.value;
    let error = "";
    if (val.length < 6 || val.length > 12)
      error = "Username must be between 6 and 12 letters";

    this.setState({ username: ev.target.value, error: error });
  }

  passwordChange(ev) {
    this.setState({ password: ev.target.value });
  }

  login(ev) {
    if (this.state.username === "") {
      this.setState({ error: "You must enter a valid username." });
    }

    if (this.state.password === "") {
      this.setState({ error: "You must enter a valid password." });
    }

    if (this.state.error !== "")
      return;


    let data = { username: this.state.username, password: this.state.password };
    fetch("/v1/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    }).then(data => {
      if (data.status !== 201)
        throw new Error(`Error: ${data.status}`);

      return data.json();
    }).then(data => {
      console.log("logging data", data);
      let emailHash = md5(data.primary_email);
      localStorage.setItem("username", data.username);
      localStorage.setItem("email", data.primary_email);
      localStorage.setItem("emailHash", emailHash);
      this.props.login();
      return data;
    })
      .then(data => {
        this.props.history.push(`/profile/${data.username}`);
      })
      .catch(err => {
        console.log(err);
        this.setState({
          error: "Invalid username or password"
        });
      });
  }

  render() {
    return (

      <Fragment>
        <div style={{ "color": "red" }}> {this.state.error} </div>
        <FormParent>
          <FormLabel> Username: </FormLabel>
          <FormInput value={this.state.username} onChange={this.usernameChange}/>
        </FormParent>
        <FormParent>
          <FormLabel> Password: </FormLabel>
          <FormInput value={this.state.password} onChange={this.passwordChange} type="password"/>
        </FormParent>
        <FormParent>
          <button onClick={this.login}> Login</button>
        </FormParent>
      </Fragment>
    )
      ;
  }
}
