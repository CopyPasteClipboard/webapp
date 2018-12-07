import react, { Fragment } from "react";

export const Logout = ({ history, logOut }) => {
  logOut().then( () => history.push("/"));
  return <Fragment/>;
};