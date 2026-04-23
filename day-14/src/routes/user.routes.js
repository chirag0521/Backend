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


/**
 * @route GET api = /api/user/follow/requests
 */
userRouter.get("/follow/requests", identiyUser, userController.getPendingRequestController)

/**
 * @route PATCH api = /api/user/follow/accept/:username
 * @description accept follow request
 */
userRouter.patch("/follow/accept/:username", identiyUser, userController.acceptFollowerController)

/**
 * @route PATCH api = /api/user/follow/reject/:username
 * @description reject follow request
 */
userRouter.patch("/follow/reject/:username",identiyUser,userController.rejectFollowerController)



module.exports = userRouter