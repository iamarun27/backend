const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const app = express();
app.use(express.json());  // only for raw data
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/auth", postRouter);

module.exports = app;
