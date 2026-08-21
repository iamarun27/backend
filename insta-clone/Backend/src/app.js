const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require('morgan')

const app = express();
app.use(express.json()); // only for raw data
app.use(cookieParser());
app.use(morgan('dev'))
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  }),
);

// required routes

const authRouter = require("./routes/auth.routes");
const postRouter = require("./routes/post.routes");
const userRouter = require("./routes/user.router");

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

module.exports = app;
