const express = require("express");

const {
  GetAllContactMessages,
  GetContactMessage,
  CreateContactMessage,
} = require("../controllers/ContactMessagesController");

const contactMessageRouter = express.Router();

contactMessageRouter
  .route("/")
  .get(GetAllContactMessages())
  .post(CreateContactMessage());
contactMessageRouter.route("/:id").get(GetContactMessage());
