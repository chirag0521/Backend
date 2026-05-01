const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")

// POST = /api/posts [protected] {protected matlab jis user ke paas token hoga sirf wahi access kar sakta hai}

postRouter.post("/", upload.single("image"), identifyUser, postController.createPostController)

//GET = /api/posts/ [protected]

postRouter.get("/", identifyUser, postController.getPostController)

//GET = /api/posts/details/:postId
// - returns details of specific post with the id
//also checks whether the posts belongs to the user who is requesting

postRouter.get("/details/:postId", identifyUser, postController.getPostDetailsController)

/**
 * @route POST = /api/posts/like/:postId
 * @description - like a post with id provided in the request params
 */

postRouter.post("/like/:postId",identifyUser,postController.likePostController)

/**
 * @route Post = /api/posts/unlike/:postId
 * @description - unlike post ko delete karta hai collection se
 */
postRouter.post("/unlike/:postId",identifyUser,postController.unLikePostController)

/**
 * @route GET = /api/posts/feed
 * @description - get all the post created in the DB
 * @access - private (joh user login h sirf wahi dekh skta hai)
 */

postRouter.get("/feed",identifyUser,postController.getFeedController)


module.exports = postRouter