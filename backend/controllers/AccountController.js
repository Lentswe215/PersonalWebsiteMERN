"use strict";

const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

const UserLogin = asyncHandler(async (req, res) => {
  const { UserName, Password } = req.params;

  const IsLoginValid =
    process.env.SYSTEM_USERNAME == UserName &&
    Password == process.env.SYSTEM_PASSWORD;

  if (IsLoginValid) {
    res
      .status(200)
      .json({ AuthToken: GenerateLoginToken(process.env.SYSTEM_AUTHTOKEN) });
  } else res.status(400).json({ ErrorMessage: "Invalid email or password!" });
});

const GenerateLoginToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const CheckAdminStatus = asyncHandler(async (req, res) => {
  if (req.params.AuthToken == process.env.SYSTEM_AUTHTOKEN) res.status(200);
  else res.status(401);
});

module.exports = {
  UserLogin,
  CheckAdminStatus,
};
