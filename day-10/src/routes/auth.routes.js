const express = require("express")
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken")
const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {

    const { name, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists with this email id"
        })
    }

    const user = await userModel.create({
        name, email, password
    })

    const token = jwt.sign(
        {
            id: user._id,
            //email:user.email // email bhejne se signature mein id, or email dono hote
        },
        process.env.JWT_SECRET

    )

    res.cookie("jwt_token", token) // token save hoga client ke cookies mein

    res.status(201).json({
        message: "User registered",
        user,
        token
    })

})

// /api/auth/register 

module.exports = authRouter 