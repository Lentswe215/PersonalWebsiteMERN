"use strict";

const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { IsNotEmpty, IsPasswordNotEmpty } = require("../StringHelper");

const Encrypt = async (strVal) => {
  var hash = await bcrypt.hashSync(strVal, 16);
  return hash;
};

const UserInfoModel = require("../models/UserInfoModel");

const GetAllUsers = asyncHandler(async (req, res) => {
  const users = await UserInfoModel.find();
  const ActiveUsers = users.filter((c) => !c.IsDeleted);
  res.status(200).json(ActiveUsers);
});

const GetUser = asyncHandler(async (req, res) => {
  var user = await UserInfoModel.findById(req.params.id);
  // console.log(user);
  if (user && !user.IsDeleted) res.status(200).json(user);
  else res.status(404).json({ ErrorMessage: "User is not available!" });
});

const CreateUser = asyncHandler(async (req, res) => {
  if (
    !req.body.FirstName ||
    !req.body.LastName ||
    !req.body.EmailAddress ||
    !req.body.Password
  ) {
    res.status(400);
    throw new Error("Please make sure to enter every field!");
  } else {
    let password = await Encrypt(req.body.Password);
    const user = await UserInfoModel.create({
      FirstName: req.body.FirstName,
      LastName: req.body.LastName,
      EmailAddress: req.body.EmailAddress,
      Password: password,
      EmailConfirmed: true,
      LoginCookie: "",
      IsDeleted: false,
    });
    res.status(200).json(user);
  }
});

const UpdateUser = asyncHandler(async (req, res) => {
  const user = await UserInfoModel.findById(req.params.id);

  if (!user) {
    res.status(404).json({ ErrorMessage: "User not found!" });
  }
  var UserUpdatedInfo = {
    FirstName: IsNotEmpty(req.body.FirstName, user.FirstName),
    LastName: IsNotEmpty(req.body.LastName, user.LastName),
    EmailAddress: IsNotEmpty(req.body.EmailAddress, user.EmailAddress),
    Password: await IsPasswordNotEmpty(req.body.Password, user.Password, true),
    EmailConfirmed: IsNotEmpty(req.body.EmailConfirmed, user.EmailConfirmed),
    LoginCookie: await IsNotEmpty(req.body.LoginCookie, user.LoginCookie),
    IsDeleted: await IsNotEmpty(req.body.IsDeleted, user.IsDeleted),
  };

  if (user != null) {
    UserInfoModel.findByIdAndUpdate(
      req.params.id,
      UserUpdatedInfo,
      {
        new: true,
      },
      function (err, doc) {
        if (err) {
          res.status(404).json({ ErrorMessage: "User not found!" });
        } else res.status(200).json(doc);
      }
    );
  }

  // res.status(200).json(UpdatedUser);
});

const DeleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await UserInfoModel.findByIdAndUpdate(
    req.params.id,
    { IsDeleted: true },
    { new: true }
  );

  if (deletedUser == null)
    res.status(400).json({ ErrorMessage: "Unable to delete user" });
  else res.status(200).json(deletedUser);
});

module.exports = {
  GetAllUsers,
  GetUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
};
