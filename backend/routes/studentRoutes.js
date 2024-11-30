const express = require("express");
const User = require("../models/user");
const Course = require("../models/Course");
const Quiz = require("../models/Quiz");
const authenticateToken = require("../middleware/authenticateToken");

const router = express.Router();

// Middleware to verify if the user is logged in

// Route to fetch available courses (public)
router.get("/available", async (req, res) => {
  try {
    const courses = await Course.find({}); // Fetch all available courses
    res.json(courses);
  } catch (err) {
    console.error("Error fetching available courses:", err);
    res.status(500).json({ message: "Error fetching available courses" });
  }
});

// Route to fetch registered courses for a student
router.get("/:studentId/courses", authenticateToken, async (req, res) => {
  try {
    const studentId = req.params.studentId;
    console.log(req);
    if (studentId !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Find the student and populate the courses
    const student = await User.findById(studentId).populate("courses");
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.json(student.courses); // Return the list of courses the student is enrolled in
  } catch (err) {
    console.error("Error fetching registered courses:", err);
    res.status(500).json({ message: "Error fetching registered courses" });
  }
});
router.get(
  "/:studentId/courses/notRegistered",
  authenticateToken,
  async (req, res) => {
    try {
      const studentId = req.params.studentId;

      // Check if the studentId in the URL matches the authenticated user's ID
      if (studentId !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }

      // Find the student and populate their enrolled courses
      const student = await User.findById(studentId).populate("courses");
      if (!student)
        return res.status(404).json({ message: "Student not found" });

      // Get the IDs of the courses the student is already enrolled in
      const registeredCourseIds = student.courses.map((course) => course._id);

      // Fetch the courses that the student is not enrolled in
      const unregisteredCourses = await Course.find({
        _id: { $nin: registeredCourseIds }, // Exclude registered courses
      });

      // Return the list of unregistered courses
      res.json(unregisteredCourses);
    } catch (err) {
      console.error("Error fetching unregistered courses:", err);
      res.status(500).json({ message: "Error fetching unregistered courses" });
    }
  }
);

// Route to register a student for a course
router.post(
  "/:studentId/courses/register",
  authenticateToken,
  async (req, res) => {
    try {
      const studentId = req.params.studentId;
      const { courseId } = req.body;

      if (studentId !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }

      // Find the student and the course
      const student = await User.findById(studentId);
      const course = await Course.findById(courseId);

      if (!student || !course) {
        return res.status(404).json({ message: "Student or Course not found" });
      }

      // Check if the student is already enrolled in the course
      if (student.courses.includes(courseId)) {
        return res
          .status(400)
          .json({ message: "Already registered for this course" });
      }

      // Register the student in the course
      student.courses.push(courseId);
      await student.save();

      res
        .status(200)
        .json({ message: "Successfully registered for the course!" });
    } catch (err) {
      console.error("Error registering for course:", err);
      res.status(500).json({ message: "Error registering for course" });
    }
  }
);

// Route to fetch lessons for a specific course
router.get("/:courseId/lessons", authenticateToken, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate("lessons");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course.lessons);
  } catch (err) {
    console.error("Error fetching lessons:", err);
    res.status(500).json({ message: "Error fetching lessons" });
  }
});

// Route to fetch quizzes for a specific course
router.get("/:courseId/quizzes", authenticateToken, async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate("quizzes");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(course.quizzes);
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    res.status(500).json({ message: "Error fetching quizzes" });
  }
});

// Route to submit a quiz attempt
router.post(
  "/:courseId/quiz/:quizId/attempt",
  authenticateToken,
  async (req, res) => {
    try {
      const { answers } = req.body;
      const { quizId, courseId } = req.params;

      // Find the quiz and course
      const quiz = await Quiz.findById(quizId);
      const course = await Course.findById(courseId);

      if (!quiz || !course) {
        return res.status(404).json({ message: "Quiz or Course not found" });
      }

      // Validate answers with questions
      let score = 0;
      quiz.questions.forEach((question, index) => {
        if (
          question.options.some(
            (opt) => opt.text === answers[index] && opt.isCorrect
          )
        ) {
          score += 1; // Correct answer
        }
      });

      // Respond with score
      res.json({ score });
    } catch (err) {
      console.error("Error submitting quiz:", err);
      res.status(500).json({ message: "Error submitting quiz" });
    }
  }
);

module.exports = router;
