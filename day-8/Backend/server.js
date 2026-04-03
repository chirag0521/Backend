/* Server ko start karna
Database se connect karna
 */
require('dotenv').config()
const app = require("./src/app")
const connectToDB = require("./src/config/database")

connectToDB()

app.listen(3000,()=>{
    console.log("Server is running on port number 3000");
})

