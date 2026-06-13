import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"
import { HumanMessage, SystemMessage, AIMessage } from "langchain"


const geminiModel = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
});

const mistralModel = new ChatMistralAI({
    model: "mistral-small-latest",
    apiKey: process.env.MISTRAL_API_KEY
})


// this function is used to generate response from AI
export async function generateResponse(messages) {
    
    // const response = await geminiModel.invoke([
    //     new HumanMessage(message)
    // ])

    const response = await geminiModel.invoke(messages.map(message => {
        if (message.role === "user") {
            return new HumanMessage(message.content)
        } else if (message.role === "ai") {
            return new AIMessage(message.content)
        }
    }))

    return response.text
}

// this function is used to generate title for chat and this title will be genrated by AI
export async function generateChatTitle(message) {

    // generating chat title is a very small task for AI so for this task gemini would take little more time than mistral as gemini is a big model so we have to save cost so for this task we are using small model like mistral

    const response = await mistralModel.invoke([
        new SystemMessage(`You are a helpful assistant that generates concise and descriptive title for chat conversations.
                        User will provide you with the first messages of a chat conversation and you will generate a title for the chat that captures the essence of the conversation in 2-4 words. The title should be clear, relevant and engaging giving users a quick understanding of the chat's topic.
                        `),

        new HumanMessage(`
            Generate a title for a chat conversation based on the following first message:${message} `)
    ])


    return response.text
}