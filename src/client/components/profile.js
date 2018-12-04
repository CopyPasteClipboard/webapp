/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Button } from './shared';

import { PasteBoard } from "./pasteboard";

/*************************************************************************/

let Container = styled.div`
  display : flex;
  justify-content: center;
`;

let P = styled.p`
  text-align : right;
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

const Checkbox = ({checked, onChange, text}) => (
  <div>
    <input type="checkbox" checked={checked} onChange={onChange} name={text}/>
    <label> {text} </label>
  </div>
);


let InfoBlock = ({username,phone_number}) => {
  return <Info>
    <InfoDiv>
      <P> Username:</P>
      <P> Phone Number:</P>
    </InfoDiv>
    <InfoDiv>
      <p> {username} </p>
      <p> {phone_number} </p>
    </InfoDiv>
  </Info>;
};

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.username,
      apiUrl : this.props.apiUrl,
      phone_number : "",
      created : "",
      id : "",
      copyText : "",
      pasteText : "",
      clipboards : [],
      value : "",
      view : "paste"    // possible values : "paste" or "history"
    };

    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    fetch(`http://34.224.86.78:8080/v1/user/0`)
      .then(data => data.json())
      .then( data => {
        this.setState( { username : data.username,
                              phone_number : data.phone_number})
      })

    fetch(`http://34.224.86.78:8080/v1/user/0/clipboards/` )
      .then(data => data.json() )
      .then( data => {
        this.setState({ clipboards : data });
      }).then(() => {
        fetch(`http://34.224.86.78:8080/v1/clipboard/${this.state.clipboards[0].id}`)
          .then(data => data.json() )
          .then( data => {
            this.setState( { copyText : data[0].text_content } );
          });
      }).catch(err => console.log(err));
  }

  onChange(ev){
    this.setState( { [ev.target.name] : ev.target.value });
  }

  handleChange(ev) {
    this.setState( { value : ev.target.value });
  }

  update(data) {
    this.setState(data);
  }

  render() {
    let startGameLink = this.props.loggedIn? <Container><Button onClick={() => this.props.history.push(`/pasteboard/${this.state.username}`)}
                                                                {...this.props.theme}> View Boards </Button></Container> : <div></div>;
    let editProfile = <div></div>;

    if (this.props.loggedIn && this.state.username === localStorage.getItem('username'))
      editProfile = <Container><Button onClick={() => this.props.history.push('/edit')} {...this.props.theme}> Edit </Button></Container> ;

    // let boards = this.state.clipboards.map( (board,i) => <Button key={i} {...this.props.theme}> {board.name} </Button>);

    let boards = this.state.clipboards.map((board,i) =>
      <option value={board.board_name} key={i}> {board.board_name} </option>
    );

    let boardInfo = () => {
      return <Fragment>
      <Container>
        <select value={this.state.value} onChange={this.handleChange}>
          {boards}
        </select>
      </Container>
      <Container>
      <PasteBoard {...this.props} onChange={this.onChange} pasteText={this.state.pasteText}
      copyText={this.state.copyText} update={this.update.bind(this)}/>
    </Container>
      </Fragment>
    };

    let board_info = <div/>;
    if (this.props.loggedIn && this.state.username === localStorage.getItem('username')) {
      board_info = boardInfo();
    }

    return (
      <Fragment>
        <Container>
          <InfoBlock {...this.state}/>
        </Container>
        {/*{startGameLink}*/}
        {/*{editProfile}*/}

        {board_info}
      </Fragment>
    );
  }
}