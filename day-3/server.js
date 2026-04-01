const express = require("express")
const app = express()
app.use(express.json())
const notes = []

app.post("/notes",(req,res)=>{ // "/notes" api h fronted se request ayegi isme or abhi postman as frontend act kar raha h

    console.log(req.body); // request.body ke under rahega notes ka title and description
   
    notes.push(req.body) // request.body ka data ko hi humne notes array mein push kiya hai
    
    res.send("note created")
})

app.get("/notes",(req,res)=>{  // dono api ke naam same h "/notes" but method different hai ek baar POST or ek barr GET
    res.send(notes)
})

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})