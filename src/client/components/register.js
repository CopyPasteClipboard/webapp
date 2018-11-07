/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component, Fragment } from "react";

import { ContainerBody, Grid, FormLabel, FormInput, FormBlock, Notify} from "./shared";

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

  register(ev) {
    ev.preventDefault();

    // Only proceed if there are no errors
    if (!this.state.hasOwnProperty("error") || this.state.error !== "") return;
    fetch(`/user`, {
      method: "POST",
      body: JSON.stringify(this.state),
      headers: {
        "content-type": "application/json"
      }
    }).then( res => {
      if (res.ok) {
        this.setState({ error : `${this.state.username} registered. you must now login`});
      } else {
        console.log(res.error);
      }
    }
  )
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
            <button onClick={this.register}> Register </button>
          </FormBlock>
          <div></div>

        </Grid>
      </ContainerBody>
    );
  }
}