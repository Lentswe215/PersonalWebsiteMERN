const asyncHandler = require("express-async-handler");

const GetAllUsers = asyncHandler(async (req, res) => {
  res.json({ message: "Getting all system users" });
});

const GetUser = asyncHandler(async (req, res) => {
  res.json({ message: `Get single user with id: ${req.params.id} ` });
});

const CreateUser = asyncHandler(async (req, res) => {
  if (!req.body.Message) {
    res.status(400);
    throw new Error("Please add message");
  } else res.status(200).json({ message: "Creating a user" });
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
