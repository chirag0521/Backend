// server ko create karna

const express = require("express")
const noteModel = require("./models/note.model")

const cors = require("cors")

const app = express()
app.use(express.json()) // middleware
app.use(cors())


// POST -  /api/notes 
//create new note and save data in mongoDB
// data ayega req.body se {title , description}

app.post('/api/notes' , async (req,res)=>{
    const {title ,description} = req.body

// yeh notemodel.create ek naya note create toh kar deti hai lekin kis data se create karni h woh hume object ke form mein batana padta hai || yaha per hume req.body se title or description mila h uske help se naya note banana hai || yeh woh mumbai wale cluster mein data save hota hai
    
   const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"Note created successfully",
        note
    })
})

// GET - /api/notes
// Fetch all notes data from mongoDB and send them to response

app.get("/api/notes", async (req,res)=>{
  const notes =  await noteModel.find()

  res.status(200).json({
    message:"Notes fetched successfully",
    notes
  })
})

//DELETE - /api/notes/:id 
//Delete note with the id from req.params

app.delete("/api/notes/:id" ,async (req,res)=>{
    const id = req.params.id

   await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"NOte deleted"
    })
    
})

//Patch - /api/notes:id
//update the description of the note by id
// req.body = {description}

app.patch("/api/notes/:id", async (req,res) =>{
    const id = req.params.id
    const {description} = req.body

    await noteModel.findByIdAndUpdate(id,{ description })

    res.status(200).json({
        message : "NOte updated"
    })
})

module.exports = app