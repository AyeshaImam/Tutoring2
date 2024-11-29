import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/StudentDashboard.css';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [view, setView] = useState('');
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const fetchAvailableCourses = async () => {
    try {
      const response = await axios.get('http://localhost:5000/courses/available');
      setCourses(response.data);
    } catch (err) {
      setError('Failed to fetch available courses. Please try again later.');
    }
  };

  const fetchRegisteredCourses = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`http://localhost:5000/student/${userId}/courses`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setRegisteredCourses(response.data);
    } catch (err) {
      setError('Failed to fetch registered courses. Please try again later.');
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:5000/student/${courseId}/lessons`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setLessons(response.data);
    } catch (err) {
      setError('Failed to fetch lessons. Please try again later.');
    }
  };

  const fetchQuizzes = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:5000/student/${courseId}/quizzes`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setQuizzes(response.data);
    } catch (err) {
      setError('Failed to fetch quizzes. Please try again later.');
    }
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setView('lessons');
    fetchLessons(course._id);
    fetchQuizzes(course._id);
  };

  const handleSubmitQuiz = async (quizId) => {
    try {
      const courseId = selectedCourse._id;
      const response = await axios.post(
        `http://localhost:5000/student/${courseId}/quiz/${quizId}/attempt`,
        { answers },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      setResult(response.data);
      alert(`Quiz submitted! Your score is ${response.data.score}.`);
    } catch (err) {
      setError('Failed to submit quiz. Please try again later.');
    }
  };

  const handleAnswerChange = (questionIndex, selectedAnswer) => {
    setAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedAnswer,
    }));
  };

  useEffect(() => {
    fetchAvailableCourses();
    fetchRegisteredCourses();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Student Dashboard</h2>
        {!selectedCourse && (
          <>
            <h3>Registered Courses</h3>
            <ul>
              {registeredCourses.map((course) => (
                <li key={course._id} onClick={() => handleCourseClick(course)}>
                  {course.title}
                </li>
              ))}
            </ul>
          </>
        )}
        {selectedCourse && (
          <button className="back-button" onClick={() => setSelectedCourse(null)}>
            Back to Courses
          </button>
        )}
      </div>
      <div className="main-content">
        {selectedCourse ? (
          <>
            <h1>{selectedCourse.title}</h1>
            <p>{selectedCourse.description}</p>
            <div className="tabs">
              <button onClick={() => setView('lessons')}>Lessons</button>
              <button onClick={() => setView('quizzes')}>Quizzes</button>
            </div>
            {view === 'lessons' && (
              <div className="lessons">
                <h2>Lessons</h2>
                {lessons.length === 0 ? (
                  <p>No lessons available.</p>
                ) : (
                  <ul>
                    {lessons.map((lesson) => (
                      <li key={lesson._id}>{lesson.title}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {view === 'quizzes' && (
              <div className="quizzes">
                <h2>Quizzes</h2>
                {quizzes.length === 0 ? (
                  <p>No quizzes available.</p>
                ) : (
                  quizzes.map((quiz) => (
                    <div key={quiz._id} className="quiz-card">
                      <h3>{quiz.title}</h3>
                      {quiz.questions.map((q, index) => (
                        <div key={index}>
                          <p>
                            {index + 1}. {q.questionText}
                          </p>
                          {q.options.map((opt, i) => (
                            <div key={i}>
                              <input
                                type="radio"
                                name={`question-${index}`}
                                value={opt.text}
                                onChange={() => handleAnswerChange(index, opt.text)}
                              />
                              <label>{opt.text}</label>
                            </div>
                          ))}
                        </div>
                      ))}
                      <button onClick={() => handleSubmitQuiz(quiz._id)}>Submit Quiz</button>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        ) : (
          <div>
            <h2>Available Courses</h2>
            <div className="course-grid">
              {courses.map((course) => (
                <div key={course._id} className="course-card">
                  <h3>{course.title}</h3>
                  <p>{course.description}</p>
                  <button>Register</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
