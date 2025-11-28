const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  uid: { type: String, required: true },
  user_id: { type: String, required: true },
  task: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
})
const taskModel = mongoose.model("tasks", taskSchema)

module.exports = taskModel