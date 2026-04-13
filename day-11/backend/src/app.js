// Server ko create karna
const express = require("express")
const authRouter = require("./routes/auth.routes")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json()) // middleware
app.use(cookieParser()) // yeh humesha app.use("prefix" , authRouter) se phele rahega

app.use("/api/auth", authRouter)

module.exports = app