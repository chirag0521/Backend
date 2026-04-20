const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    //kon follower kar raha h
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Follower is required"]
    },

    //kise follow kiya ja raha hai
    followee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "Followee is required"]
    }
}, {
    timestamps: true
})

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel