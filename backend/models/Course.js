const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creditHours: { type: Number, required: true },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }], // Array of lesson references
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }], // Array of quiz references
});

module.exports = mongoose.model("Course", courseSchema);
