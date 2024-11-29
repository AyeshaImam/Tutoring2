const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Lesson = require('../models/Lesson'); // Assuming a Lesson model exists
const Quiz = require('../models/Quiz');     // Assuming a Quiz model exists
const authenticateToken = require('../middleware/authenticateToken'); // Ensure middleware is correctly implemented
const multer = require('multer');

const verifyTeacher = (req, res, next) => {
  if (req.user.role !== 'teacher') {
    return res.status(403).json({ error: 'Only teachers are allowed to access this resource.' });
  }
  next();
};

// Middleware: Authenticate and Verify Teacher
router.use(authenticateToken);
router.use(verifyTeacher);

// Fetch courses assigned to a teacher
router.get('/courses', verifyTeacher, async (req, res) => {
  try {
    console.log('Fetching courses for teacher:', req.user.id); // Debug log
    const courses = await Course.find({ teacher: req.user.id }).populate('teacher', 'fullName email');
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err.message);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});


// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Directory for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Unique file names
  },
});

const upload = multer({ storage });



// Add a lesson to a course
router.post('/:courseId/lessons/add', authenticateToken, verifyTeacher, upload.single('file'), async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'File is required' });
    }

    // Ensure the course exists and is assigned to the current teacher
    const course = await Course.findById(courseId);
    if (!course || course.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to modify this course.' });
    }

    // Create a new lesson
    const newLesson = new Lesson({
      title,
      filePath: file.path,
      course: courseId,
    });
    await newLesson.save();

    // Link the lesson to the course
    course.lessons.push(newLesson._id);
    await course.save();

    res.status(201).json({ message: 'Lesson added successfully', lesson: newLesson });
  } catch (err) {
    console.error('Error adding lesson:', err);
    res.status(500).json({ error: 'Failed to add lesson' });
  }
});


// Add a quiz to a course

router.post('/:courseId/quizzes/add', authenticateToken, verifyTeacher, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { title, questions } = req.body;

    // Find the course and ensure it exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Ensure the course is assigned to the current teacher
    if (!course.teacher || course.teacher.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Unauthorized to modify this course.' });
    }

    // Validate that the quiz contains 1 or more questions
    if (questions.length === 0) {
      return res.status(400).json({ error: 'A quiz must contain at least 1 question.' });
    }

    // Validate each question format
    for (const question of questions) {
      if (!question.questionText || question.options.length < 2) {
        return res.status(400).json({ error: 'Each question must have text and at least two options.' });
      }
      const correctOptions = question.options.filter(option => option.isCorrect);
      if (correctOptions.length !== 1) {
        return res.status(400).json({ error: 'Each question must have exactly one correct option.' });
      }
    }

    // Create the new quiz
    const newQuiz = new Quiz({
      title,
      course: courseId,
      questions,
    });
    await newQuiz.save();

    // Link the quiz to the course
    course.quizzes.push(newQuiz._id);
    await course.save();

    res.status(201).json({ message: 'Quiz added successfully', quiz: newQuiz });
  } catch (err) {
    console.error('Error adding quiz:', err.message);
    res.status(500).json({ error: 'Failed to add quiz' });
  }
});


module.exports = router;
