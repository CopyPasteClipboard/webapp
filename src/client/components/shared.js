/* Copyright G. Hemingway, @2018 */
"use strict";

import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

/*************************************************************************/

const ErrorBase = styled.div`
  grid-column: 1 / 3;
  color: red;
  display: flex;
  justify-content: center;
  padding: 1em;
  min-height: 1.2em;
`;

export const ErrorMessage = ({ msg = "", hide = false }) => {
  return (
    <ErrorBase style={{ display: hide ? "none" : "inherit" }}>{msg}</ErrorBase>
  );
};

ErrorMessage.propTypes = {
  msg: PropTypes.string,
  hide: PropTypes.bool
};

/*************************************************************************/
export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const ContainerBody = styled(Container)`
  justify-content: center;
  padding-top: 70px;
`;

export const FormInput = styled.input`
  width: 70%;
`;

export const FormLabel = styled.div`
  width: 30%;
  padding-right: 5px;
  text-align: right;
  font-weight: bold;
`;

export const FormBlock = styled(Container)`
  padding: 10px;
`;

export const Grid = styled.div`
  display : grid;
  width: 100%;
  grid-template-columns: 25% 50% 25%;
`;


export const Notify = styled.div`
  text-align : right;
  color : red;
  min-height: 20px;
`;


export const Button = styled.a`
  margin: 10px;
  padding: 5px;
  background: transparent;
  border-radius: 3px;
  text-align: center;
  ${ props => css`
    color : ${props.secondary_color};
    border: 2px solid ${props.secondary_color};
    &:hover {
      background-color: ${props.secondary_color};
      color: white;
    }
  `}
  
`;

export const ApiBaseWrapper = Component => {
  return props => <Component apiUrl="http://54.162.248.95:4000" {...props} />
};