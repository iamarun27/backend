// server create krna

const express = require("express");
const noteModel = require("./models/notes.model");

const app = express();

app.use(express.json());

// post
// req.body = title,description

app.post("/notes", async (req, res) => {
  const { title, description, age } = req.body;
  const note = await noteModel.create({
    title,
    description,
    age,
  });

  res.status(201).json({
    message: "note created successfully",
    note,
  });
});

// get
// fetch all the data

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();

  res.status(200).json({
    message: "Notes fetched successfully",
    notes,
  });
});



module.exports = app;
