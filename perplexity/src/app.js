import express from "express";
import cookieParser from "cookie-parser";

const app = express()

//Middlewares
app.use(express.json())
app.use(cookieParser())

//Health-check 
app.get("/", (req, res) => {
    res.json({ message: "Server is running" })
})


export default app