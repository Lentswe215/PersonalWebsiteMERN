const express = require("express");
const {
  GetAllUsers,
  GetUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
} = require("../controllers/UsersContoller");
const usersRouter = express.Router();

usersRouter.route("/").get(GetAllUsers).post(CreateUser);
usersRouter.route("/:id").get(GetUser).put(UpdateUser).delete(DeleteUser);
module.exports = usersRouter;
