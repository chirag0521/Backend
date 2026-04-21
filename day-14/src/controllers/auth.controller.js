const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

async function registerController(req, res) {
    const { username, email, password, bio, profileImage } = req.body


    //check for email and username separately
    // const isUserExistsByEmail = await userModel.findOne({ email })
    // if (isUserExistsByEmail) {
    //     return res.status(409).json({
    //         message: "User with this email already exists"
    //     })
    // }

    // const isUserExistsByUsername = await userModel.findOne({ username })
    // if(isUserExistsByUsername){
    //     return res.status(409).json({
    //         message:"User exists with this username"
    //     })
    // }


    // check for email and username in a single pass
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    // if(isUserAlreadyExists){
    //     return res.status(409).json({
    //         // iss case mein agar dono same hue toh bhi sirf email already exists yehi print hoga
    //         message:"User already exists" + (isUserAlreadyExists.email === email ? "Email already Exists" : "Username already exists")
    //     })
    // }

    // AGar dono email or username aye toh ese ==
    if (isUserAlreadyExists) {
        let message = "User already exists: "

        if (isUserAlreadyExists.email === email) {
            message = message + "with this email"
        }

        if (isUserAlreadyExists.username === username) {
            message = message + (isUserAlreadyExists.email === email ? " & " : "") + "with this username"
        }
        return res.status(409).json({ message })
    }

    const hashPassword = await bcrypt.hash(password, 10)

    //Storing in database 
    const user = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hashPassword,
    })

    // Token creation
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token) // first is the name of the token and the other is token itself, we can keep anyName

    res.status(201).json({
        message: "User registered",
        user: {
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })

}


async function loginController(req, res) {
    const { username, email, password } = req.body


    //  user basically 2 form mein login karta hai
    // username and password  ||OR|| email and password 
    const user = await userModel.findOne({
        $or: [
            {
                username: username
            },
            {
                email: email
            }
        ]
    })
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }
    const token = jwt.sign({
        id: user._id, username: user.username
    }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user: {
            username: user.name,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}

module.exports = {
    registerController,
    loginController
}