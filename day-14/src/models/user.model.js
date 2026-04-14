const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username already exists"],
        required: [true, "User name is required"]
    },
    email: {
        type: String,
        unique: [true, "Account with this email already exists"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    bio: String,
    profileImage: {
        type: String,
        default: "https://ik.imagekit.io/alex2105/Cohort%202.0/people_14024658.png?updatedAt=1776139458080",
    }
})

const userModel = mongoose.model("users",userSchema)

module.exports = userModel
