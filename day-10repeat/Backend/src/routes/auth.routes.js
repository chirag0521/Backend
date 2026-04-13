//Register API 
const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email }) // findOne always takes an object in it as condition to  find 

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists with this email address"
        })
    }

    const user = await userModel.create({
        name, email, password
    })

    // We create token with JWT_SECRET and user data
    // and set the token in cookies storage of client
    
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SECRET)

    // WE set TOKEN in cookie storage

    res.cookie("jwt_token",token) // nmae of token  = jwt_token

    res.status(201).json({
        message: "User registered",
        user,
        token
    })
})








module.exports = authRouter