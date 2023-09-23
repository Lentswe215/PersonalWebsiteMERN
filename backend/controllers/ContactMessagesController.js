"use strict";

const asyncHandler = require("express-async-handler");
const ContactMessagesModel = require("../models/ContactMessagesModel");
const { SendMail } = require("../helpers/EmailController");
const { ValidateAuthToken } = require("../helpers/AuthHelper");

const GetAllContactMessages = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken())
    res.status(401).json({ ErrorMessage: "Auth toke is invalid" });
  else {
    const messages = await ContactMessagesModel.find();
    res.status(200).json(messages);
  }
});

const GetContactMessage = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken(req.headers.authorization))
    res.status(401).json({ ErrorMessage: "Auth toke is invalid" });
  else {
    const message = await ContactMessagesModel.findById(req.params.id);
    if (message == null)
      res.status(400).json({ ErrorMessage: "Message is not available" });
    else res.status(200).json(message);
  }
});

const CreateContactMessage = asyncHandler(async (req, res) => {
  const { FromName, Mobile, EmailAddress, Subject, Message , Date, SenderIP} = req.body;
  if (FromName || Mobile || EmailAddress || Message) {
    res
      .status(400)
      .json({ ErrorMessage: "Please make sure all required field are filled" });
  } else {
    const message = await ContactMessagesModel.create({
      FromName: FromName,
      Mobile:Mobile,
      EmailAddress: EmailAddress,
      Subject: Subject,
      Message: Message,
      Date: Date,
      SenderIP: SenderIP,
    });

    if (message == null)
      res
        .status(400)
        .json({ ErrorMessage: "There was a problem saving contact message" });
    else {
      res.status(200).json({ message });
      SendMessage(
        message.FromName,
        message.EmailAddress,
        message.Subject,
        message.Message
      );
    }
  }
});

const SendMessage = (SenderName, SenderEmail, Subject, Message) => {
  let msg = "";
  msg += "There is a new contact message. Details are below:";
  msg += `<b> From :</b> ${SenderName}<br/>`;
  msg += `<b> Email : </b> ${SenderEmail}<br/>`;
  msg += `<b> Subject : </b> ${Subject}`;
  msg += `<b> Message</b><br/> ${Message}`;
  msg +=
    "<hr/><br/><br/> Go to <a href='#'> Admin site </a> to view your contact messages";
  SendMail("ephraimmamonong@mailinator.com", Subject, msg);
};

module.exports = {
  GetAllContactMessages,
  GetContactMessage,
  CreateContactMessage,
};
