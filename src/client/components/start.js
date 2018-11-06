/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component } from "react";

import styled from "styled-components";
/*************************************************************************/
let Container = styled.div`
  display : flex;
  justify-content: center;
`;

let Li = styled.li`
  list-style: none;
`;

export class Start extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game : "klondyke",
      draw : "1",
      color : "red"
    };

    this.handleGameSelect = this.handleGameSelect.bind(this);
    this.handleDrawSelect = this.handleDrawSelect.bind(this);
    this.handleColorSelect = this.handleColorSelect.bind(this);
    this.startGame = this.startGame.bind(this);
  }

  handleDrawSelect(ev) {
    this.setState( {
      draw : ev.target.value
    });
  }
  handleGameSelect(ev) {
    this.setState( {
      game : ev.target.value
    });
  }

  handleColorSelect(ev) {
    this.setState( {
      color : ev.target.value
    })
  }

  startGame() {
    console.log(this.state);
    fetch("/v1/game", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(this.state)
    }).then(data => data.json()).then(data => this.props.history.push(`/game/${data.id}`)).catch(err => console.log(err));
  }

  render() {
    let games = ['klondyke','pyramid','canfield','golf','yukon','hearts'].map((game,index)=> {
      return (
        <Li key={index}>
          <label>
            <input type="radio" value={game} onChange={this.handleGameSelect} checked={this.state.game === game}
            style={{"margin" : "5px"}}/>
            {game}
          </label>
        </Li>
      );
    });

    let draw = ['one','three'].map((option,index)=> {
        return (
          <Li key={index}>
            <label>
              <input type="radio" value={option} onChange={this.handleDrawSelect} checked={this.state.draw === option}
                     style={{ "margin": "5px" }}/>
              {option}
            </label>
          </Li>
        );
      }
    );

    let color = ['red','blue','green','black'].map((color,index)=> {
      return (
        <Li key={index}>
          <label>
            <input type="radio" value={color} onChange={this.handleColorSelect} checked={this.state.color === color}
                   style={{ "margin": "5px" }}/>
            {color}
          </label>
        </Li>
      );
    });

    return (

      <div style={{
        "display" : "flex",
        "justifyContent" : "center",
        "alignItems" : "center",
        'padding': '30px',
        'flexDirection' : 'column'
      }}>
        <p> <strong>Start New Game </strong></p>
      <Container>
        <ul>
          {games}
        </ul>

        <div>
          <ul>
            {draw}
          </ul>
        <ul>
          {color}
        </ul>
          </div>
      </Container>
        <div onClick={this.startGame}> Start </div>
        </div>
    );
  }
}