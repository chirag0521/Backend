// Server ko create karna

const express = require("express")
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")

const app = express()


app.use(express.json()) //middleware to read req.body
app.use("/api/auth", authRouter)
app.use(cookieParser())


module.exports = app


 
