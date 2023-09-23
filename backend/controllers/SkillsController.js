"use strict";

const asyncHandler = require("express-async-handler");
const SkillsModel = require("../models/SkillsModel");
const { ValidateAuthToken } = require("../helpers/AuthHelper");

const GetAllSkills = asyncHandler(async (req, res) => {
  const skills = await SkillsModel.find();
  const ActiveSkills = skills.filter((c) => !c.IsDeleted);
  res.status(200).json(ActiveSkills);
});

const GetSkill = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken()) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
    var skill = await SkillsModel.findById(req.params.id);

    if (skill == null || skill.IsDeleted)
      res.status(400).json({ ErrorMessage: "Skill not found" });
    else res.status(200).json(skill);
  }
});

const CreateSkill = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken(req.headers.authorization)) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
    const {Name, Type} = req.body;
    if (!Name) {
      res.status(400).json({ ErrorMessage: "Please enter skill name" });
    } else {
      const skill = await SkillsModel.create({
        Name,
        Type,
        AddedBy: 1,
        ModifiedBy: 1,
        IsDeleted: false,
      });

      if (skill == null)
        res.status(400).json({ ErrorMessage: "Unable to save skills" });
      else res.status(200).json(skill);
    }
  }
});

const UpdateSkill = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken()) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
    const {Name, Type} = req.body;

    let SkillUpdatedInfo = {
      Name,
      Type,
      ModifiedBy: 1,
    };
    const updatedSkill = await SkillsModel.findByIdAndUpdate(
      req.params.id,
      { SkillUpdatedInfo },
      { new: false }
    );

    if (updatedSkill == null)
      res.status(400).json({ ErrorMessage: "Unable to update skill" });
    else res.status(200).json(updatedSkill);
  }
});

const DeleteSkill = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken()) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
    const deletedSkill = await SkillsModel.findByIdAndUpdate(
      req.params.id,
      { IsDeleted: true, ModifiedBy: req.body.CurrentUserId },
      { new: false }
    );

    if (deletedSkill == null)
      res.status(400).json({ ErrorMessage: "Unable to delete skill" });
    else res.json(deletedSkill);
  }
});

module.exports = {
  GetAllSkills,
  GetSkill,
  CreateSkill,
  UpdateSkill,
  DeleteSkill,
};
