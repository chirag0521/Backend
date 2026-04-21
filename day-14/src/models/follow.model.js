const mongoose = require("mongoose")

const followSchema = new mongoose.Schema({
    //kon follower kar raha h
    follower: {
        type: String,
    },
    //kise follow kiya ja raha hai
    followee: {
        type: String,
    }
}, {
    timestamps: true
})
 
followSchema.index({ follower: 1, followee: 1 }, { unique: true })

const followModel = mongoose.model("follows", followSchema)

module.exports = followModel