"use strict";

const asyncHandler = require("express-async-handler");
const PageContentsModel = require("../models/PageContentModel");
const { ValidateAuthToken } = require("../helpers/AuthHelper");

const GetAllPageContents = asyncHandler(async (req, res) => {
  const contents = await PageContentsModel.find();
  const ActiveContents = contents.filter((c) => !c.IsDeleted);
  res.status(200).json(ActiveContents);
});

const GetPageContent = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const content = await PageContentsModel.findOne({ Slug: slug });
  if (content == null && content.IsDeleted)
    res.status(400).json({ ErrorMessage: "Page content not found!" });
  else res.status(200).json(content);
});

const CreatePageContent = asyncHandler(async (req, res) => {
  console.log(req)
  if (!ValidateAuthToken(req.headers.authorization)) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
    const { _id, Title, MetaData } = req.body;
    if (!Title)
      res.status(400).json({ ErrorMessage: "Please enter page content title" });
    else {
      const content = await PageContentsModel.create({
        Title,
        Slug: GenerateSlug(Title),
        MetaData,
        IsDeleted: false,
      });
      if (content == null)
        res
          .status(400)
          .json({ ErrorMessage: "There was an error saving page content" });
      else res.status(200).json(content);
    }
  }
});

const UpdatePageContent = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken(req.headers.authorization)) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
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
  }
});

const DeletePageContent = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken(req.headers.authorization)) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
    const deletedContent = await PageContentsModel.findByIdAndUpdate(
      req.params.id,
      {
        IsDeleted: true,
      }
    );

    if (deletedContent == null)
      res.status(400).json({
        ErrorMessage: "There was a problem with deleting a page content",
      });
    else res.status(200).json(deletedContent);
  }
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
