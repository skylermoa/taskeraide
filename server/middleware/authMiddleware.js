const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

// Middleware for user authentication
const auth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization; // Get the authorization header
  if (authHeader?.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1]; // Splits the header into an array and gets the second element
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET); // Decode the token
    req.user = await User.findById(decoded.id).select("-password"); // Check if the user exists, but exclude the password.
    next(); // Move to the next middleware
  } else {
    throw new Error("Not authorized");
  }
});

module.exports = { auth };
