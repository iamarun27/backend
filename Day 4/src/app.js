//- app.js // server create krna logic
// server ko config krna

const express = require("express");

const notes = [
  // {
  //   title: "test title 1",
  //   description: "test description 1",
  // },
];

const app = express(); //server create

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

// post

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body);
  console.log(notes);

  res.send("Note created");
});

// get

app.get("/notes", (req, res) => {
  res.send(notes);
});

// delete
// params

app.delete("/notes/:index", (req, res) => {
  // console.log(req.params.index);
  delete notes[req.params.index];

  res.send("note deleted successfully...");
});

app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  notes[req.params.index].title = req.body.title;
  res.send("notes updated successfully");
});

module.exports = app;
