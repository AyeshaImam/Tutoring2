const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Course = require('../models/Course');
const authenticateToken = require('../middleware/authenticateToken');

// Helper function to validate MongoDB ObjectIDs
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Middleware to verify the user is an admin
const verifyAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Only admins can perform this action.' });
  }
  next();
};

// Middleware to authenticate and verify admin
router.use(authenticateToken);
router.use(verifyAdmin);

// POST /admin/courses/add - Add a new course
router.post('/courses/add', async (req, res) => {
  try {
    const { title, description, creditHours, teacherId } = req.body;

    // Validate required fields
    if (!title || !description || !creditHours) {
      return res.status(400).json({ error: 'Title, description, and credit hours are required.' });
    }

    // Validate teacherId if provided
    if (teacherId && !isValidObjectId(teacherId)) {
      return res.status(400).json({ error: 'Invalid teacher ID.' });
    }

    // Check if the teacher exists
    if (teacherId) {
      const teacher = await User.findById(teacherId);
      if (!teacher || teacher.role !== 'teacher') {
        return res.status(404).json({ error: 'Invalid teacher ID or the user is not a teacher.' });
      }
    }

    // Create a new course
    const newCourse = new Course({
      title,
      description,
      creditHours,
      teacher: teacherId || null, // Optional teacher assignment
    });

    await newCourse.save();
    res.status(201).json({ message: 'Course added successfully', course: newCourse });
  } catch (err) {
    console.error('Error adding course:', err);
    res.status(500).json({ error: 'Failed to add course.' });
  }
});

// POST /admin/courses/assign - Assign a course to a teacher
router.post('/courses/assign', async (req, res) => {
  try {
    const { courseId, teacherId } = req.body;

    // Validate courseId and teacherId
    if (!isValidObjectId(courseId) || !isValidObjectId(teacherId)) {
      return res.status(400).json({ error: 'Invalid course ID or teacher ID.' });
    }

    // Check if teacher exists and is valid
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'teacher') {
      return res.status(404).json({ error: 'Invalid teacher ID or the user is not a teacher.' });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Check if the course is already assigned to the same teacher
    if (course.teacher && course.teacher.toString() === teacherId) {
      return res.status(400).json({ error: 'Course is already assigned to this teacher.' });
    }

    // Assign the teacher to the course
    course.teacher = teacherId;
    await course.save();

    res.status(200).json({ message: 'Course assigned to teacher successfully', course });
  } catch (err) {
    console.error('Error assigning course:', err);
    res.status(500).json({ error: 'Failed to assign course.' });
  }
});

// GET /admin/teachers - Fetch all teachers
router.get('/teachers', async (req, res) => {
  try {
    const teachers = await User.find({ role: 'teacher' }, 'fullName email');
    if (teachers.length === 0) {
      return res.status(404).json({ error: 'No teachers found.' });
    }
    res.status(200).json(teachers);
  } catch (err) {
    console.error('Error fetching teachers:', err);
    res.status(500).json({ error: 'Failed to fetch teachers.' });
  }
});

// GET /admin/courses - Fetch all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({})
      .populate('teacher', 'fullName email') // Populate teacher details
      .select('title description creditHours teacher'); // Return specific fields
    res.status(200).json(courses);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).json({ error: 'Failed to fetch courses.' });
  }
});

// PUT /admin/courses/:courseId/unassign - Unassign a course from a teacher
router.put('/courses/:courseId/unassign', async (req, res) => {
  try {
    const { courseId } = req.params;

    if (!isValidObjectId(courseId)) {
      return res.status(400).json({ error: 'Invalid course ID.' });
    }

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    if (!course.teacher) {
      return res.status(400).json({ error: 'Course is not assigned to any teacher.' });
    }

    // Unassign the teacher
    course.teacher = null;
    await course.save();

    res.status(200).json({ message: 'Course unassigned from teacher successfully', course });
  } catch (err) {
    console.error('Error unassigning course:', err);
    res.status(500).json({ error: 'Failed to unassign course.' });
  }
});

// PUT /admin/users/:userId/role - Update a user's role
router.put('/users/:userId/role', async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    // Validate role
    if (!['student', 'teacher', 'admin'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role specified.' });
    }

    // Validate userId
    if (!isValidObjectId(userId)) {
      return res.status(400).json({ error: 'Invalid user ID.' });
    }

    // Find and update the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (err) {
    console.error('Error updating user role:', err);
    res.status(500).json({ error: 'Failed to update user role.' });
  }
});

module.exports = router;
