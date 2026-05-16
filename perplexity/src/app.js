import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";

const app = express()

//Middlewares
app.use(express.json())
app.use(cookieParser())

//Health-check 
app.get("/", (req, res) => {
    res.json({ message: "Server is running" })
})

/**
 * @Auth_Routes
 */

app.use("/api/auth", authRouter)


export default app