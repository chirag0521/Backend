import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function register(req, res) {

    const { username, email, password } = req.body

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {

        let message = "User already exists "

        if (isUserAlreadyExists.email === email) {

            message = message + " with this email. "
        }

        if (isUserAlreadyExists.username === username) {

            message = message + (isUserAlreadyExists.email === email ? " & " : " ") + "with this username"
        }
        return res.status(409).json({

            message,
            success: false,
            err: "User already exists"

        })

    }

    const user = await userModel.create({ username, email, password })

    await sendEmail({
        to: email,
        subject: "Welcome to Alex Perplexity!",
        html: `
        <p>Hi ${username} ,</p>
        <p>Thank you for registering at <strong>Alex Perplexity</strong>We're excited to have you on board!</p>
        <p>Best regards,<br>The Alex Perplexity Team</p>
        `
    })

    res.status(201).json({
        message:"User registered successfully",
        success:true,
        user:{
            id:user._id,
            username:user.username,
            email:user.email
        }
    })


}