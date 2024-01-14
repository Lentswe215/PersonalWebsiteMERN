const express = require("express");
const {
  GetAllSkills,
  GetSkill,
  CreateSkill,
  UpdateSkill,
  DeleteSkill,
} = require("../controllers/SkillsController");
const { protect } = require("../middleware/auth-middleware");
const skillsRouter = express.Router();

skillsRouter.route("/").get(GetAllSkills).post(CreateSkill);
skillsRouter
  .route("/:id")
  .get(protect, GetSkill)
  .put(protect, UpdateSkill)
  .delete(protect, DeleteSkill);

module.exports = skillsRouter;
