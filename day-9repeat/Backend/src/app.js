// server ko create karna

const express = require("express")
const noteModel = require("./models/note.model")
const cors = require("cors")
const path = require("path")
const app = express()

app.use(express.json()) // middleware to use req.body
app.use(cors()) 
app.use(express.static("./public")) // middleware to use public folder's files


// POST api = /api/notes create and store in MONGODB

app.post('/api/notes',async (req,res)=>{
    const {title , description} = req.body
    const note = await noteModel.create({ // noteModel.create() joh bhi create karti hai usse return bhi karti hai isiliye variable mein store kiya
        title,description
    })

    res.status(201).json({
        message:"Note created successfully",
        note
    })
})

// GET api = /api/notes 

app.get('/api/notes',async (req,res)=>{
const notes = await noteModel.find()

res.status(200).json({
    message:"Notes fetched",
    notes
})
})

// DELETE api = /api/notes/:id

app.delete('/api/notes/:id',async (req,res)=>{
const id = req.params.id
await noteModel.findByIdAndDelete(id)
res.status(200).json({
    message:"Note Deleted",
})
})

//Update (patch) api = /api/notes/:id

app.patch('/api/notes/:id',async (req,res)=>{
const id = req.params.id
const {description} = req.body
await noteModel.findByIdAndUpdate(id,{description})
res.status(200).json({
    message:"Note updated"
})
})

app.use('*name',(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})

module.exports = app
