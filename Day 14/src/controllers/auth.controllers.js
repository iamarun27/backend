const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
  const { email, username, password, bio, profileImage } = req.body;

  // const isUserExistByEmail = await userModel.findOne({ email });
  // if (isUserExistByEmail) {
  //   return res.status(409).json({
  //     message: "user already exists with same email...",
  //   });
  // }

  // const isUserExistByUsername = await userModel.findOne({ username });

  // if (isUserExistByUsername) {
  //   return res.status(409).json({
  //     message: "user already exists with same username...",
  //   });
  // }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "User already exists ..." +
        (isUserAlreadyExists.email == email
          ? "Email already exists"
          : "Username already exists"),
    });
  }

  // const hash = crypto.createHash("sha256").update(password).digest("hex");
  const hash = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
  });
  const token = jwt.sign(
    {
      // 1. user ka data hna chahiye 2. data unique hona chahiye
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);

  res.status(201).json({
    message: "User registered successfully...",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

async function loginController(req, res) {
  const { username, email, password } = req.body;

  // username password , email password
  const user = await userModel.findOne({
    $or: [
      // conditions
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });
  if (!user) {
    return res.status(404).json({
      message: "User not found...",
    });
  }
  //const hash = crypto.createHash("sha256").update(password).digest("hex");
  // console.log(`Error is: ${hash}`)
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "Password is invalid...",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "user logged in successfully...",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
    },
  });
}

module.exports = {
  registerController,
  loginController,
};
