/* Server create karna */
const express = require("express")
const app = express()

const noteModel = require("./models/notes.model")

app.use(express.json()) //middleware

//POST api - /notes

app.post("/notes", async (req, res) => {
    const { title, description } = req.body //destructure kiya aane wale data ko
    const note = await noteModel.create({
        title, description
    })
    res.status(201).json({
        message:"Note created successfully!!",
        note
    })

})

//GET api /notes (it will fetch all the notes data)
app.get("/notes",async (req,res)=>{
    const notes = await noteModel.find()
    
    res.status(200).json({
        message:"Notes send successfully",
        notes
    })
})

module.exports = app