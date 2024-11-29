// src/components/CoursesOffered.js
import React from 'react';
import { Link } from 'react-router-dom';
import './CoursesOffered.css';

const CoursesOffered = () => {
  const courses = [
    {
      title: 'Computer Science',
      description: 'From programming basics to advanced algorithms, our computer science curriculum is designed to meet your needs.',
      icon: '💻'
    },
    {
      title: 'Biology',
      description: 'Explore the wonders of biology through interactive lessons and real-time assessments that adapt to your learning style.',
      icon: '🧬'
    },
    {
      title: 'Chemistry',
      description: 'Master the fundamentals of chemistry with personalized course materials that evolve as you progress.',
      icon: '⚗️'
    },
    {
      title: 'Physics',
      description: 'Understand the laws of nature and the behavior of the physical universe.',
      icon: '⚛️'
    },
    {
      title: 'Math',
      description: 'Explore the world of numbers, equations, and mathematical theories.',
      icon: '📐'
    },
    {
      title: 'Psychology',
      description: 'Study the mind and behavior of individuals and groups.',
      icon: '🧠'
    },
    {
      title: 'Geography',
      description: "Understand the Earth's landscapes, environments, and the relationships between people and their environments.",
      icon: '🌍'
    },
    {
      title: 'Art',
      description: 'Explore creativity through various forms of artistic expression.',
      icon: '🎨'
    },
    {
      title: 'Business',
      description: "Learn the fundamentals of running a business in today's economy.",
      icon: '💼'
    },
    {
      title: 'History',
      description: 'Delve into past events and their impact on the present world.',
      icon: '📚'
    },
    {
      title: 'Environmental Science',
      description: 'Study the relationship between humans and the environment.',
      icon: '🌱'
    },
    {
      title: 'Statistics',
      description: 'Learn data analysis techniques and statistical reasoning.',
      icon: '📊'
    }
  ];

  return (
    <section className="courses-offered">
      <div className="courses-header">
        <h2>Explore Our Courses</h2>
        <p className="courses-subtitle">Discover a wide range of subjects taught by expert instructors</p>
      </div>
      
      <div className="courses-list">
        {courses.map((course, index) => (
          <Link to={`/courses/${encodeURIComponent(course.title)}`} key={index} className="course-card">
            <div className="course-icon">{course.icon}</div>
            <div className="course-content">
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </div>
            <div className="course-arrow">→</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CoursesOffered;
