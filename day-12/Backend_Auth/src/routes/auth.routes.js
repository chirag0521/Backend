const express = require("express")
const authRouter = express.Router()
const userModel = require("../models/user.model")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")


// POST = /api/auth/register

authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({ email })
    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists with this email"
        })
    }

    const user = await userModel.create({
        name, email,
        password: crypto.createHash("md5").update(password).digest('hex') // converts password to hash
    })

    // now we create token
    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET, { expiresIn: "1h" }) // 1hr ke baad expire hoga uske baad firse login karna padeha

    res.cookie("token", token)

    res.status(201).json({
        message: "User created successfully",
        user
    })
})

//GET = /api/auth/get-me
authRouter.get('/get-me', async (req, res) => {
    console.log("Route HIT");

    const token = req.cookies.token

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    console.log(decoded);

    const user = await userModel.findById(decoded.id)

    res.json({
        name: user.name,
        email: user.email,
    })

})

//POST = /api/auth/login
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body

    //check ki user exist karta hai ya nhi iss email id se
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"User not found with this email"
        })

    }
    //password ka hash nikala
    const hash = crypto.createHash('md5').update(password).digest('hex')
    
    // abh password check karte hai ki iss email ka h ya nhi
    const isPasswordValid = hash === user.password

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({
        id:user._id,
    }, process.env.JWT_SECRET,{expiresIn:"1h"})

    res.cookie("token",token)

    res.status(201).json({
        message:"User logged in successfully",
        user:{
            name:user.name,
            email:user.email,
        }
    })

     
})

module.exports = authRouter