const express = require("express")
const authController = require("../controllers/auth.controller")

const authRouter = express.Router()

// ===== OR =====
/**
 * const {Router} = require("express")
 * const router = Router()
 */

authRouter.post('/register',authController.registerUser)

authRouter.post("/login",authController.loginUser)


module.exports = authRouter