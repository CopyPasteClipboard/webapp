/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component } from "react";

import { ContainerBody, Grid, FormLabel, FormInput, FormBlock, Notify, Button } from "./shared";
import { ApiBaseWrapper } from "./shared";

/*************************************************************************/

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : "",
      error : "",
      phone_number : ""
    };

    this.onChange = this.onChange.bind(this);
    this.register = this.register.bind(this);
  }

  onChange(ev) {
    this.setState( { [ev.target.name] : ev.target.value, error : "" } );
  }

  async register(ev) {
    ev.preventDefault();

    // Only proceed if there are no errors
    if (!this.state.hasOwnProperty("error") || this.state.error !== "") return;

    if (this.state.username === "")
      return this.setState( { error : "username cannot be empty" });
    if (this.state.phone_number === "")
      return this.setState( { error : "phone number cannot be empty" });
    if (this.state.password === "")
      return this.setState( { error : "password cannot be empty" });

    // proceed to create user
    let url = `${this.props.apiUrl}/v1/user`;
    let payload = { username : this.state.username, password : this.state.password, phone_number : this.state.phone_number };

    try {
      let res = await fetch(url, {
        method : "POST",
        headers: {
          "Content-Type": "application/json "
        },
        body : JSON.stringify(payload)
      });

      let user = await res.json();

      this.setState({ error: "successfully registered. you must now log in."});
    } catch (err) {
      this.setState({ error: "unable to register user at this time. please try again later."});
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
                       onChange={this.onChange}
                       name="username"
                      value={this.state.username}/>
          </FormBlock>
          <div/>

          <div/>
          <FormBlock>
            <FormLabel> Phone Number: </FormLabel>
            <FormInput type="text"
                       name="phone_number"
                       onChange={this.onChange}
                       value={this.state.phone_number}/>
          </FormBlock>
          <div/>

          <div/>
          <FormBlock>
            <FormLabel> Password: </FormLabel>
            <FormInput type="password"
                       name="password"
                       onChange={this.onChange}
                       value={this.state.password}/>
          </FormBlock>
          <div/>

          <div/>
          <FormBlock>
            <FormLabel/>
            <Button onClick={this.register} {...this.props.theme}> Register </Button>
          </FormBlock>
          <div/>

        </Grid>
      </ContainerBody>
    );
  }
}

const WrappedRegister = ApiBaseWrapper(Register);

export { WrappedRegister as Register }
