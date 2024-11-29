// D:\Ai_Project\backend\models\Quiz.js
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [
    { text: String, isCorrect: Boolean }  // Array of option objects
  ]
});

const quizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
  questions: { type: [questionSchema], required: true, validate: [arrayLimit, '{PATH} must contain at least 1 question'] }
});

// Validator to ensure the questions array has exactly 10 questions
function arrayLimit(val) {
  return val.length > 0;
}

module.exports = mongoose.model('Quiz', quizSchema);
