const express = require("express");
const { UserLogin, ForgotPassword } = require("../controllers/AccountController");

const accountRouter = express.Router();

accountRouter.get("/login", UserLogin);

accountRouter.get("/forgotpassword", ForgotPassword);
// accountRouter.get("/logout", UserLogout);

module.exports = accountRouter;
