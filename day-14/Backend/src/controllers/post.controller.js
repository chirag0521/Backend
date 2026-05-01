const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.model")

//initiating image kit
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {

    // console.log(req.body, req.file);

    // server se file cloudStorage (Image Kit) tak pocha rahi hai yeh code
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })
    res.status(201).json({
        message: "Post Created Successfully",
        post
    })

}

async function getPostController(req, res) {

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Post fetched successfully",
        posts
    })
}

async function getPostDetailsController(req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }
    //post.user  objectID hai|| objectId normally compare nhi hote hai
    const isValidUser = post.user.toString() === userId  // userId decoded.id se nikala hai isiliye woh already string mein hai
    if (!isValidUser) {
        return res.status(403).json({
            message: "Forbidden content"
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully",
        post
    })
}

async function likePostController(req, res) {
    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message: "Post liked succesfully",
        like
    })

}

async function unLikePostController(req, res) {
    const username = req.user.username
    const postId = req.params.postId

    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    })
    if (!isLiked) {
        return res.status(400).json({
            message: "Post not liked",

        })
    }

    await likeModel.findOneAndDelete({ _id: isLiked._id })
    return res.status(200).json({
        message: "post unliked succesfully"
    })

}

async function getFeedController(req, res) {

    const user = req.user
    const posts = await Promise.all((await postModel.find().populate("user").lean())
        .map(async (post) => {
            const isLiked = await likeModel.findOne({
                user: user.username,
                post: post._id
            })
            post.isLiked = Boolean(isLiked)

            return post
        }))

    res.status(200).json({
        message: "Posts fetched Successfully",
        posts
    })
}

module.exports = { createPostController, getPostController, getPostDetailsController, likePostController, getFeedController, unLikePostController }

