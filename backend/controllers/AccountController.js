const asyncHandler = require("express-async-handler");

const UserLogin = asyncHandler(async (req, res) => {
  res.json({ message: "User login" });
});

const UserLogout = asyncHandler(async (req, res) => {
  res.json({ message: "user logout" });
});

module.exports = {
  UserLogin,
  UserLogout,
};
