/* Copyright G. Hemingway, 2018 - All rights reserved */
"use strict";

import React, { Component } from "react";
import styled from "styled-components";

import { Button, Notify} from "./shared";

/*************************************************************************/

const ProfileGrid = styled.div`
  display : grid;
  width: 80%;
  grid-template-columns: 40% 20% 40%;
`;

const ProfileTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 8px;
  border-radius : 5px;
`;

const PasteButton = styled(Button)`
  margin-top : 16px;
  margin: 0;
`;

export class PasteBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: this.props.match.params.username,
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
    var el = document.createElement('textarea');
    el.value = this.props.copyText;
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.setState( { error : 'successfully copied'})
  }

  paste(ev){
    ev.preventDefault();

    let target = this.props.pasteText;

    if (target === "")
      return;

    this.setState({ error : ""});

    fetch(`${this.state.apiUrl}/v1/clipboard/0/boarditem`,{
      method : "POST",
      body: JSON.stringify({ new_item : target }),
      headers: {
        "content-type": "application/json"
      }
    }).then( res => {
      if (res.status !== 200){
        this.setState( {error: "could not paste data"});
      } else {
        res.json().then( data => {
            this.props.update({ copyText : data.text_content,
              pasteText : ""})
        }
        );
      }
    }).catch(err => console.log(err));
  }

  render() {
    return (
        <ProfileGrid>
          <Notify>
            {this.state.error}
          </Notify>
          <div/>
          <div/>

          <div>
            <ProfileTextArea value={this.props.pasteText}
                      onChange={this.props.onChange}
                      name="pasteText"/>
            <PasteButton onClick={this.paste} {...this.props.theme}> Paste </PasteButton>
          </div>
          <div>
          </div>
          <div>
            <ProfileTextArea value={this.props.copyText}
                            onChange={this.props.onChange}
                            name="copyText"/>
            <PasteButton onClick={this.copy} {...this.props.theme}> Copy </PasteButton>
          </div>
        </ProfileGrid>
    );
  }
}