const mongoose = require("mongoose");

const ContactsSchema = mongoose.Schema({
  FromName: String,
  Mobile: String,
  EmailAddress: String,
  Subject: String,
  Message: String,
  Date: Date,
  SenderIP: String,
});

module.exports = mongoose.model(
  "ContactMessages",
  ContactsSchema,
  "ContactMessages"
);
