const expressJwt = require("express-jwt");

exports.requireAuth = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth"
});

exports.isAuthed = (req, res, next) => {
  let user = req.user && req.auth && req.user._id === req.auth._id;
  if (!user) {
    return res.status(403).json({
      error: "Access denied"
    });
  }

  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.user.role === 0) {
    return res.status(403).json({
      error: "Access denied"
    });
  }

  next();
};
