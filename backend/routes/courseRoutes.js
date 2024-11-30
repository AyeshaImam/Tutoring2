// routes/courseRoutes.js
const express = require("express");
const Course = require("../models/Course"); // Assuming you have a Course model
const router = express.Router();

router.get("/available", async (req, res) => {
  try {
    const courses = await Course.find({}); // Adjust this query as needed to filter courses
    res.json(courses);
  } catch (error) {
    console.error("Error fetching available courses:", error);
    res.status(500).json({ message: "Error fetching available courses" });
  }
});

module.exports = router;
