const verifyTeacher = async (req, res, next) => {
    try {
      if (req.user.role !== 'teacher') {
        return res.status(403).json({ error: 'Access denied. Only teachers can perform this action.' });
      }
  
      const { courseId } = req.params;
      const course = await Course.findById(courseId);
  
      if (!course || course.teacher.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Unauthorized to access this course.' });
      }
  
      next();
    } catch (err) {
      console.error('Error verifying teacher:', err);
      res.status(500).json({ error: 'Failed to verify teacher access.' });
    }
  };
  
  module.exports = verifyTeacher;
  