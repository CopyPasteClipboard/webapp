/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component, Fragment } from "react";

// import { FormParent, FormLabel, FormInput } from "./components";
import { ContainerBody, Grid, FormLabel, FormInput, FormBlock, Notify, Button } from "./shared";

/*************************************************************************/

export class Login extends Component {
  constructor(props) {
    super(props);

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

  login(ev) {
    ev.preventDefault();

    let data = { username: this.state.username, password: this.state.password };
    // fetch("/session", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json; charset=utf-8"
    //   },
    //   body: JSON.stringify(data)
    // }).then(res => {
    //   if (res.ok){
    //     console.log('logged in');
    //     this.props.login(data.username);
    //     this.props.history.push(`/profile/${data.username}`);
    //   } else {
    //     this.setState({
    //       error: "Invalid username or password"
    //     });
    //   }
    // }).catch(err => console.log(err));


    if (data.username !== "bananaland" && data.password !== "coffeeyummy")
    {
      this.setState( { error : "Invalid username or password" });
      return;
    }

    this.props.login("bananaland");
    this.props.history.push('/profile/bananaland');
  }

  render() {
    return (
      <ContainerBody>
        <Grid>

          <Notify> {this.state.error} </Notify>
          <div></div>
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
            <Button {...this.props.theme} onClick={this.login}> Login </Button>
          </FormBlock>
          <div></div>

        </Grid>
      </ContainerBody>
    )
      ;
  }
}
