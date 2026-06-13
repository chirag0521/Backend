import { Router } from "express";
import { sendMessage, getChats, getMessages, deleteChat } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.middleware.js";


const chatRouter = Router()


/**
 * @route POST /api/chats/message
 * @desc Message exchange between user and AI
 * @access Private (only logged in user can access - we are checking this through authUser)
 * @body {messages}
 */
chatRouter.post("/message", authUser, sendMessage)

/**
 * @route GET /api/chats/
 * @desc Retrieve all chats of logged in user
 * @access Private (only logged in user can access - we are checking this through authUser)
 * @body {chats}
 */
chatRouter.get("/", authUser,getChats)

/**
 * @route GET /api/chats/:chatId/messages
 * @desc Retrieve all messages of that particular chat
 * @access Private (only logged in user can access - we are checking this through authUser)
 * @body {messages}
 */
chatRouter.get("/:chatId/messages", authUser, getMessages)

/**
 * @route DELETE /api/chats/delete/:chatId/
 * @desc Delete chat
 * @access Private (only logged in user can access - we are checking this through authUser)
 * @body {messages}
 */
chatRouter.delete("/delete/:chatId/",authUser, deleteChat)

export default chatRouter