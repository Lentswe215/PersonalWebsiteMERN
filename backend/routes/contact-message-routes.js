const express = require("express");

const {
  GetAllContactMessages,
  GetContactMessage,
  CreateContactMessage,
} = require("../controllers/ContactMessagesController");
const { protect } = require("../middleware/auth-middleware");

const contactMessageRouter = express.Router();

contactMessageRouter
  .route("/")
  .get(protect, GetAllContactMessages)
  .post(CreateContactMessage);
contactMessageRouter.route("/:id").get(protect, GetContactMessage);

module.exports = contactMessageRouter;
