const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: "24h",
  });
};

const signUp = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new Error("Please provide username and password");
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username,
    password: hashedPassword,
  });
  if (user) {
    res.json({
      _id: user.id,
      username: user.username,
      token: createToken(user._id),
    });
  } else {
    throw new Error("Invalid user data");
  }
});

const signIn = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      username: user.username,
      token: createToken(user._id),
    });
  } else {
    throw new Error("Invalid username or password");
  }
});

const profile = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = {
  signUp,
  signIn,
  profile,
};
