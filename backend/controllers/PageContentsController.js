"use strict";

const asyncHandler = require("express-async-handler");
const PageContentsModel = require("../models/PageContentModel");
const { content } = require("googleapis/build/src/apis/content");
const { ValidateAuthToken } = require("../helpers/AuthHelper");

const GetAllPageContents = asyncHandler(async (req, res) => {
  if (ValidateAuthToken()) {
    const contents = await PageContentsModel.find();
    const ActiveContents = contents.filter((c) => !c.IsDeleted);
    res.status(200).json(ActiveContents);
  } else {
    res.status(401).send({ ErrorMessage: "Not valid user" });
  }
});

const GetPageContent = asyncHandler(async (req, res) => {
  const content = await PageContentsModel.findOne({ Slug: req.params.id });
  if (content == null && content.IsDeleted)
    res.status(400).json({ ErrorMessage: "Page content not found!" });
  else res.status(200).json(content);
});

const CreatePageContent = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken()) {
    res.status(401).send({ ErrorMessage: "Not Valid user" });
  } else {
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
  }
});

const UpdatePageContent = asyncHandler(async (req, res) => {
  if (!ValidateAuthToken()) {
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
  if (!ValidateAuthToken()) {
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
