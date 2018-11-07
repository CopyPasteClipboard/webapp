/* Copyright G. Hemingway, @2018 */
"use strict";

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const NotifyBase = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NotifyBox = styled.div`
  padding: 2em;
  border: 1px solid #000;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;
`;

export const ModalNotify = ({ msg = "", onAccept }) => {
  return (
    <NotifyBase>
      <NotifyBox>
        <p>{msg}</p>
        {onAccept ? <FormButton onClick={onAccept}>Ok</FormButton> : null}
      </NotifyBox>
    </NotifyBase>
  );
};

/*************************************************************************/


export const InfoBlock = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  grid-template-areas: "labels info";
`;

export const InfoData = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  & > p {
    margin: 0.5em 0.25em;
  }
`;

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
  color : red;
`;
