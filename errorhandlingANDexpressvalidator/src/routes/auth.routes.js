import { Router } from "express";
import { registerUser } from "../controllers/auth.controller.js";
import { body, validationResult } from "express-validator";
import { registerValidation } from "../validation/auth.validation.js";

const authRouter = Router()

authRouter.post("/register",
    // [
    //     body("username").isString().withMessage("username should be string"),
    //     body("eamil").isEmail().withMessage("Email should be valid email address"),
    //     (req, res, next) => {
    //         const errors = validationResult(req)

    //         if (errors.isEmpty()) {
    //             return next()
    //         }

    //         res.status(400).json({
    //             errors: errors.array()
    //         })
    //     }
    // ]
    // ,
    
   registerValidation, registerUser)

export default authRouter