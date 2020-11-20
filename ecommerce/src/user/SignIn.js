import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import AuthLayout from "../core/shared/layout/AuthLayout";
import Spinner from "../core/shared/spinner/Spinner";
import { signin, authenticate } from "../auth";

const SignIn = () => {
  const [base, setBase] = useState({
    email: "contact@nyashamutazu.com",
    password: "hello123",
    error: "",
    isLoading: false,
    redirect: false
  });

  const { email, password, isLoading, error, redirect } = base;

  const handleSubmit = ev => {
    ev.preventDefault();

    setBase({ ...base, isLoading: true });

    if (typeof password === "undefined" || password === null) {
      setBase({ ...base, error: "Please enter password", isLoading: false });
      return;
    }

    const user = { email, password };

    signin(user)
      .then(response => {
        if (response.error) {
          setBase({
            ...base,
            error: response.error,
            isLoading: false
          });
        }

        if (response.data && response.message) {
          authenticate(response.data, () => {
            setBase({
              ...base,
              email: "",
              password: "",
              error: "",
              redirect: true,
              isLoading: false
            });
          });
        }
      })
      .catch(err => {
        setBase({
          ...base,
          error: "Failed to sign up please try again later",
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

  const redirectUser = () => {
    if (redirect) {
      return <Redirect to="/" />;
    }
  };

  const alternativeSignIn = () => (
    <div>
      <h3 className="h3">Sign in with</h3>
      <div className="group__conatiner">
        <div className="outerline">
          <button>Sign in with Google</button>
        </div>
        <div className="outerline">
          <button>Sign in with Facebook</button>
        </div>
      </div>
      <p>
        Alternatively, you can <Link to="/sign-up">Sign Up</Link>
      </p>
    </div>
  );

  const signInForm = () => (
    <form onSubmit={handleSubmit}>
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
        <button type="submit" className="button__primary">
          Sign Up
        </button>
      </div>
    </form>
  );

  return (
    <div>
      <AuthLayout title="Sign In">
        {displayError()}

        {isLoading ? (
          requestIsLoading()
        ) : (
          <div>
            {alternativeSignIn()}
            {signInForm()}
          </div>
        )}

        {redirectUser()}
      </AuthLayout>
    </div>
  );
};

export default SignIn;
