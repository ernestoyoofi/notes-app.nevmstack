const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  picture: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  register_at: { type: Date, default: Date.now },
  auth: { type: String, required: true },
})
const userModel = mongoose.model("users", userSchema)

module.exports = userModel