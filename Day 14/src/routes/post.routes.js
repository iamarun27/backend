const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middlewares/auth.middleware");
// post/api/posts = req.body {caption,img-file} [protected]

postRouter.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

postRouter.get("/", identifyUser, postController.getPostController);

// return detail about specific posts with its id
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);


// likes
postRouter.post('/like/:postId',identifyUser,postController.likePostController)
module.exports = postRouter;
