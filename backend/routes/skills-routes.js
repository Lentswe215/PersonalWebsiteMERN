const express = require("express");
const {
  GetAllSkills,
  GetSkill,
  CreateSkill,
  UpdateSkill,
  DeleteSkill,
} = require("../controllers/SkillsController");
const skillsRouter = express.Router();

skillsRouter.route("/").get(GetAllSkills).post(CreateSkill);
skillsRouter.route("/:id").get(GetSkill).put(UpdateSkill).delete(DeleteSkill);

module.exports = skillsRouter;
