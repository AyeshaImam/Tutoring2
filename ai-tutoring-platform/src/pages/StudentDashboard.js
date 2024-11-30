import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StudentDashboard.css";
import { useContext } from "react";
import { UserContext } from "../components/UserContext"; // Import UserContext

const StudentDashboard = () => {
  const { user, isAuthenticated, loading } = useContext(UserContext); // Access user data and authentication state from context
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [view, setView] = useState(""); // 'lessons' or 'quizzes'
  const [quizToTake, setQuizToTake] = useState(null); // Quiz object to take
  const [answers, setAnswers] = useState([]); // Student's answers
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && isAuthenticated) {
      fetchAvailableCourses();
      fetchRegisteredCourses();
    }
  }, [user, isAuthenticated]);

  const fetchAvailableCourses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/student/${user._id}/courses/notRegistered`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setCourses(response.data);
    } catch (err) {
      setError("Failed to fetch available courses. Please try again later.");
    }
  };

  const fetchRegisteredCourses = async () => {
    if (!user) return;
    try {
      const response = await axios.get(
        `http://localhost:5000/student/${user._id}/courses`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRegisteredCourses(response.data);
    } catch (err) {
      setError("Failed to fetch registered courses. Please try again later.");
    }
  };

  const fetchLessons = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/student/${courseId}/lessons`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setLessons(response.data);
    } catch (err) {
      setError("Failed to fetch lessons. Please try again later.");
    }
  };

  const fetchQuizzes = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/student/${courseId}/quizzes`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setQuizzes(response.data);
    } catch (err) {
      setError("Failed to fetch quizzes. Please try again later.");
    }
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setView("lessons"); // Default to lessons view
    fetchLessons(course._id);
    fetchQuizzes(course._id);
  };

  const handleQuizTake = (quiz) => {
    setQuizToTake(quiz);
    setAnswers(Array(quiz.questions.length).fill("")); // Initialize empty answers
  };

  const handleAnswerChange = (index, value) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[index] = value;
      return updatedAnswers;
    });
  };

  const submitQuiz = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/student/${selectedCourse._id}/quiz/${quizToTake._id}/attempt`,
        { answers },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert(`Quiz submitted successfully! Your score: ${response.data.score}`);
      setQuizToTake(null); // Reset quiz view
    } catch (err) {
      alert("Failed to submit quiz. Please try again.");
    }
  };

  const handleRegister = async (courseId) => {
    try {
      await axios.post(
        `http://localhost:5000/student/${user._id}/courses/register`,
        { courseId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("Successfully registered for the course!");
      fetchRegisteredCourses();
      fetchAvailableCourses();
    } catch (err) {
      alert("Error registering for the course. Please try again.");
    }
  };

  // If loading or user is not authenticated, show loading message or redirect
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <div>You are not authenticated. Please log in.</div>;
  }

  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Student Dashboard</h1>
      {error && <p className="error-message">{error}</p>}

      {!selectedCourse ? (
        <>
          <section>
            <h2>Your Registered Courses</h2>
            {registeredCourses.length === 0 ? (
              <p>You have not registered for any courses yet.</p>
            ) : (
              <div className="course-grid">
                {registeredCourses.map((course) => (
                  <div
                    key={course._id}
                    className="course-card"
                    onClick={() => handleCourseClick(course)}
                  >
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <h2>Available Courses to Register</h2>
            {courses.length === 0 ? (
              <p>No courses available at the moment.</p>
            ) : (
              <div className="course-grid">
                {courses.map((course) => (
                  <div key={course._id} className="course-card">
                    <h3>{course.title}</h3>
                    <p>{course.description}</p>
                    <button onClick={() => handleRegister(course._id)}>
                      Register
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </>
      ) : (
        <div className="course-details">
          <button
            className="back-button"
            onClick={() => setSelectedCourse(null)}
          >
            Back to Courses
          </button>
          <h2 className="course-title">{selectedCourse.title}</h2>
          <p className="course-description">{selectedCourse.description}</p>

          <div className="course-options">
            <button
              className={`course-option ${view === "lessons" ? "active" : ""}`}
              onClick={() => setView("lessons")}
            >
              Lessons
            </button>
            <button
              className={`course-option ${view === "quizzes" ? "active" : ""}`}
              onClick={() => setView("quizzes")}
            >
              Quizzes
            </button>
          </div>

          {view === "lessons" && (
            <div className="lesson-section">
              <h3>Lessons</h3>
              {lessons.length === 0 ? (
                <p>No lessons available for this course.</p>
              ) : (
                <ul className="lesson-list">
                  {lessons.map((lesson) => (
                    <li key={lesson._id}>
                      <a
                        href={`http://localhost:5000/${lesson.filePath}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {lesson.title}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {view === "quizzes" && quizToTake === null && (
            <div className="quiz-section">
              <h3>Quizzes</h3>
              {quizzes.length === 0 ? (
                <p>No quizzes available for this course.</p>
              ) : (
                <ul className="quiz-list">
                  {quizzes.map((quiz) => (
                    <li key={quiz._id} className="quiz-card">
                      <h4>{quiz.title}</h4>
                      <button onClick={() => handleQuizTake(quiz)}>
                        Take Quiz
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {quizToTake && (
            <div className="take-quiz-section">
              <h3>Take Quiz: {quizToTake.title}</h3>
              <form onSubmit={(e) => e.preventDefault()} className="quiz-form">
                {quizToTake.questions.map((question, index) => (
                  <div key={index} className="question-block">
                    <p>{question.questionText}</p>
                    {question.options.map((option, i) => (
                      <label key={i} className="quiz-option">
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option.text}
                          onChange={() =>
                            handleAnswerChange(index, option.text)
                          }
                        />
                        {option.text}
                      </label>
                    ))}
                  </div>
                ))}
                <button className="submit-quiz-button" onClick={submitQuiz}>
                  Submit Quiz
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
