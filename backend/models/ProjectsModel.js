const mongoose = require("mongoose");

const ProjectsSchema = mongoose.Schema({
  Name:String,
  Image:  String,
  LinkUrl: String,
  AddedBy: String,
  ModifiedBy: String,
  IsDeleted: Boolean,
});

module.exports = mongoose.model("Projects", ProjectsSchema, "Projects");
