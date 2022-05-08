const mongoose = require("mongoose");

const PageContentSchema = mongoose.Schema({
  Title:  String,
  Slug:  String,
  MetaData:String,
  AddedBy: String,
  ModifiedBy: String,
  IsDeleted: Boolean,
});

module.exports = mongoose.model(
  "PageContents",
  PageContentSchema,
  "PageContents"
);
