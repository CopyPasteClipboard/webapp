/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import { ContainerBody, Grid } from "./shared";


/*************************************************************************/

let Button = styled.button`
  margin: 10px;
  padding: 5px;
`;

export class Landing extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ContainerBody>
        <Grid>
          <div></div>
          <Button onClick={() => console.log('login')}> Login </Button>
          <div></div>

          <div></div>
          <Button onClick={() => console.log('register')}> Register </Button>
          <div></div>
        </Grid>
      </ContainerBody>
    );
  }
}
