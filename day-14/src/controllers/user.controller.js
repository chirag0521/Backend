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
        username:followeeUsername
    })
    if(!isFolloweeExists){
        return res.status(404).json({
            message:"User you are tyring to follow doesnot exists"
        })
    }


    //already following check
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })
    if (isAlreadyFollowing) {
        return res.status(200).json({ // we can also user status code 409
            message: `You are already following ${followerUsername}`,
            follow: isAlreadyFollowing,
        })
    }


    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You have started following ${followeeUsername}`,
        follow: followRecord
    })

}



async function unfollowUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername,
    })

    if(!isUserFollowing){
        return res.status(200).json({
            message:`You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message:`You have unfollowed ${followeeUsername}`
    })

}

module.exports = {
    followUserController,
    unfollowUserController
}