// server ko create karna

const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const app = express()
app.use(express.json()) // middleware
app.use(cors())


//POST api - /api/notes - create new note and save in mongoDB

app.post('/api/notes', async (req, res) => {
    const { title, description } = req.body

    const note = await noteModel.create({
        title, description
    })
    res.status(201).json({
        message: "Note created",
        note
    })
})

// GET api - /api/notes

app.get('/api/notes', async (req, res) => {
    const notes = await noteModel.find()
    //.find returns array in array of objects format and we store them in notes 
    res.status(200).json({
        message: "Notes fetched",
        notes
    })
})

//DELETE api - /api/notes/:id
app.delete('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    await noteModel.findByIdAndDelete(id)
    res.status(200).json({
        message: "Note deleted."
    })
})

//UPDATE (patch) api - /api/notes/:id
app.patch('/api/notes/:id', async (req, res) => {
    const id = req.params.id
    const { description } = req.body
    await noteModel.findByIdAndUpdate(id, { description }) // yeh description humesha object ke form mein hi jayega
    res.status(200).json({
        message: "Note updated"
    })
})

module.exports = app