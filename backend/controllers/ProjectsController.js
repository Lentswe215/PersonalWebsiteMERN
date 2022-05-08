"use strict";

const asyncHandler = require('express-async-handler');

const GetAllProjects = asyncHandler(async (req, res) => {
    res.json({message: "Getting all system projects"});
})

const GetProject = asyncHandler(async (req, res) => {
    res.json({message: `Get single project with id: ${req.params.id} `})
})

const CreateProject = asyncHandler(async (req, res) => {
    res.json({message: "Creating a project"});
})

const UpdateProject = asyncHandler(async (req, res) => {
    res.json({message: `Updating project information with id: ${req.params.id}`});
})

const DeleteProject = asyncHandler(async (req, res) => {
    res.json({"message": `Deleting a project with id: ${req.params.id}`});
})

module.exports = {
    GetAllProjects, GetProject, CreateProject, UpdateProject, DeleteProject
}