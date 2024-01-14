const mongoose = require("mongoose");

const ContactMessagesSchema = mongoose.Schema({
  FromName: String,
  Mobile: String,
  EmailAddress: String,
  Subject: String,
  Message: String,
  Date: Date,
  SenderIP: String,
},
{
  timestamps: true,
});

module.exports = mongoose.model(
  "ContactMessages",
  ContactMessagesSchema,
  "ContactMessages"
);
