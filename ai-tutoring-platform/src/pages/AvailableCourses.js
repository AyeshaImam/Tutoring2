import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch available courses from the backend
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/courses/available', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching available courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const registerCourse = async (courseId) => {
    try {
      const response = await axios.post(`/student/courses/register`, { courseId }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error registering for course');
      console.error('Error registering for course:', error);
    }
  };

  return (
    <div className="available-courses">
      <h1>Available Courses</h1>
      {message && <p className="message">{message}</p>}
      <ul>
        {courses.length > 0 ? (
          courses.map(course => (
            <li key={course._id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <button onClick={() => registerCourse(course._id)}>Register</button>
            </li>
          ))
        ) : (
          <p>No courses available for registration.</p>
        )}
      </ul>
    </div>
  );
};

export default AvailableCourses;
