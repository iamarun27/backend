const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
// post/api/posts = req.body {caption,img-file} [protected]

postRouter.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);

postRouter.get("/", postController.getPostController);



// return detail about specific posts with its id
postRouter.get('/details/:postId',postController.getPostDetailsController)

module.exports = postRouter;
