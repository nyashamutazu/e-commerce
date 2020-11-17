const User = require("../models/User");
const passport = require("passport");

const erroHandler = require("../helpers/dbErrorHandler");

exports.postUserSignUp = (req, res, next) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };
  const user = new User(userData);

  user
    .save()
    .then(user => {
      user.salt = undefined;
      user;
      return res.status(200).json({
        message: "Successfully created user",
        data: user.toAuthJSON()
      });
    })
    .catch(err => {
      return res.status(400).json({
        error: erroHandler(err)
      });
    });
};

exports.postUserSignIn = (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email === "undefined" || email === null) {
    res.status(422).json({
      error: "Please enter an email"
    });
  }

  if (typeof password === "undefined" || password === null) {
    res.status(422).json({
      error: "Please enter password"
    });
  }

  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      res.status(500).json({
        error: "Failed to authenticate"
      });
    }

    if (user) {
      const token = user.createJWT();

      res.cookie("t", token, { expire: new Date() + 3600 });

      user.save();

      return res.status(200).json({
        message: "Successfully authenticated user",
        data: user.toAuthJSON()
      });
    } else {
      return res.status(422).json({
        error: "Failed to authenticate"
      });
    }
  });
};

exports.getUserSignOut = (req, res, next) => {
  res.clearCookie("t"),
    res.status(200).json({
      message: "Succesfully signed out"
    });
};