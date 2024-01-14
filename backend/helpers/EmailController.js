"use strict";

const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.SMTP_CLIENTID,
  process.env.SMTP_CLIENT_SECRET,
  process.env.REDIRECT_URL
);

oAuth2Client.setCredentials({
  refresh_token: process.env.SMTP_REFRESH_TOKEN,
});

const SendMail = async (Email, Subject, Message) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.SMTP_USER,
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
      html: Message,
    };

    const result = await transporter.sendMail(mailOption);
    return result;
  } catch (error) {}
};

module.exports = {
  SendMail
};
