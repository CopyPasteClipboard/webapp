/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Fragment, Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

/*************************************************************************/

let LandingLinkStyled = styled(Link)`
  color: black;
  background-color: rgb(221,221,221);
  margin-top: 2px;
  margin-bottom: 2px;
  
  & : hover { 
    -webkit-filter: invert(50%);
  }
`;

let LandingLink = item => {
  return <LandingLinkStyled to={item.href}
                            className="title-anchor"> {item.text} </LandingLinkStyled>;
};

let LandingButton = props => {
  return (
    <div className="row">
      <div className="col-sm-4"/>
      <LandingLink href={props.href} text={props.text}/>
      <div className="col-sm-4"/>
    </div>
  );
};


export class Landing extends Component {
  constructor(props) {
    super(props);
    /* ... */
  }

  render() {
    return (
      <div className="container title-block">
        <div className="row">
          <div className="col-sm-4"/>
          <h1 className="col-sm-4 title"> Solitailey </h1>
          <div className="col-sm-4"/>
        </div>

        <LandingButton href={"/login"} text={"Log In"}/>
        <LandingButton href={"/register"} text={"Register"}/>
      </div>
    );
  }
}