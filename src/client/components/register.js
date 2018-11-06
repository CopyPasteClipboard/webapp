/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component, Fragment } from "react";

import { FormParent, FormLabel, FormInput } from "./components";

/*************************************************************************/

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username : "",
      password : "",
      firstName : "",
      lastName : "",
      city : "",
      primary_email : "",
      error : ""
    };

    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.cityChange = this.cityChange.bind(this);
    this.emailChange = this.emailChange.bind(this);
    this.register = this.register.bind(this);
  }

  usernameChange(ev) {
    this.setState( { username : ev.target.value });
  }

  passwordChange(ev) {
    this.setState( { password : ev.target.value });
  }

  firstNameChange(ev) {
    this.setState( { firstName: ev.target.value })
  }

  lastNameChange(ev) {
    this.setState( { lastName: ev.target.value })
  }

  cityChange(ev) {
    this.setState( { city: ev.target.value })
  }

  emailChange(ev) {
    this.setState( { primary_email: ev.target.value })
  }

  register(ev){
    let data = this.state;
    fetch('/v1/user',{
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body : JSON.stringify(this.state)
    }).then(data => data.json()).then(
      res => {
        if (res.ok){
          this.props.history.push(`/profile/${res.username}`)
        }
        else {
          this.setState({ error : res.error })
        }
      }
    ).catch( err => console.log(err));
  }

  render() {
    return (
      <Fragment>
        <div style={{color: "red", fontSize: "20px"}}> {this.state.error} </div>
        <FormParent>
          <FormLabel> Username: </FormLabel>
          <FormInput value={this.state.username} onChange={this.usernameChange} type="password"/>
        </FormParent>
        <FormParent>
          <FormLabel> First Name: </FormLabel>
          <FormInput value={this.state.firstName } onChange={this.firstNameChange} />
        </FormParent>
        <FormParent>
          <FormLabel> Last Name: </FormLabel>
          <FormInput value={this.state.lastName } onChange={this.lastNameChange} />
        </FormParent>
        <FormParent>
          <FormLabel> City: </FormLabel>
          <FormInput value={this.state.city } onChange={this.cityChange} />
        </FormParent>
        <FormParent>
          <FormLabel> Email: </FormLabel>
          <FormInput value={this.state.primary_email} onChange={this.emailChange} />
        </FormParent>
        <FormParent>
          <FormLabel> Password: </FormLabel>
          <FormInput value={this.state.password} onChange={this.passwordChange} />
        </FormParent>
        <FormParent>
          <button onClick={this.register}> Register </button>
        </FormParent>
      </Fragment>
    );
  }
}