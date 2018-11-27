/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component } from "react";
import styled, {css} from 'styled-components';

import { Link } from "react-router-dom";


/*************************************************************************/

let HeaderBar = styled.nav`
    ${ props => 
      css`
        background-color: ${props.primary_color}
        color: ${props.secondary_color}
      `
    }
    
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
    height: 60px;
`;

let Logo = styled.div`
  color: #4b6584;
  font-size: 40px;
  font-family: "Comic Sans MS";
  margin-left: 10px;
`;

let NavLink = styled.div`
  color: #4b6584;
  font-size: 15px;
  margin-right: 10px;
  &:hover {
    color: white;
    text-decoration: underline;
  }
`;

let FlexDiv = styled.div`
  display : flex;
  align-items: center;
  margin: 5px;
`;

let BarRight = (loggedIn,logoutFunc) => {
  if (!loggedIn)
    return <div></div>

  let gravitar = `https://www.gravatar.com/avatar/${localStorage.getItem('emailHash')}`;

  console.log(logoutFunc);
  return (
    <FlexDiv>
        <img src={gravitar} size={60}/>
        <NavLink to='/login' onClick={logoutFunc} > Log Out </NavLink>
    </FlexDiv>
  );
};

export class Header extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);

  }

  logout(ev) {
    this.props.logout();
    localStorage.clear();
    this.props.history.push('/');
  }

  render() {
    if (!this.props.loggedIn)
      return (
        <HeaderBar {...this.props.theme}>
          <Logo onClick={() => this.props.history.push('/')}> Clippy </Logo>
          <FlexDiv>
            <NavLink to='/login' onClick={() => this.props.history.push('/login')}> Log In </NavLink>
            <NavLink to='/register' onClick={() => this.props.history.push('/register')}> Register </NavLink>
          </FlexDiv>
        </HeaderBar>
      );

    return (
        <HeaderBar {...this.props.theme}>
          <Logo onClick={() => this.props.history.push('/')}> Clippy </Logo>
          <FlexDiv>
            <NavLink to='/' onClick={this.logout}> Logout </NavLink>
          </FlexDiv>
        </HeaderBar>
    )
  }
}

