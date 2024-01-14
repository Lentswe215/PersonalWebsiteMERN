const express = require("express");
const {
  UserLogin,
  CheckAdminStatus,
} = require("../controllers/AccountController");

const accountRouter = express.Router();
accountRouter.get("/login/:username/:password", UserLogin);
// accountRouter.get("/checkadminstatus/:AuthToken", CheckAdminStatus);
module.exports = accountRouter;
