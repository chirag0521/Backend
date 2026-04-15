const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ storage: multer.memoryStorage() })


// POST = /api/posts [protected] {protected matlab jis user ke paas token hoga sirf wahi access kar sakta hai}

postRouter.post("/",upload.single("image"), postController.createPostController)
 



module.exports = postRouter