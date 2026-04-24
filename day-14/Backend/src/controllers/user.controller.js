const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req, res) {

    //konse user ne api pe request ki =  woh username yaha mil jayega
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
            await followModel.findByIdAndUpdate(isAlreadyFollowing._id,{status:"pending"},{new:true})
            return res.status(200).json({
                message: `Your previous request was rejected. Follow request sent again to ${followeeUsername}`,
            })
        }

    }


    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
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
     * @anotherMethod =
     * await followModel.deleteOne({
     * follower:followerUsername,
     * followee:followeeUsername,
     * })
     */

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })

}


async function getPendingRequestController(req, res) {
    const username = req.user.username

    const pendingRequests = await followModel.find({
        followee: username,
        status: "pending"
    })
/**
 * @remember =  find humesha array return karta hai isilye woh empty ho skta hai per null nhi isiliye "if" ese likha hai
 */
    if (pendingRequests.length === 0) {
        return res.status(200).json({
            message: "No request pending found",
            pendingRequests:[]
        })
    }
    res.status(200).json({
        message: "pending follow requests",
        pendingRequests
    })
}

async function acceptFollowerController(req, res) {
    const followeeUsername = req.user.username
    const followerUsername = req.params.username

    /**
     * @description - we find user and then update its status from pending to accepted
     */
    const acceptRequest = await followModel.findOneAndUpdate({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    },
        { status: "accepted" },
        { new: true })

    if (!acceptRequest) {
        return res.status(404).json({
            message: "No pending request found"
        })
    }
    res.status(200).json({
        message: `${followerUsername} is now following you`,
        acceptRequest
    })
}

async function rejectFollowerController(req, res) {
    const followerUsername = req.params.username
    const followeeUsername = req.user.username

    const rejectRequest = await followModel.findOneAndUpdate({
        follower: followerUsername,
        followee: followeeUsername,
        status: "pending"
    },
        { status: "rejected" },
        { new: true })


    if (!rejectRequest) {
        return res.status(404).json({
            message: "No pending request found"
        })
    }
    res.status(200).json({
        message: `Follow request from ${followerUsername} rejected `,
        rejectRequest

    })
}



module.exports = {
    followUserController,
    unfollowUserController,
    getPendingRequestController,
    acceptFollowerController,
    rejectFollowerController

}