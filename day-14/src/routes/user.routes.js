const express = require("express")
const userController = require("../controllers/user.controller")
const userRouter = express.Router()
const identiyUser = require("../middlewares/auth.middleware")

//@route POST api = /api/users/follow/:username
userRouter.post("/follow/:username", identiyUser, userController.followUserController)

/**
 * @route POST api = /api/users/unfollow/:username
 */
userRouter.post("/unfollow/:username", identiyUser, userController.unfollowUserController)


module.exports = userRouter