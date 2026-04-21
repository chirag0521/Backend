const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req, res) {

    //konse user ne api pe request ki woh username yaha mil jayega
    const followerUsername = req.user.username
    //kon follow ho raha hai uskaa username ya kisse follow kiya jaa raha hai uska username params mein h
    const followeeUsername = req.params.username

    // same user following itself again check
    if (followeeUsername === followerUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }


    //does username exist to follow check
    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })
    if (!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are tyring to follow doesnot exists"
        })
    }


    //already following check
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })
    if (isAlreadyFollowing) {
        if (isAlreadyFollowing.status === "pending") {
            return res.status(409).json({
                message: `Follow request sent to ${followeeUsername}`,
            })
        }
        if (isAlreadyFollowing.status === "accepted") {
            return res.status(409).json({
                message: `You are already following ${followeeUsername}`
            })
        }
        if (isAlreadyFollowing.status === "rejected") {
            await followModel.findByIdAndUpdate(isAlreadyFollowing._id, {
                status: "pending"
            })
            return res.status(200).json({
                message: `Follow request sent to ${followeeUsername}`,
            })
        }

    }


    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status:"pending"
    })

    res.status(201).json({
        message: `Follow request sent to ${followeeUsername}`,
        follow: followRecord
    })

}



async function unfollowUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    /**
     * await followModel.deleteOne({
     * follower:followerUsername,
     * followee:followeeUsername,
     * })
     */

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })

}

module.exports = {
    followUserController,
    unfollowUserController
}