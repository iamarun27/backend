// import "dotenv/config"
// import readline from "readline/promises";
// import { ChatMistralAI } from "@langchain/mistralai";
// import { HumanMessage, tool, createAgent } from "langchain";
// import { sendEmail } from "./mail.service.js";
// import * as z from "zod";


// const emailTool = tool(
//     sendEmail,
//     {
//         name: "emailTool",
//         description: "Use this tool to send an email",
//         schema: z.object({
//             to: z.string().describe("The recipient's email address"),
//             html: z.string().describe("The HTML content of the email"),
//             subject: z.string().describe("The subject of the email"),
//         })
//     }
// )



// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout,
// });

// const model = new ChatMistralAI({
//     model: "mistral-small-latest",
// })

// const agent = createAgent({
//     model,
//     tools: [ emailTool ]
// })

// const messages = []

// while (true) {
//     const userInput = await rl.question("\x1b[32mYou:\x1b[0m ")

//     messages.push(new HumanMessage(userInput))

//     const response = await agent.invoke({
//         messages
//     })

//     messages.push(response.messages[ response.messages.length - 1 ])



//     console.log(`\x1b[34m[AI]\x1b[0m ${response.messages[ response.messages.length - 1 ].content}`)
// }


import "dotenv/config";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, tool, createAgent } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";

// Email Tool
const emailTool = tool(sendEmail, {
  name: "emailTool",
  description: "Use this tool to send an email",
  schema: z.object({
    to: z.string().describe("The recipient's email address"),
    html: z.string().describe("The HTML content of the email"),
    subject: z.string().describe("The subject of the email"),
  }),
});

// Readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Mistral Model
const model = new ChatMistralAI({
  model: "mistral-small-latest",
  apiKey: process.env.MISTRAL_API_KEY,
});

// Agent
const agent = createAgent({
  model,
  tools: [emailTool],
});

// Conversation memory
const messages = [];

// Retry function
async function invokeWithRetry(input, retries = 3) {
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await agent.invoke(input);
    } catch (error) {
      const isRateLimit =
        error.statusCode === 429 ||
        error.status === 429;

      if (!isRateLimit || attempt === retries - 1) {
        throw error;
      }

      const waitTime = (attempt + 1) * 5000;

      console.log(
        `\x1b[33mRate limit reached. Retrying in ${
          waitTime / 1000
        } seconds...\x1b[0m`
      );

      await new Promise((resolve) =>
        setTimeout(resolve, waitTime)
      );
    }
  }
}

// Chat loop
while (true) {
  const userInput = await rl.question(
    "\x1b[32mYou:\x1b[0m "
  );

  // Exit
  if (
    userInput.toLowerCase() === "exit" ||
    userInput.toLowerCase() === "quit"
  ) {
    console.log("\x1b[33mGoodbye!\x1b[0m");
    break;
  }

  // Add user message
  messages.push(new HumanMessage(userInput));

  try {
    const response = await invokeWithRetry({
      messages,
    });

    // Get last AI message
    const lastMessage =
      response.messages[response.messages.length - 1];

    // Save AI response
    messages.push(lastMessage);

    console.log(
      `\x1b[34m[AI]:\x1b[0m ${lastMessage.content}`
    );

  } catch (error) {
    console.log(
      "\x1b[31m[ERROR]:\x1b[0m",
      error.message
    );

    // Remove failed user message
    messages.pop();

    if (
      error.statusCode === 429 ||
      error.status === 429
    ) {
      console.log(
        "\x1b[33mMistral rate limit/capacity reached. Thodi der baad try karo.\x1b[0m"
      );
    }
  }
}

rl.close();