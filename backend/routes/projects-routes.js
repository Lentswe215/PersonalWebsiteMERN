const express = require("express");
const {
  GetAllProjects,
  GetProject,
  CreateProject,
  UpdateProject,
  DeleteProject,
} = require("../controllers/ProjectsController");
const projectsRouter = express.Router();

projectsRouter.route("/").get(GetAllProjects).post(CreateProject);
projectsRouter.route("/:id").get(GetProject).put(UpdateProject).delete(DeleteProject);

module.exports = projectsRouter;
