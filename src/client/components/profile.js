/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component, Fragment } from "react";
import styled from "styled-components";

import { ContainerBody, Grid, FormLabel, FormInput, FormBlock, Notify} from "./shared";

/*************************************************************************/

const ProfileGrid = styled.div`
  display : grid;
  width: 80%;
  grid-template-columns: 40% 20% 40%;
`;

const ProfileTextArea = styled.textarea`
  width: 100%;
  height: 100px;
`;

export class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.username,
      copyText : "",
      pasteText : "",
      error : "",
      apiUrl : this.props.apiUrl
    };

    this.paste = this.paste.bind(this);
    this.copy = this.copy.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    fetch(`/user/${this.state.username}/clipboard`).then(data => data.json())
      .then(data => {
        if (data.clipboard === "")
          this.setState( { error : "clipboard is empty" });
        else
          this.setState({ copyText : data.clipboard })
      }
      )
  }

  onChange(ev){
    this.setState( { [ev.target.name] : ev.target.value });
  }

  copy(ev){
    ev.preventDefault();
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = this.state.copyText;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
    this.setState( { error : 'successfully copied'})
  }

  paste(ev){
    ev.preventDefault();

    let target = this.state.pasteText;

    if (target === "")
      return;

    this.setState({ error : ""});

    fetch(`/user/${this.state.username}/clipboard`,{
      method : "POST",
      body: JSON.stringify({ item : target }),
      headers: {
        "content-type": "application/json"
      }
    }).then( res => {
      if (res.status !== 201){
        this.setState( {error: "could not paste data"});
      } else {
        console.log('in else');
        res.json().then( data => {
          console.log(data);
          this.setState({ copyText : data.clipboard,
                          pasteText : ""})
          }
        );
      }
    }).catch(err => console.log(err));
  }

  render() {
    return (
      <ContainerBody>
        <ProfileGrid>
          <Notify>
            {this.state.error}
          </Notify>
          <div/>
          <div/>

          <div>
            <ProfileTextArea value={this.state.pasteText}
                      onChange={this.onChange}
                      name="pasteText"/>
            <button onClick={this.paste}> Paste </button>
          </div>
          <div>
          </div>
          <div>
            <ProfileTextArea value={this.state.copyText}
                            onChange={this.onChange}
                            name="copyText"/>
            <button onClick={this.copy}> Copy </button>
          </div>
        </ProfileGrid>
      </ContainerBody>
    );
  }
}