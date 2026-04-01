// server ko create karna
// server ko config karna

const express = require("express")
const app = express()

app.use(express.json()) //middleware
const notes = []

//POST api - /notes

app.post("/notes",(req,res)=>{
    console.log(req.body)
    notes.push(req.body)

    //actual way of sending response by server
     res.status(201).json({
        message:"Note created successfully"
    })

    console.log(notes);
    // res.send("Note created")
})

//GET api - /notes (server se data jayega client pe)

app.get("/notes" , (req,res)=>{
    res.status(200).json({
        notes:notes
    })
})

//DELETE api - /notes/:index

app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index]

    res.status(204).json({
        message : "Note  deleted successfully"
    })
})

//PATCH api -/notes/:index
//sirf description update karenge

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description
    
    res.status(200).json({
        message :"description updated"
    })

})

module.exports = app