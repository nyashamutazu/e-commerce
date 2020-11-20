import React, { useState } from "react";
import {Link} from 'react-router-dom';

import AuthLayout from "../core/shared/layout/AuthLayout";
import Spinner from "../core/shared/spinner/Spinner";
import { signup } from "../auth";

const SignUp = () => {
  const [base, setBase] = useState({
    name: "",
    email: "",
    password: "",
    repeat_password: "",
    checkbox: false,
    error: "",
    success: false,
    isLoading: false
  });

  const {
    name,
    email,
    password,
    repeat_password,
    checkbox,
    isLoading,
    error,
    success
  } = base;

  const handleSubmit = ev => {
    ev.preventDefault();

    setBase({ ...base, isLoading: true });

    if (!checkbox) {
      setBase({ ...base, error: 'Please read and confirm you agree with our Terms of Service and our Privacy Policy', isLoading: false });
      return;
    }

    if (!(password && repeat_password)) {
      setBase({ ...base, error: 'Please enter a password and correctly repeat password', isLoading: false });
      return;
    }

    if (password !== repeat_password) {
      setBase({ ...base, error: 'Passwords must match', isLoading: false });
      return;
    }
     
    const user = {name, email, password}
    signup(user)
      .then(response => {
        if (response.error) {
          setBase({
            ...base,
            error: response.error,
            success: false,
            isLoading: false
          });
        } else {
          setBase({
            ...base,
            name: "",
            email: "",
            password: "",
            repeat_password: "",
            checkbox: false,
            success: true,
            isLoading: false
          });
        }
      })
      .catch(err => {
        setBase({
          ...base,
          error: "Failed to sign up please try again later",
          success: false,
          isLoading: false
        });
      });
  };

  const handleChange = value => ev => {
    ev.preventDefault();
    setBase({ ...base, error: false, [value]: ev.target.value });
  };

  const requestIsLoading = () => {
    <div>
      <Spinner />
    </div>;
  };

  const displayError = () => {
    return error ? (
      <div>
        <p>{error}</p>
      </div>
    ) : null;
  };

  const displaySuccess = () => {
    return success ? (
      <div>
        <p>
          Your new account has been created. Please{" "}
          <Link to="/sign-in">Sign in</Link>
        </p>
      </div>
    ) : null;
  };

  const alternativeSignUp = () => (
    <div>
      <h3 className="h3">Sign up with</h3>
      <div className="group__conatiner">
        <div className="outerline">
          <button>Sign up with Google</button>
        </div>
        <div className="outerline">
          <button>Sign up with Facebook</button>
        </div>
      </div>
    </div>
  );

  const signUpForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form__controller">
        <div className="form__controller--input">
          <label className="form__label">Name</label>
          <input
            onChange={handleChange("name")}
            type="text"
            value={name}
            autoComplete="name"
            className="form__input"
          />
        </div>
      </div>
      <div className="form__controller">
        <div className="form__controller--input">
          <label className="form__label">Email</label>
          <input
            onChange={handleChange("email")}
            type="email"
            value={email}
            autoComplete="email"
            className="form__input"
          />
        </div>
      </div>
      <div className="form__controller">
        <div className="form__controller--input">
          <label className="form__label">Password</label>
          <input
            onChange={handleChange("password")}
            type="password"
            value={password}
            autoComplete="new-password"
            className="form__input"
          />
        </div>
      </div>
      <div className="form__controller">
        <div className="form__controller--input">
          <label className="form__label">Re-enter Password</label>
          <input
            onChange={handleChange("repeat_password")}
            type="password"
            value={repeat_password}
            autoComplete="new-password"
            className="form__input"
          />
        </div>
      </div>
      <div className="form__controller">
        <div className="form__controller--input">
          <input
            onChange={handleChange("checkbox")}
            type="checkbox"
            value={checkbox}
            className="form__input--checkbox"
          />
          <p className="text__small">
            I've read and agree with Terms of Service and our Privacy Policy
          </p>
        </div>
      </div>
      <div className="form__controller">
        <button type="submit" className="button__primary">
          Sign Up
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <AuthLayout title="Sign Up">
        {displayError()}
        {displaySuccess()}


        {isLoading && !success ? (
          requestIsLoading()
        ) : (
          <div>
            {alternativeSignUp()}
            {signUpForm()}
          </div>
        )}
      </AuthLayout>
    </div>
  );
};

export default SignUp;
