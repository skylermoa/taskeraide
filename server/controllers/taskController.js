const Task = require("../models/taskModel");
const asyncHandler = require("express-async-handler");

// Create a task
const createTask = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    // empty body
    throw new Error("Please provide text");
  }
  const task = await Task.create({
    user: req.user.id,
    text: req.body.text,
  });
  res.json(task);
});

// Get all tasks
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user.id }); // Find all tasks that belong to the user
  res.json(tasks);
});

// Delete a task
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) throw new Error("Task not found");
  if (!req.user) throw new Error("User not found");
  if (task.user.toString() !== req.user.id)
    throw new Error("User not authorized");
  await task.remove();
  res.json({ id: req.params.id });
});

module.exports = {
  createTask,
  getTasks,
  deleteTask,
};
