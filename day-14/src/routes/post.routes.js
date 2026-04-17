const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })


// POST = /api/posts [protected] {protected matlab jis user ke paas token hoga sirf wahi access kar sakta hai}

postRouter.post("/", upload.single("image"), postController.createPostController)

//GET = /api/posts/ [protected]

postRouter.get("/", postController.getPostController)

//GET = /api/posts/details/:postId
// - returns details of specific post with the id
//also checks whether the posts belongs to the user who is requesting

postRouter.get("/details/:postId", postController.getPostDetailsController)


module.exports = postRouter