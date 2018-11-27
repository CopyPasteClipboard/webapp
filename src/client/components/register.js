/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component, Fragment } from "react";

import { ContainerBody, Grid, FormLabel, FormInput, FormBlock, Notify, Button } from "./shared";

/*************************************************************************/


export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : "",
      first_name : "",
      last_name : "",
      error : "",
      apiUrl : this.props.apiUrl
    };

    this.onChange = this.onChange.bind(this);
    this.register = this.register.bind(this);
  }

  onChange(ev) {
    this.setState( { [ev.target.name] : ev.target.value} );
  }

  async register(ev) {
    ev.preventDefault();

    // Only proceed if there are no errors
    if (!this.state.hasOwnProperty("error") || this.state.error !== "") return;

    // let data = await fetch(`${this.state.apiUrl}/users`);
    let res = await this.props.fetch('/user', {
        method: "POST",
        body: JSON.stringify(this.state),
        headers: {
          "Content-Type": "application/json"
        }
      });

    if (!res.ok){
      this.setState( { error : "could not register user" });
      return;
    }

    res.json().then( data => {
      this.props.login(data.username);
      this.props.history.push(`/profile/${data.username}`);
    })
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
                       onChange={this.onChange}
                       name="username"
                      value={this.state.username}/>
          </FormBlock>
          <div></div>

          <div></div>
          <FormBlock>
            <FormLabel> First Name: </FormLabel>
            <FormInput type="text"
                      onChange={this.onChange}
                      name="first_name"
                      value={this.state.first_name}/>
          </FormBlock>
          <div></div>

          <div></div>
          <FormBlock>
            <FormLabel> Last Name: </FormLabel>
            <FormInput type="text"
                      onChange={this.onChange}
                      name="last_name"
                      value={this.state.last_name}/>
          </FormBlock>
          <div></div>

          <div></div>
          <FormBlock>
            <FormLabel> Password: </FormLabel>
            <FormInput type="password"
                      name="password"
                      onChange={this.onChange}
                      value={this.state.password}/>
          </FormBlock>
          <div></div>

          <div></div>
          <FormBlock>
            <FormLabel/>
            <Button onClick={this.register} {...this.props.theme}> Register </Button>
          </FormBlock>
          <div></div>

        </Grid>
      </ContainerBody>
    );
  }
}