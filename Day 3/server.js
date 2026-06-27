const express = require("express");

const app = express();

app.use(express.json()); // data pdne k liye middleware data read krne k liye

const notes = [];

app.post("/notes", (req, res) => {
  console.log(req.body); // frontend se data jo nhi aa rha h use req se access krte h
  notes.push(req.body);
  res.send("Note created");
});

app.get("/notes", (req, res) => {
  res.send(notes);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
