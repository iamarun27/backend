import "dotenv/config";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import { HumanMessage, createAgent, tool } from "langchain";
import { sendEmail } from "./mail.service.js";
import * as z from "zod";

const emailTool = tool(
  sendEmail,

  {
    name: "emailTool",
    description: "use this tool to send an emil",
    schema: {
      to: z.string().describe("The recipient's email address"),
      html: z.string().describe("The HTML content of the email"),
      subject: z.string().describe("The subject of the email"),
    },
  },
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small-latest",
});

const agent = createAgent({
  model,
  tools: [emailTool],
});

const messages = [];

const getTimestamp = () => new Date().toLocaleTimeString();

while (true) {
  const userInput = await rl.question("\n👤 You: ");

  messages.push(new HumanMessage(userInput));

  // if (!userInput.trim()) continue;

  const response = await agent.invoke({ messages });

  messages.push(response.messages[response.messages.length - 1]);
  console.log(`\n🤖 AI [${getTimestamp()}]:\n${response.content}\n`);
}

rl.close();
