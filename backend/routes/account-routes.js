const express = require('express');
const {  UserLogin, UserLogout } = require('../controllers/AccountController');

const accountRouter = express.Router();

accountRouter.get("/login", UserLogin);

accountRouter.get("/logout", UserLogout);

module.exports = accountRouter;