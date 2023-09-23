const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      jwt.verify(token);
      next();
    } catch (e) {
      console.error(e);
      res.status(401);
      throw new Error("Not Authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized");
  }
};

module.exports = { protect };
