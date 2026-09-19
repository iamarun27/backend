import { PDFParse } from "pdf-parse";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs";
import { MistralAIEmbeddings } from "@langchain/mistralai";
import dotenv from "dotenv";
import { Pinecone } from "@pinecone-database/pinecone";
dotenv.config();

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const index = pc.index("cohort-2-rag");

// let dataBuffer = fs.readFileSync("./story.pdf");

// const parser = new PDFParse({ data: dataBuffer });

// const data = await parser.getText();

const embeddings = new MistralAIEmbeddings({
  apiKey: process.env.MISTRAL_API_KEY,
  model: "mistral-embed",
});

//console.log(data);

// const splitter = new RecursiveCharacterTextSplitter({
//   chunkSize: 500,
//   chunkOverlap: 0,
// });

// const chunks = await splitter.splitText(data.text);

// // console.log(chunks,chunks.length)

// // const docs = await embeddings.embedDocuments(chunks);

// const docs = await Promise.all(
//   chunks.map(async (chunk) => {
//     const embedding = await embeddings.embedQuery(chunk);
//     return {
//       text: chunk,
//       embedding,
//     };
//   }),
// );



// const results = await index.upsert({
//   records: docs.map((doc, i) => ({
//     id: `doc-${i}`,
//     values: doc.embedding,
//     metadata: {
//       text: doc.text,
//     },
//   })),
// });

// console.log(results)
//console.log(docs); //1024


const queryEmbedding = await embeddings.embedQuery("who is arav?")
console.log(queryEmbedding)
const result = await index.query({
  vector:queryEmbedding,
  topK:2,
  includeMetadata:true
})

console.log(JSON.stringify(result))

