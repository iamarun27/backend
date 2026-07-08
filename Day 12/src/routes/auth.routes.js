const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const crypto = require("crypto");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({ email });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message: "User already exist with this email ...",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex");

  const user = await userModel.create({
    email,
    password: hash,
    name,
  });

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(201).json({
    message: "User registred successfully...",
    user,
    token,
  });
});

authRouter.post("/protected", (req, res) => {
  console.log(req.cookies);
  res.status(200).json({
    message: "This is protected route...",
  });
});
// controller - jb request ati h tabhi execute ho
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });
  if (!user) {
    res.status(404).json({
      message: "User not found with this email...",
    });
  }

  const isPasswordMatched =
    user.password === crypto.createHash("md5").update(password).digest("hex");

  if (!isPasswordMatched) {
    return res.status(404).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
  );

  res.cookie("jwt_token", token);

  res.status(200).json({
    message: "User logged in successfully...",
    user,
  });
});

module.exports = authRouter;
