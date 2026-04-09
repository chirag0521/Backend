const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    title:String,
    description:String
})

// mongoose.model("notes",noteSchema) // yeh ek model create karta hai isiliye hum isse store karate hai noteModel

const noteModel = mongoose.model("notes", noteSchema)

module.exports = noteModel