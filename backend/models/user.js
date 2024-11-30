const mongoose = require("mongoose");

// Define user schema
const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    default: "student",
    enum: ["student", "teacher", "admin"],
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
});

// Check if the model already exists in mongoose.models
const User = mongoose.models.User || mongoose.model("User", userSchema);
console.log(User);
module.exports = User;
