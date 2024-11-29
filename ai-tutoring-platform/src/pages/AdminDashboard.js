import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [creditHours, setCreditHours] = useState('');
  const [selectedTeacherId, setSelectedTeacherId] = useState('');
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [selectedTeacherForAssign, setSelectedTeacherForAssign] = useState('');

  // Fetch teachers and courses
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/teachers', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/admin/courses', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchTeachers();
    fetchCourses();
  }, []);

  // Add new course
  const handleAddCourse = async () => {
    console.log('Submitting course:', { courseTitle, courseDescription, creditHours, selectedTeacherId });
    try {
      const response = await axios.post(
        'http://localhost:5000/admin/courses/add',
        {
          title: courseTitle,
          description: courseDescription,
          creditHours,
          teacherId: selectedTeacherId || null,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      console.log('Response from API:', response.data);
      alert('Course added successfully!');
      setCourseTitle('');
      setCourseDescription('');
      setCreditHours('');
      setSelectedTeacherId('');
    } catch (error) {
      console.error('Error adding course:', error.response?.data || error.message);
      alert('Failed to add course. Please try again.');
    }
  };

  // Assign course to teacher
  const handleAssignCourse = async () => {
    console.log('Assigning course:', { courseId: selectedCourseId, teacherId: selectedTeacherForAssign });

    try {
      const response = await axios.post(
        'http://localhost:5000/admin/courses/assign',
        { courseId: selectedCourseId, teacherId: selectedTeacherForAssign },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      alert('Course assigned successfully!');
    } catch (error) {
      console.error('Error assigning course:', error.response?.data || error.message);
      alert('Failed to assign course. Please try again.');
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      <div className="add-course">
        <h2>Add New Course</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddCourse();
          }}
        >
          <div className="form-group">
            <label>Course Title:</label>
            <input
              type="text"
              value={courseTitle}
              onChange={(e) => setCourseTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Course Description:</label>
            <textarea
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Credit Hours:</label>
            <input
              type="number"
              value={creditHours}
              onChange={(e) => setCreditHours(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Assign Teacher (Optional):</label>
            <select
              value={selectedTeacherId}
              onChange={(e) => setSelectedTeacherId(e.target.value)}
            >
              <option value="">No teacher assigned</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.fullName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn">
            Add Course
          </button>
        </form>
      </div>

      <div className="assign-course">
        <h2>Assign Course to Teacher</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAssignCourse();
          }}
        >
          <div className="form-group">
            <label>Select Course:</label>
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              required
            >
              <option value="">Select a course</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select Teacher:</label>
            <select
              value={selectedTeacherForAssign}
              onChange={(e) => setSelectedTeacherForAssign(e.target.value)}
              required
            >
              <option value="">Select a teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.fullName}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn">
            Assign Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
