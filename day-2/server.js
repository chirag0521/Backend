const express = require("express")

const app  = express() // server instance created

app.get('/',(req,res)=>{
    res.send("hello")
})

app.get('/about',(req,res)=>{
    res.send(" This is about page I am learning backend")
})

app.listen(3000) // it starts the server



