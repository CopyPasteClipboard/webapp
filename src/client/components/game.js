/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component } from "react";
import PropTypes from "prop-types";
import { Pile } from "./pile";
import styled from "styled-components";

/*************************************************************************/

const CardRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 2em;
`;

const CardRowGap = styled.div`
  flex-grow: 2;
`;

const GameBase = styled.div`
  grid-row: 2;
  grid-column: sb / main;
`;

export class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      target: undefined,
      startDrag: { x: 0, y: 0 },
      pile1: [],
      pile2: [],
      pile3: [],
      pile4: [],
      pile5: [],
      pile6: [],
      pile7: [],
      stack1: [],
      stack2: [],
      stack3: [],
      stack4: [],
      draw: [],
      discard: []
    };
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    fetch(`/v1/game/${this.props.match.params.id}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          pile1: data.pile1,
          pile2: data.pile2,
          pile3: data.pile3,
          pile4: data.pile4,
          pile5: data.pile5,
          pile6: data.pile6,
          pile7: data.pile7,
          stack1: data.stack1,
          stack2: data.stack2,
          stack3: data.stack3,
          stack4: data.stack4,
          draw: data.draw,
          discard: data.discard
        });
      })
      .catch(err => console.log(err));
  }

  onClick(ev) {
    let target = ev.target;
    console.log(target.id);
  }

  render() {
    return (
      <GameBase>
        <CardRow>
          <Pile cards={this.state.stack1} spacing={0} onClick={this.onClick} />
          <Pile cards={this.state.stack2} spacing={0} onClick={this.onClick} />
          <Pile cards={this.state.stack3} spacing={0} onClick={this.onClick} />
          <Pile cards={this.state.stack4} spacing={0} onClick={this.onClick} />
          <CardRowGap />
          <Pile cards={this.state.draw} spacing={0} onClick={this.onClick} />
          <Pile cards={this.state.discard} spacing={0} onClick={this.onClick} />
        </CardRow>
        <CardRow>
          <Pile cards={this.state.pile1} onClick={this.onClick} />
          <Pile cards={this.state.pile2} onClick={this.onClick} />
          <Pile cards={this.state.pile3} onClick={this.onClick} />
          <Pile cards={this.state.pile4} onClick={this.onClick} />
          <Pile cards={this.state.pile5} onClick={this.onClick} />
          <Pile cards={this.state.pile6} onClick={this.onClick} />
          <Pile cards={this.state.pile7} onClick={this.onClick} />
        </CardRow>
      </GameBase>
    );
  }
}

Game.propTypes = {
  match: PropTypes.object.isRequired
};
