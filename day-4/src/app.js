// server create karna
// server ko config karna 

const express = require("express")
const app = express()// server created

app.use(express.json())

const notes = []

app.get("/",(req,res)=>{
    res.send("Hello world")
})

//We create api of name /notes with method POST
//POST method api

app.post("/notes", (req,res)=>{
    console.log(req.body);
    notes.push(req.body)
    res.send("note created")
    console.log(notes);
    
    
})


//GET method api
//client ko dikhega uske paas yeh notes GET karne se .. POSTMAN mein dikhega abh yeh

app.get("/notes",(req,res)=>{
    res.send(notes)     
})

//DELETE method api

app.delete("/notes/:index",(req,res)=>{
    console.log(req.params.index);
    delete notes[req.params.index] // yeh kiya toh jisko hataya uske jagah null ayega array mein
    // notes.splice(req.params.index,1) // yeh kiya toh null nhi ayega
    res.send(`note ${req.params.index} deleted successfully`)
    
})


//PATCH method api
// /notes/:index

app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].title = req.body.title
    // notes[req.params.index].description = req.body.description
    //dono update karne ke liye PUT kyuki pura hi update ho raha h
    res.send("description updated")
})

//PUT method api

app.put("/notes/:index",(req,res)=>{
    notes[req.params.index] = req.body
    res.send("Fully updated")
})

//server start karna hai server.js mein toh export kiya
module.exports = app