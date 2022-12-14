const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const { signUp, signIn, profile } = require("../controllers/userController");

// Routes for user authentication
router.post("/signup", signUp);
router.post("/signin", signIn);

// Route that uses the auth middleware
router.get("/profile", auth, profile);

module.exports = router;
