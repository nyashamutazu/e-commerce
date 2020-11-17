const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      User.findOne({ email: email })
        .then(user => {
          const _hasedPassword = user.validatePassword(password);
          if (
            typeof user === "undefined" ||
            user === null ||
            typeof _hasedPassword === "undefined" ||
            _hasedPassword === null
          ) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);
