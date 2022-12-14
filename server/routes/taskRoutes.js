const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController");

// Uses the auth middleware for all routes
router.use(auth);

router.post("/", createTask);
router.get("/", getTasks);
router.delete("/:id", deleteTask);

module.exports = router;
