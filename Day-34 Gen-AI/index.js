import "dotenv/config";
import readline from "readline/promises";
import { ChatMistralAI } from "@langchain/mistralai";
import {HumanMessage } from "langchain";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const model = new ChatMistralAI({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-small-latest",
});

const messages  = []

const getTimestamp = () => new Date().toLocaleTimeString();

while (true) {
  const userInput = await rl.question("\n👤 You: ");

  messages.push(new HumanMessage(userInput)); 

  if (!userInput.trim()) continue;

  const response = await model.invoke(messages);

  messages.push(response);
  console.log(`\n🤖 AI [${getTimestamp()}]:\n${response.content}\n`);
}

rl.close();
