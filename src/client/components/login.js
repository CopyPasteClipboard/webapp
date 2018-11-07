/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component, Fragment } from "react";

// import { FormParent, FormLabel, FormInput } from "./components";
import { ContainerBody, Grid, FormLabel, FormInput, FormBlock, Notify} from "./shared";

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

    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(ev) {
    this.setState( { [ev.target.name] : ev.target.value });
  }

  login(ev) {
    let data = { username: this.state.username, password: this.state.password };
    console.log('data',data);
    fetch("/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(data)
    }).then(res => {
      console.log(res);
      if (res.ok){
        console.log('logged in');
        this.props.login();
        this.props.history.push(`/profile/${data.username}`);
      } else {
        this.setState({
          error: "Invalid username or password"
        });
      }
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <ContainerBody>
        <Grid>

          <div></div>
          <Notify> {this.state.error} </Notify>
          <div></div>

          <div></div>
          <FormBlock>
            <FormLabel> Username: </FormLabel>
            <FormInput type="text"
                      name="username"
                      value={this.state.username}
                      onChange={this.onChange}/>
          </FormBlock>
          <div></div>

          <div></div>
          <FormBlock>
            <FormLabel> Password: </FormLabel>
            <FormInput type="password"
                       name="password"
                       value={this.state.password}
                       onChange={this.onChange}/>
          </FormBlock>
          <div></div>

          <div></div>
          <FormBlock>
            <FormLabel/>
            <button onClick={this.login}> Login </button>
          </FormBlock>
          <div></div>

        </Grid>
      </ContainerBody>
    )
      ;
  }
}
