/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component } from "react";

import { ContainerBody, Grid } from "./shared";

import { Button } from "./shared";

/*************************************************************************/


export class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {


    return (
      <ContainerBody>
        <Grid>
          <div></div>
          <Button onClick={() => this.props.history.push('/login')} {...this.props.theme}> Login </Button>
          <div></div>

          <div></div>
          <Button onClick={() => this.props.history.push('/register')} {...this.props.theme}> Register </Button>
          <div></div>
        </Grid>
      </ContainerBody>
    );
  }
}
