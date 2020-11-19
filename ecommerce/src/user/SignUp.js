import React, { useState } from "react";
import { API } from "../config";
import AuthLayout from "../core/shared/layout/AuthLayout";

const SignUp = () => {
  const [base, setBase] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
    checkbox: false,
    error: "",
    success: false,
    isLoading: ""
  });

  const { name, email, password } = base;

  const signup = (name, email, password) => {
    const user = { name, email, password };

    fetch(`${API}/auth/sign-up`, {
      method: "POST",
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: "application/json",
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(response => {
        console.log('Success')
        console.log(response)})
      .catch(err => {
        console.log('Failed')
        console.log(err)});
  };

  const handleSubmit = ev => {
    ev.preventDefault();
    signup(name, email, password);
  };

  const handleChange = value => ev => {
    ev.preventDefault();
    setBase({ ...base, error: false, [value]: ev.target.value });
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
            className="form__input"
          />
        </div>
      </div>
      <div className="form__controller">
        <div className="form__controller--input">
          <label className="form__label">Re-enter Password</label>
          <input
            onChange={handleChange("repeatPassword")}
            type="password"
            className="form__input"
          />
        </div>
      </div>
      <div className="form__controller">
        <div className="form__controller--input">
          <input
            onChange={handleChange("checkbox")}
            type="checkbox"
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
          {alternativeSignUp()}
          {signUpForm()}
      </AuthLayout>
    </div>
  );
};

export default SignUp;
