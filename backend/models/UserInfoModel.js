const mongoose = require("mongoose");

const UserInfoSchema = mongoose.Schema(
  {
    FirstName: {
      type: String,
      required: [true, "Please enter first name!"],
    },
    LastName: {
      type: String,
      required: [true, "Please enter last name"],
    },
    EmailAddress: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "Please enter an email address"],
    },
    Password: {
      type: String,
      required: [true, "Please enter password"],
    },
    EmailConfirmed: Boolean,
    LoginCookie: String,
    IsDeleted: Boolean,
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('UserInfo', UserInfoSchema, "UserInfo");