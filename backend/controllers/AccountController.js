const asyncHandler = require("express-async-handler");
const UserInfoModel = require("../models/UserInfoModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const UserLogin = asyncHandler(async (req, res) => {
  UserInfoModel.findOne(
    {
      EmailAddress: {
        $in: [req.body.EmailAddress],
      },
    },
    function (error, user) {
      if (error) {
        res.status(400);
        throw error;
      } else if (user != null) {
        bcrypt.compare(
          req.body.Password,
          user.Password,
          async function (error, isMatch) {
            if (error) {
              res.status(400);
              throw error;
            } else if (!isMatch)
              res
                .status(400)
                .json({ ErrorMessage: "Invalid email or password!" });
            else {
              var updatedUser = await UserInfoModel.findByIdAndUpdate(
                user.id,
                { LoginCookie: cookie },
                { new: false }
              );
              if (updatedUser != null && updatedUser.LoginCookie != "") {
                console.log(cookie);
                res.status(200).json({ loginCookie: cookie });
              } else
                res.status(400).json({
                  ErrorMessage: "There was a problem saving the login cookie",
                });
            }
          }
        );
      } else {
        res.status(400).json({ ErrorMessage: "Invalid email or password!" });
      }
    }
  );
});

const ForgotPassword = asyncHandler(async (req, res) => {
  UserInfoModel.findOne(
    {
      EmailAddress: {
        $in: [req.body.EmailAddress],
      },
    },
    function (error, user) {
      if (error) {
        res.status(400);
        throw error;
      } else {
        let message = "";
        message +=
          "Dear " + user.FirstName + " " + user.LastName + ", <br/><br/>";
        message +=
          "Please click the 'Reset Password' button below to reset your <b>" +
          user.EmailAddress;
        message += "</b> account.<br/><br/>";
        message +=
          "<a href='http:localhost:5000/updatePassword?email=" +
          encodeURI(user.EmailAddress) +
          "'";
        message += " style='" + GetButtonStyle() + "'> Reset Password </a> ";

        SendMaii(user.EmailAddress, "Forgot password", message).then(result => console.log(result)).catch(err => console.log(err));
        res.status(200).json({ message: "Email successful" });
      }
    }
  );
});

const SendMaii = async (Email, Subject, Message) => {
  var isSend = false;

  const oAuth2Client = new google.auth.OAuth2(
    process.env.SMTP_CLIENTID,
    process.env.SMTP_CLIENT_SECRET,
    process.env.REDIRECT_URL
  );

  oAuth2Client.setCredentials({
    refresh_token: process.env.SMTP_REFRESH_TOKEN,
  });

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "ephraimmamonong@gmail.com",
        clientId: process.env.SMTP_CLIENTID,
        clientSecret: process.env.SMTP_CLIENT_SECRET,
        refreshToken: process.env.SMTP_REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    var mailOption = {
      from: "Ephraim Mamonong <ephraimmamonong@gmail.com>",
      to: Email,
      subject: Subject,
      text: Message,
      html: Message
    };

    const result = await transporter.sendMail(mailOption);
    return result;
  } catch (error) {}
};

const GetButtonStyle = () => {
  var result = "border: 10px #05914B solid;";
  result += "background-color: #05914B;";
  result += "color: #fff;";
  result += "font-size: 17px;";
  result += "margin-top: 2s0px;";

  return result;
};
const UserLogout = asyncHandler(async (req, res) => {
  var cookie = await UpdateLoginCookie(req.body.id, false);
  res.json({ loginCookie: "Successfully logged out." });
});

const UpdateLoginCookie = asyncHandler(async (userId, isLogin) => {
  let cookie = "";
  console.log(userId);
  if (isLogin) cookie = GenerateGuid();
});

const GenerateGuid = () => {
  return "xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

module.exports = {
  UserLogin,
  UserLogout,
  ForgotPassword,
};
