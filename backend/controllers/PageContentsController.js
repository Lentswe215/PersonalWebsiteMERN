const asyncHandler = require('express-async-handler');

const GetAllPageContents = asyncHandler(async (req, res) => {
    res.json({message: "Getting all system page contents"});
})

const GetPageContent = asyncHandler(async (req, res) => {
    res.json({message: `Get single page content with id: ${req.params.id} `})
})

const CreatePageContent = asyncHandler(async (req, res) => {
    res.json({message: "Creating a page content"});
})

const UpdatePageContent = asyncHandler(async (req, res) => {
    res.json({message: `Updating page content information with id: ${req.params.id}`});
})

const DeletePageContent = asyncHandler(async (req, res) => {
    res.json({"message": `Deleting a page content with id: ${req.params.id}`});
})

module.exports = {
    GetAllPageContents, GetPageContent, CreatePageContent, UpdatePageContent, DeletePageContent
}