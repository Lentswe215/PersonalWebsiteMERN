const mongoose = require("mongoose");

const SkillsSchema = mongoose.Schema({
  Name: String,
  Type: Number,
  AddedBy: String,
  ModifiedBy: String,
  IsDeleted: Boolean,
},
{
  timestamps: true,
});

module.exports = mongoose.model("Skills", SkillsSchema, "Skills");
