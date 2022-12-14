const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const taskSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // The id of the user that created the task
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
