const express = require("express");
const {
  GetAllPageContents,
  GetPageContent,
  CreatePageContent,
  UpdatePageContent,
  DeletePageContent,
} = require("../controllers/PageContentsController");
const { protect } = require("../middleware/auth-middleware");
const pageContentRouter = express.Router();

pageContentRouter
  .route("/")
  .get(protect, GetAllPageContents)
  .post(protect, CreatePageContent);
pageContentRouter.route("/:slug").get(GetPageContent);
pageContentRouter
  .route("/:id")
  .put(protect, UpdatePageContent)
  .delete(protect, DeletePageContent);

module.exports = pageContentRouter;
