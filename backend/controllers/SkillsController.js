"use strict";

const asyncHandler = require("express-async-handler");
const SkillsModel = require("../models/SkillsModel");

const GetAllSkills = asyncHandler(async (req, res) => {
  const skills = await SkillsModel.find();
  res.status(200).json(skills);
});

const GetSkill = asyncHandler(async (req, res) => {
  var skill = await SkillsModel.findById(req.params.id);

  if (skill == null) res.status(400).json({ ErrorMessage: "Skill not found" });
  else res.status(200).json(skill);
});

const CreateSkill = asyncHandler(async (req, res) => {
  if (!req.body.Name) {
    res.status(400).json({ ErrorMessage: "Please enter skill name" });
  } else {
    const skill = await SkillsModel.create({
      Name: req.body.Name,
      Type: req.body.Type,
      AddedBy: req.body.CurrentUserId,
      ModifiedBy: req.body.CurrentUserId,
      IsDeleted: false,
    });

    if (skill == null)
      res.status(400).json({ ErrorMessage: "Unable to save skills" });
    else res.status(200).json(skill);
  }
});

const UpdateSkill = asyncHandler(async (req, res) => {
  let SkillUpdatedInfo = {
    Name: req.body.Name,
    Type: req.body.Type,
    ModifiedBy: req.body.CurrentUserId,
  };
  const updatedSkill = await SkillsModel.findByIdAndUpdate(
    req.params.id,
    { SkillUpdatedInfo },
    { new: false }
  );

  if (updatedSkill == null)
    res.status(400).json({ ErrorMessage: "Unable to update skill" });
  else res.status(200).json(updatedSkill);
});

const DeleteSkill = asyncHandler(async (req, res) => {
  const deletedSkill = await SkillsModel.findByIdAndUpdate(
    req.params.id,
    { IsDeleted: true, ModifiedBy: req.body.CurrentUserId },
    { new: false }
  );

  if (deletedSkill == null)
    res.status(400).json({ ErrorMessage: "Unable to delete skill" });
  else res.json(deletedSkill);
});

module.exports = {
  GetAllSkills,
  GetSkill,
  CreateSkill,
  UpdateSkill,
  DeleteSkill,
};
