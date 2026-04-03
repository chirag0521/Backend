const mongoose = require("mongoose")

// Phele format batana padhta hai ki data kaise rahega isse schema bolte hai
const noteSchema = new mongoose.Schema({
    title: String,
    description:String
})

//note se related koi CRUD operation karna h toh model ki zarurat padti hai
//mongoose.model() method use kiya jaata hai
//phele parameter hai collection
//dusra parameter hai schema ka ki pura collection kis type mein hoga
// or lastly pure ko ek const ke under save karnah hai

const noteModel = mongoose.model("notes",noteSchema)

module.exports = noteModel