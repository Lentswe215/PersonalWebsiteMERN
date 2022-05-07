const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

const Encrypt = async (strVal) => {
  var hash = await bcrypt.hashSync(strVal, 16);
  return hash;
};

const UserInfoModel = require("../models/UserInfoModel");

const GetAllUsers = asyncHandler(async (req, res) => {
  const users = await UserInfoModel.find();
  res.status(200).json(users);
});

const GetUser = asyncHandler(async (req, res) => {
  var user = await UserInfoModel.findById(req.params.id);
// console.log(user);
  res.status(200).json(user);
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
    res.status(404);
    throw new Error("User not found!");
  }
  var UserUpdatedInfo = {
    FirstName: await IsNotEmpty(req.body.FirstName, user.FirstName),
    LastName: await IsNotEmpty(req.body.LastName, user.LastName),
    EmailAddress: await IsNotEmpty(req.body.EmailAddress, user.EmailAddress),
    Password: await IsNotEmpty(req.body.Password, user.Password, true),
    EmailConfirmed: await IsNotEmpty(req.body.EmailConfirmed, user.EmailConfirmed),
    LoginCookie: await IsNotEmpty(req.body.LoginCookie, user.LoginCookie),
    IsDeleted: await IsNotEmpty(req.body.IsDeleted, user.IsDeleted),
  };
  const UpdatedUser = await UserInfoModel.findByIdAndUpdate(
    req.params.id,
    UserUpdatedInfo,
    {
      new: false,
    }
  );
  res.status(200).json(UpdatedUser);
});

const DeleteUser = asyncHandler(async (req, res) => {

const user = await UserInfoModel.findById(req.params.id);
  if(!user)
  {
    res.status(404);
    throw new Error("User not found!");
  }

  const deletedUser = await UserInfoModel.findByIdAndDelete(req.params.id);
  res.status(200).json(deletedUser);
});

const IsNotEmpty = async (newValue, oldValue, IsPassword = false) => {
  if (newValue != null && newValue != "") {
    if (IsPassword) 
     newValue = await Encrypt(newValue);
    else newValue;

    return newValue;
  } else return oldValue;
};

module.exports = {
  GetAllUsers,
  GetUser,
  CreateUser,
  UpdateUser,
  DeleteUser,
};
