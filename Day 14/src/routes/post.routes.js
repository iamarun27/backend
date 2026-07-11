const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
// post/api/posts = req.body {caption,img-file} [protected]

postRouter.post(
  "/posts",
  upload.single("image"),
  postController.createPostController,
);

module.exports = postRouter;
