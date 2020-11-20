import React, { useEffect, useState, Fragment } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../../../auth";

const NavUser = ({ history }) => {
  /* 
  HANDLE UI ERROR CREATE MODAL
  */

  const clickedSignout = () => {
    signout()
      .then(response => {
        history.push("/");
      })
      .catch(err => {
        console.log("FAILED TO SIGN OUT");
      });
  };

  return (
    <div>
      <p>User</p>
      {!isAuthenticated() && (
        <Fragment>
          <Link to="/sign-in">Sign in</Link>
          <br />
          <Link to="/sign-up">Sign up</Link>
        </Fragment>
      )}
      {isAuthenticated() && <p onClick={() => clickedSignout()}>Sign out</p>}
    </div>
  );
};

export default withRouter(NavUser);
