const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")

//initiating image kit
const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {

    console.log(req.body, req.file);

    const token = req.cookies.token

    // agar token nhi mila toh  - token nhi because = 1.register nhi kiya,  2.login nhi kiya , 3. ya fir token expire hogaya hoga ,
    if (!token) {
        return res.status(401).json({
            message: "Unauthorised Access : token not provided"
        })
    }
    let decoded = null
    //Agar token mila 
    //try catch isiliye use kiya ki agar token aya ot woh humara nhi hai ya kuch galat hai isiliye
    try {
        // const has block scope and it cant be accessed outside the block so we change to let 
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "User not authorized"
        })
    }


    // server se file cloudStorage (Image Kit) tak pocha rahi hai yeh code
    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: decoded.id
    })
    res.status(201).json({
        message: "Post Created Successfully",
        post
    })

}

async function getPostController(req, res) {

    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorised access"
        })
    }

    let decoded;

    //agar token sahi hoga toh token create karte waqt agar jod data diya tha i.e. id woh ayega decoded mein
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return res.status(401).json({
            message: "Token invalid"
        })
    }

    const userId = decoded.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "Post fetched successfully",
        posts
    })
}

async function getPostDetailsController(req, res) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorised access"
        })
    }
    let decoded;

    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)

    } catch (err) {
        return res.status(401).json({
            message: "Invalid Token"
        })
    }
    const userId = decoded.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found."
        })
    }
    //post.user and userId dono objectID hai objectId normally compare nhi hote hai
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

module.exports = { createPostController, getPostController, getPostDetailsController }

