const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');


const Encrypt = async (strVal) => {
  var hash = await bcrypt.hashSync(strVal, 16);
  return hash;
}

const UsersModel = require("../models/UserInfoModel");

const GetAllUsers = asyncHandler(async (req, res) => {
  const users = await UsersModel.find();
  res.status(200).json(users);
});

const GetUser = asyncHandler(async (req, res) => {
  res.json({ message: `Get single user with id: ${req.params.id} ` });
});

const CreateUser = asyncHandler(async (req, res) => {
  if (!req.body.FirstName || !req.body.LastName || !req.body.EmailAddress || !req.body.Password) {
    res.status(400);
    throw new Error("Please make sure to enter every field!");
  } else {

    let password = await Encrypt(req.body.Password);
    const user = await UsersModel.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      EmailAddress: req.body.EmailAddress,
      Password: password,
      EmailConfirmed: true,
      LoginCookie: "",
      IsDeleted: false
    });
    res.status(200).json(user);
  }
});

const UpdateUser = asyncHandler(async (req, res) => {
  res.json({ message: `Updating user information with id: ${req.params.id}` });
});

const DeleteUser = asyncHandler(async (req, res) => {
  res.json({ message: `Deleting a user with id: ${req.params.id}` });
});

module.exports = {
  GetAllUsers,
  GetUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
};
