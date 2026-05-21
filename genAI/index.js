import "dotenv/config"
import readline from 'readline/promises'
import { ChatMistralAI } from "@langchain/mistralai";
import { log } from "console";
import { createAgent, HumanMessage, tool } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod"


const emailTool = tool(
    sendEmail,
    {
        name: "emailTool",
        description: "Use this tool to send an email.",
        schema: z.object({
            to: z.string().describe("The recipient's email address"),
            html: z.string().describe("The HTML content of the email"),
            subject: z.string().describe("The subject of the email"),
        })

    }
)


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const model = new ChatMistralAI({
    model: "mistral-medium-latest",
});

const agent = createAgent({
    model,
    tools: [emailTool]
})

//to store chat of user and AI
const messages = []

while (true) {
    const userInput = await rl.question("You: ")

    messages.push(new HumanMessage(userInput))

    const response = await agent.invoke({ messages })

    messages.push(response.messages[response.messages.length - 1])

    console.log(response.messages[response.messages.length - 1].text);

    // console.log("AI: " + response.text)

}

// const response = await model.invoke("What is the capital of India?")

// console.log(response.text);

rl.close()


// rl.question("What is your name? ", (name)=>{
//     console.log(`Hello ${name}`)
//     rl.close()
// })


