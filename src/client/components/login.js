/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component } from "react";

import { ContainerBody, Grid, FormLabel, FormInput, FormBlock, Notify, Button, ApiBaseWrapper } from "./shared";


/*************************************************************************/

class Login extends Component {
  constructor(props) {
    super(props);

    // redirect to profile if logged in
    if (props.loggedIn) {
      this.props.history.replace(`/profile/${localStorage.getItem("username")}`);
    }

    this.state = {
      username: "",
      password: "",
      error: ""
    };

    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(ev) {
    this.setState( { [ev.target.name] : ev.target.value });
  }

  login() {
    if (this.state.username ==="" || this.state.password === "")
      return this.setState({error: "You must enter a username and password."})

    try {
      this.props.logIn(this.state);
      this.props.history.push(`/profile/${this.state.username}`);
    } catch (err) {
      this.setState({error: 'unable to login in this time. please try again later.'})
    }

  }

  render() {
    return (
      <ContainerBody>
        <Grid>

          <Notify> {this.state.error} </Notify>
          <div/>
          <div/>

          <div/>
          <FormBlock>
            <FormLabel> Username: </FormLabel>
            <FormInput type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}/>
          </FormBlock>
          <div/>

          <div/>
          <FormBlock>
            <FormLabel> Password: </FormLabel>
            <FormInput type="password"
                       name="password"
                       value={this.state.password}
                       onChange={this.onChange}/>
          </FormBlock>
          <div/>

          <div/>
          <FormBlock>
            <FormLabel/>
            <Button {...this.props.theme} onClick={this.login}> Login </Button>
          </FormBlock>
          <div/>

        </Grid>
      </ContainerBody>
    )
      ;
  }
}

const WrappedLogin = ApiBaseWrapper(Login);

export { WrappedLogin as Login }
