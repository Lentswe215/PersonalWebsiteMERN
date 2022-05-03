const express = require("express");
const {
  GetAllPageContents,
  GetPageContent,
  CreatePageContent,
  UpdatePageContent,
  DeletePageContent,
} = require("../controllers/PageContentsController");
const pageContentRouter = express.Router();

pageContentRouter.route("/").get(GetAllPageContents).post(CreatePageContent);
pageContentRouter.route("/:id").get(GetPageContent).put(UpdatePageContent).delete(DeletePageContent);

module.exports = pageContentRouter;
