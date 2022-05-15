const mongoose = require("mongoose");

const PageContentsSchema = mongoose.Schema({
  Title:  String,
  Slug:  String,
  MetaData:String,
  AddedBy: String,
  ModifiedBy: String,
  IsDeleted: Boolean,
},
{
  timestamps: true,
});

module.exports = mongoose.model(
  "PageContents",
  PageContentsSchema,
  "PageContents"
);
