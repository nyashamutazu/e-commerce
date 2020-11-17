const User = require("../models/User");
const errorHandler = require("../helpers/dbErrorHandler");

exports.getUserById = (re1, res, next, id) => {
  User.findById(id)
    .then(user => {
      if (typeof user === "undefined" || user === null) {
        res.status(400).json({
          error: "User not found"
        });
      }

      req.user = user;
      next();
    })
    .catch(err => {
      res.status(400).json({
        error: errorHandler(err)
      });

      next();
    });
};
