import React, { Component, Fragment } from "react";
import styled from "styled-components";

export let FormParent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  margin: 10px;
`;

export let FormInput = styled.input`
  border: 3px solid black;
  padding: 5px;
  border-radius: 4px;
  -webkit-transition: 0.5s;
  transition: 0.3s;

  &:focus {
  //   border: 3px solid red;
  //   border-radius: 4px;
    outline: none;
  }
`;

export let FormLabel = styled.label`
  margin: 5px;
`;
