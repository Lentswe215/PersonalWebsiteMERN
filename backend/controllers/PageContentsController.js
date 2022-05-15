"use strict";

const asyncHandler = require("express-async-handler");
const PageContentsModel = require("../models/PageContentModel");

const GetAllPageContents = asyncHandler(async (req, res) => {
  const contents = await PageContentsModel.find();
  res.status(200).json(contents);
});

const GetPageContent = asyncHandler(async (req, res) => {
  const content = await PageContentsModel.findById(req.params.id);
  if (content == null)
    res.status(400).json({ ErrorMessage: "Page content not found!" });
  else res.status(200).json(content);
});

const CreatePageContent = asyncHandler(async (req, res) => {
  if (!req.body.Title)
    res.status(400).json({ ErrorMessage: "Please enter page content title" });
  else {
    const content = await PageContentsModel.create({
      Title: req.body.Title,
      Slug: GenerateSlug(req.body.Title),
      MetaData: req.body.MetaData,
      IsDeleted: false,
    });
    if (content == null)
      res
        .status(400)
        .json({ ErrorMessage: "There was an error saving page content" });
    else res.status(200).json(content);
  }
});

const UpdatePageContent = asyncHandler(async (req, res) => {
  const updatedContent = await PageContentsModel.findByIdAndUpdate(
    req.params.id,
    {
      Title: req.body.Title,
      Slug: GenerateSlug(req.body.Title),
      MetaData: req.body.MetaData,
      IsDeleted: false,
    }
  );

  if (updatedContent == null)
    res
      .status(400)
      .json({ ErrorMessage: "There was a problem saving page content" });
  else res.status(200).json(updatedContent);
});

const DeletePageContent = asyncHandler(async (req, res) => {
  const deletedContent = await PageContentsModel.findByIdAndUpdate(
    req.params.id,
    {
      IsDeleted: true,
    }
  );

  if (deletedContent == null)
    res
      .status(400)
      .json({
        ErrorMessage: "There was a problem with deleting a page content",
      });
  else res.status(200).json(deletedContent);
});

const GenerateSlug = (Title) => {
  return Title.replace(/\s/g, "-").toLowerCase();
};

module.exports = {
  GetAllPageContents,
  GetPageContent,
  CreatePageContent,
  UpdatePageContent,
  DeletePageContent,
};
