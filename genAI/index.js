import "dotenv/config"
import readline from 'readline/promises'
import { ChatMistralAI } from "@langchain/mistralai";
import { log } from "console";



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const model = new ChatMistralAI({
model: "mistral-medium-latest",
});


while(true){
    const userInput = await rl.question("You: ")

    const response = await model.invoke(userInput)

    console.log("AI: "+ response.text)
}

// const response = await model.invoke("What is the capital of India?")

// console.log(response.text);

rl.close()


// rl.question("What is your name? ", (name)=>{
//     console.log(`Hello ${name}`)
//     rl.close()
// })


