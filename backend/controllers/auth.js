const User = require("../models/User");
const passport = require("passport");

const { errorHandler } = require("../helpers/dbErrorHandler");

exports.postUserSignUp = (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email
  };
  const user = new User(userData);

  user.salt = undefined;
  user.setPassword(req.body.password);

  user
    .save()
    .then(user => {
      return res.status(200).json({
        message: "Successfully created user",
        data: user.toAuthJSON()
      });
    })
    .catch(err => {
      return res.status(400).json({
        error: errorHandler(err)
      });
    });
};

exports.postUserSignIn = (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email === "undefined" || email === null) {
    return res.status(422).json({
      error: "Please enter your email"
    });
  }

  if (typeof password === "undefined" || password === null) {
    return res.status(422).json({
      error: "Please enter your password"
    });
  }

  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({
        error:
          "Account with details does not exist. Please enter your account email and password."
      });
    }

    if (user) {
      const token = user.createJWT();
      res.cookie("t", token, { expire: new Date() + 3600 });

      user
        .save()
        .then(response => {
          return res.status(200).json({
            message: "Successfully authenticated user",
            data: { ...response.toAuthJSON(), token }
          });
        })
        .catch(err => {
          return res.status(422).json({
            error: errorHandler(err)
          });
        });
    } else {
      return res.status(422).json({
        error:
          "Account with details does not exist. Please enter your account email and password."
      });
    }
  })(req, res, next);
};

exports.getUserSignOut = (req, res, next) => {
  res.clearCookie("t");
  res.status(200).json({
    message: "Succesfully signed out"
  });
};
