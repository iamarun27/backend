// server create krna

const express = require("express");
const noteModel = require("./models/note.model");
const cors = require("cors");

const app = express();

app.use(express.json()); //middleware
app.use(cors()); // cross origin request bypass

// post

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;

  const note = await noteModel.create({
    title,
    description,
  });

  res.status(201).json({
    message: "Note created successfully",
    note,
  });
});

// get

app.get("/api/notes", async (req, res) => {
  const notes = await noteModel.find(); // find method return data in array of objects
  res.status(200).json({
    message: "notes fetched successfullt",
    notes,
  });
});

// delete

app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;

  await noteModel.findByIdAndDelete(id);

  console.log(id);

  res.status(200).json({
    message: "Note deleted successfully",
  });
});

// updates the notes

app.patch("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  const { description } = req.body;

  await noteModel.findByIdAndUpdate(id, { description });

  res.status(200).json({
    message: "Note updated successfully",
  });
});

module.exports = app;
