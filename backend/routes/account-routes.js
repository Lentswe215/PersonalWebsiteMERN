const express = require("express");
const { UserLogin, ForgotPassword, ValidateLoginCookie } = require("../controllers/AccountController");

const accountRouter = express.Router();

accountRouter.get("/login", UserLogin);

accountRouter.get("/forgotpassword", ForgotPassword);
// accountRouter.get("/logout", UserLogout);
accountRouter.get("/validateLoginCookie", ValidateLoginCookie);

module.exports = accountRouter;
