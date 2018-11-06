/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component, Fragment } from "react";
import styled from "styled-components";

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

let InfoBlock = game => {
  return <Info>
    <InfoDiv>
      <P> Duration:</P>
      <P> Number of Moves:</P>
      <P> Points:</P>
      <P> Cards Remaining:</P>
      <P> Able to Move:</P>
    </InfoDiv>
    <InfoDiv>
      <p> {game.duration} </p>
      <p> {game.moves.length} </p>
      <p> {game.score}</p>
      <p> {game.cards_remaining}</p>
      <p> {game.active}</p>
    </InfoDiv>
  </Info>;
};

let TableRow = (move, index) => {
  return (
    <Tr>
      <Td> {index} </Td>
      <Td> {move.length} seconds </Td>
      <Td> {move.player} </Td>
      <Td> {move.move} </Td>
    </Tr>
  );
};

let Table = ({moves}) => {
  let rows = moves.map((item, index) => <TableRow key={index} {...item} index={index+1}/>);
  return (
    <StyledTable>
      <Tr>
        <Td>Id</Td>
        <Td>Duration</Td>
        <Td>Player</Td>
        <Td>Move Details</Td>
      </Tr>
      {/*<tbody>*/}
      {rows}
      {/*</tbody>*/}
    </StyledTable>
  );
};

export class Results extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game : {},
      gameId : props.match.params.id,
      moves : []
    }
  }

  componentDidMount() {
    fetch(`/v1/game/${this.state.gameId}`).then(data => {
      data.json()
    }).then(data => {
      if (data)
        this.setState({...data});
    })
  }


  render() {
    return (
      <Fragment>
      <Container >
        <InfoBlock {...this.state}/>
      </Container>
      <Container>
        <Table moves={this.state.moves}/>
      </Container>
        </Fragment>
    );
  }
}