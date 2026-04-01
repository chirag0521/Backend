/*
 Server ko start karna
 Database ko connect karna
 */

const app = require("./src/app")
const mongoose = require("mongoose")
const connectToDb = require("./src/config/database")

//env file ke liye
require("dotenv").config()

 // Database.js file se call kiya 
connectToDb()

app.listen(3000,()=>{
    console.log("Server is running on port 3000 !!");
    
})
