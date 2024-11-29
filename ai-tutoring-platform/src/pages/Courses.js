// src/pages/Courses.js
import React from 'react';
import CoursesOffered from '../components/CoursesOffered'; // Import CoursesOffered component

const Courses = () => {
  return (
    <div>
      <h1>Courses Page</h1>
      <CoursesOffered /> {/* Render the CoursesOffered component */}
    </div>
  );
};

export default Courses;
