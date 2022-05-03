const asyncHandler = require('express-async-handler');

const GetAllSkills = asyncHandler(async (req, res) => {
    res.json({message: "Getting all system skills"});
})

const GetSkill = asyncHandler(async (req, res) => {
    res.json({message: `Get single skill with id: ${req.params.id} `})
})

const CreateSkill = asyncHandler(async (req, res) => {
    res.json({message: "Creating a skill"});
})

const UpdateSkill = asyncHandler(async (req, res) => {
    res.json({message: `Updating skill information with id: ${req.params.id}`});
})

const DeleteSkill = asyncHandler(async (req, res) => {
    res.json({"message": `Deleting a skill with id: ${req.params.id}`});
})

module.exports = {
    GetAllSkills,GetSkill, CreateSkill, UpdateSkill, DeleteSkill
}