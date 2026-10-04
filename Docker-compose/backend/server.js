import express from "express";

import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(morgan("dev"));

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.get("/api/hello", (req, res) => {
  res.status(200).json({ message: "Hello, world!!" });
});

app.get("/api/users", (req, res) => {
  const users = [
    { id: 1, name: "Arun" },
    { id: 2, name: "Aman" },
  ];

  res.status(200).json(users);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
