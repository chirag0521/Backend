const express = require("express")
const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model")
const authRouter = express.Router()
const crypto = require("crypto")

//Register API = /api/auth/register
authRouter.post("/register", async (req, res) => {
    const { name, email, password } = req.body

    const isUserAlreadyExist = await userModel.findOne({ email })

    if (isUserAlreadyExist) {
        return res.status(409).json({
            message: "User already exist with this email"
        })
    }

    // hashing the password
    const hash = crypto.createHash("md5").update(password).digest("hex")

    // Database mein store karna hai
    const user = await userModel.create({
        name, email, password:hash
    })

    // We create token with the help of id and email

    const token = jwt.sign(
        {
            id: user._id,
            email: user.email
        }, process.env.JWT_SECRET)

    // Now we store token in cookies
    res.cookie("jwt_token", token) //name of token is jwt_token


    res.status(201).json({
        message: "User created ",
        user,
        token
    })

})


// Dummy api = /api/auth/protected
authRouter.post("/protected", (req, res) => {
    console.log(req.cookies);

    res.status(200).json({
        message: "This is a protected route"
    })

})


//LOGIN api =  /api/auth/login
// is type ke callback joh tabhi chalte hai jab kisi api mein request aati hai uuse bolte hai CONTROLLER
authRouter.post("/login",async (req,res)=>{
const {email,password} = req.body

// email or password check karna hai ki sahi h ya galat 
//or agar sahi hai toh naya token bana ke dena hai user ko


// == email check
const user = await userModel.findOne({email})
if(!user){
    return res.status(404).json({
        message:"user not found with this email"
    })
}
// const isPasswordMatched = user.password === password
const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")
if(!isPasswordMatched){
    return res.status(401).json({
        message:"Invalid password"
    })
}
const token = jwt.sign({
    id:user._id
},process.env.JWT_SECRET)

res.cookie("jwt_token", token)

res.status(200).json({
    message:"User logged in",
    user
})


})



module.exports = authRouter