const mongoose = require("mongoose");

const ProjectsSchema = mongoose.Schema({
  Name:String,
  Image:  String,
  LinkUrl: String,
  SkillsUsed: String,
  AddedBy: String,
  ModifiedBy: String,
  IsDeleted: Boolean,
},
{
  timestamps: true,
});

module.exports = mongoose.model("Projects", ProjectsSchema, "Projects");
