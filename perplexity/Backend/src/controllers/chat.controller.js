import { response } from "express";
import { generateResponse, generateChatTitle } from "../services/ai.service.js";
import chatModel from "../models/chat.model.js"
import messageModel from "../models/message.model.js";

export async function sendMessage(req, res) {

    //yeh message user bhejega or AI iska answer karega
    const { message, chat: chatId } = req.body

    let title = null, chat = null;;


    //agar chat phele se hai toh naya chat matt banao
    if (!chatId) {

        title = await generateChatTitle(message)

        chat = await chatModel.create({
            user: req.user.id,
            title
        })

    }

    const userMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: message,
        role: "user"
    })

    //iska matlab ek chat mein kya kya baate hui hai
    const messages = await messageModel.find({ chat: chatId || chat._id })


    const result = await generateResponse(messages)

    const aiMessage = await messageModel.create({
        chat: chatId || chat._id,
        content: result,
        role: "ai"
    })


    res.status(201).json({
        title,
        chat,
        userMessage,
        aiMessage
    })
}

//user ki saari chats fetch karega yeh function
export async function getChats(req, res) {
    const user = req.user

    const chats = await chatModel.find({ user: user.id })

    res.status(200).json({
        message: "Chats retrieved successfully",
        chats
    })
}

//ek particular chat ke saare messages return karwadega
export async function getMessages(req, res) {
    //check ki yeh chat ussi user ki chat hai joh user request kar raha hai
    const { chatId } = req.params
    const chat = await chatModel.findOne({
        _id: chatId,
        user: req.user.id
    })

    // 2 hi options hai - chat Id galat hai or ya toh chatId sahi per woh uss user ka nhi hai
    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    const messages = await messageModel.find({
        chat: chatId
    })

    res.status(200).json({
        message: "Messages retrieved successfully",
        messages
    })
}

export async function deleteChat(req, res) {
    const { chatId } = req.params

    const chat = await chatModel.findOneAndDelete({
        _id: chatId,
        user: req.user.id
    })

    await messageModel.deleteMany({
        chat: chatId
    })

    if (!chat) {
        return res.status(404).json({
            message: "Chat not found"
        })
    }

    res.status(200).json({
        message: "Chat deleted successfully"
    })

}