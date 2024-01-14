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
      const result = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (e) {
      console.error("Error JWT ;:", e);
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
