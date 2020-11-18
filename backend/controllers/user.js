const User = require("../models/User");
const errorHandler = require("../helpers/dbErrorHandler");

exports.getUserById = (req, res, next, id) => {
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

exports.getUser = (req, res, next) => {
  return res.status(200).json({
    message: "Successfully got user",
    data: req.user.toAuthJSON()
  });
};

exports.putUser = (req, res, next) => {
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { $set: req.body },
    { new: true }
  )
    .then(response => {
      res.status(200).json({
        message: "Successfully got user",
        data: response.toAuthJSON()
      });
    })
    .catch(err => {
      res.status(400).json({
        error: "Failed to update password"
      });
    });
};
