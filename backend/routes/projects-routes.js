const express = require("express");
const {
  GetAllProjects,
  GetProject,
  CreateProject,
  UpdateProject,
  DeleteProject,
} = require("../controllers/ProjectsController");
const { protect } = require("../middleware/auth-middleware");
const projectsRouter = express.Router();

projectsRouter.route("/").get(GetAllProjects).post(protect, CreateProject);
projectsRouter
  .route("/:id")
  .get(GetProject)
  .put(protect, UpdateProject)
  .delete(protect, DeleteProject);

module.exports = projectsRouter;
