/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component, Fragment } from "react";
import styled from "styled-components";

import {format} from "date-fns";

import md5 from 'md5';

/*************************************************************************/

let Container = styled.div`
  display : flex;
  justify-content: center;
`;

let StyledTable = styled.table`
  display : flex;
  justify-content: center;
  width: 900px;
  flex-direction : column;
`;

let Tr = styled.tr`
  display : flex;
  justify-content: space-around;
  width: 100%;
`;

let Td = styled.td`
  margin: 10px;
  padding: 10px;
`;

let P = styled.p`
  text-align : right;
`;

let Button = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  &:hover{
    color: white;
    background-color: black;
  }
  text-align: center;
  width: 10%; 
  margin: 5px;
`;

let Info = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px;
`;

let InfoDiv = styled.div`
  margin: 10px;
`;

let InfoBlock = ({username,first_name,last_name,primary_email,city}) => {
  let hash = md5(username);
  let gravitar = `https://www.gravatar.com/avatar/${hash}`;

  return <Info>
    <img src={gravitar} alt="profile picture" style={{"width" : "200px"}}/>
    <InfoDiv>
      <P> Username:</P>
      <P> First Name:</P>
      <P> Last Name:</P>
      <P> City:</P>
      <P> Email:</P>
    </InfoDiv>
    <InfoDiv>
      <p> {username} </p>
      <p> {first_name} </p>
      <p> {last_name}</p>
      <p> {city}</p>
      <p> {primary_email}</p>
    </InfoDiv>
  </Info>;
};

let TableRow = game=> {
  let date = new Date(game.start);
  const url = game.active
    ? `/game/${game.id}`
    : `/results/${game.id}`;
  return (
    <Tr>
      <Td><a href={url}>{game.active ? "Active" : "Complete"}</a></Td>
      <Td>{ format(date,"M/D/YY")}</Td>
      <Td> {game.moves} </Td>
      <Td> {game.score} </Td>
      <Td> {game.game} </Td>
    </Tr>
  );
};

let Table = props => {
  let rows = props.games.map((item, index) => <TableRow key={index} {...item}/>);
  return (
    <StyledTable>
        <Tr>
          <Td> Status</Td>
          <Td> Start Date</Td>
          <Td> Number of Moves</Td>
          <Td> Score</Td>
          <Td> Game Type</Td>
        </Tr>
      {/*<tbody>*/}
        {rows}
      {/*</tbody>*/}
    </StyledTable>
  );
};

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.username,
      email : "",
      city : "",
      first_name : "",
      last_name : "",
      games : []
    };

    this.newGame = this.newGame.bind(this);
  }

  componentDidMount() {
    fetch(`/v1/user/${this.state.username}`).then(data => data.json())
      .then(data =>
        this.setState({ ...data })
      )
  }

  newGame() {
    this.props.history.push('/start');
  }

  render() {
    let startGameLink = this.props.loggedIn? <Container><Button onClick={this.newGame}> New Game </Button></Container> : <div></div>;
    let editProfile = <div></div>;

    if (this.props.loggedIn && this.state.username === localStorage.getItem('username'))
      editProfile = <Container><Button onClick={() => this.props.history.push('/edit')}> Edit </Button></Container> ;

    return (
      <Fragment>
        <Container >
          <InfoBlock {...this.state}/>
        </Container>
        {startGameLink}
        {editProfile}
        <Container>
          <Table games={this.state.games}/>
        </Container>
      </Fragment>
    );
  }
}