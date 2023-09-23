"use strict";

const asyncHandler = require("express-async-handler");
const ProjectsModel = require("../models/ProjectsModel");
const { IsNotEmpty } = require("../StringHelper");

const GetAllProjects = asyncHandler(async (req, res) => {
  const projects = await ProjectsModel.find();
  const ActiveProjects = projects.filter((c) => !c.IsDeleted);
  res.status(200).json(ActiveProjects);
});

const GetProject = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken()) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
    const project = await ProjectsModel.findById(req.params.id);

    if (project == null)
      res.status(400).json({ ErrorMessage: "Project is not available!" });
    else res.status(200).json(project);
  }
});

const CreateProject = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken()) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
    if (!req.body.Name || !req.body.LinkUrl)
      res
        .status(400)
        .json({ ErrorMessage: "Please make sure all required field!" });
    else {
      const project = await ProjectsModel.create({
        Name: req.body.Name,
        Image: req.body.Image,
        LinkUrl: req.body.LinkUrl,
        AddedBy: req.body.AddedBy,
        ModifiedBy: req.body.AddedBy,
        IsDeleted: false,
      });

      res.status(200).json(project);
    }
  }
});

const UpdateProject = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken()) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
    const project = await ProjectsModel.findById(req.params.id);

    if (!project) res.status(400).json({ ErrorMessage: "Project not found!" });
    else {
      let ProjectUpdatedInfo = {
        Name: IsNotEmpty(req.body.Name, project.Name),
        Image: IsNotEmpty(req.body.Image, project.Image),
        ModifiedBy: IsNotEmpty(req.body.ModifiedBy, project.ModifiedBy),
        IsDeleted: false,
      };

      ProjectsModel.findByIdAndUpdate(
        req.params.id,
        ProjectUpdatedInfo,
        { new: true },
        function (err, doc) {
          if (err) res.status(400).json({ ErrorMessage: "Error: " + err });
          else res.status(200).json(doc);
        }
      );
    }
  }
  // const updatedProject =
});

const DeleteProject = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken()) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
    const project = await ProjectsModel.findById(req.params.id);
    if (project == null)
      res.status(400).json({ ErrorMessage: "Project not found" });
    else {
      const deletedProject = await ProjectsModel.findByIdAndUpdate(
        req.params.id,
        {
          IsDeleted: true,
        },
        {
          new: true,
        }
      );

      if (deletedProject == null)
        res
          .status(400)
          .json({ ErrorMessage: "There was a problem deleting project." });
      else res.status(200).json(deletedProject);
    }
  }
});

module.exports = {
  GetAllProjects,
  GetProject,
  CreateProject,
  UpdateProject,
  DeleteProject,
};
