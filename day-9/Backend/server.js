// server ko start karna
//Database se connect karna

require('dotenv').config() // so that env file's variable can be accessed
const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()

app.listen(3000,()=>{
    console.log("Server is nunning on port number 3000");
    
})