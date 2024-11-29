import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/TeacherDashboard.css'; // Ensure this CSS file exists

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [view, setView] = useState(null); // 'lesson' or 'quiz'
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonFile, setLessonFile] = useState(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState(
    Array(1).fill({ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 })
  );

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/teacher/courses', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Failed to fetch courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleFileChange = (e) => {
    setLessonFile(e.target.files[0]);
  };

  const addLesson = async () => {
    if (!lessonTitle || !lessonFile || !selectedCourseId) {
      alert('Please provide a lesson title, file, and select a course.');
      return;
    }

    const formData = new FormData();
    formData.append('title', lessonTitle);
    formData.append('file', lessonFile);

    try {
      await axios.post(
        `http://localhost:5000/teacher/${selectedCourseId}/lessons/add`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert('Lesson added successfully!');
      setLessonTitle('');
      setLessonFile(null);
    } catch (error) {
      console.error('Failed to add lesson:', error);
      alert('Failed to add lesson. Please try again.');
    }
  };

  const addQuiz = async () => {
    if (!quizTitle || questions.some((q) => !q.questionText || q.options.some((opt) => !opt))) {
      alert('Please provide a quiz title and ensure all questions and options are filled.');
      return;
    }
  
    try {
      const formattedQuestions = questions.map((q) => ({
        questionText: q.questionText,
        options: q.options.map((option, index) => ({
          text: option,
          isCorrect: index === q.correctAnswerIndex, // Ensure the correct answer is marked properly
        })),
      }));
  
      await axios.post(
        `http://localhost:5000/teacher/${selectedCourseId}/quizzes/add`,
        {
          title: quizTitle,
          questions: formattedQuestions,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      alert('Quiz added successfully!');
      setQuizTitle('');
      setQuestions(
        Array(1).fill({ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 })
      );
    } catch (error) {
      console.error('Failed to add quiz:', error.response?.data || error.message);
      alert('Failed to add quiz. Please try again.');
    }
  };
  

  return (
    <div className="teacher-dashboard">
      <div className="sidebar">
        <h2>Your Courses</h2>
        <ul>
          {courses.map((course) => (
            <li key={course._id}>
              <span onClick={() => setSelectedCourseId(course._id)}>{course.title}</span>
              {selectedCourseId === course._id && (
                <div className="dropdown">
                  <button onClick={() => setView('lesson')}>Lesson</button>
                  <button onClick={() => setView('quiz')}>Quiz</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="content">
        {view === 'lesson' && (
          <div className="lesson-section">
            <h2>Add Lesson to {courses.find((c) => c._id === selectedCourseId)?.title}</h2>
            <input
              type="text"
              placeholder="Lesson Title"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
            />
            <input type="file" onChange={handleFileChange} />
            <button onClick={addLesson}>Add Lesson</button>
          </div>
        )}

        {view === 'quiz' && (
          <div className="quiz-section">
            <h2>Add Quiz to {courses.find((c) => c._id === selectedCourseId)?.title}</h2>
            <input
              type="text"
              placeholder="Quiz Title"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
            />
            <div>
              <h3>Questions</h3>
              {questions.map((q, index) => (
                <div className="question-block" key={index}>
                  <label>Question {index + 1}:</label>
                  <input
                    type="text"
                    placeholder="Question Text"
                    value={q.questionText}
                    onChange={(e) =>
                      setQuestions((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, questionText: e.target.value } : item
                        )
                      )
                    }
                  />
                  {q.options.map((option, i) => (
                    <div key={i}>
                      <label>Option {i + 1}:</label>
                      <input
                        type="text"
                        value={option}
                        onChange={(e) =>
                          setQuestions((prev) =>
                            prev.map((item, questionIndex) =>
                              questionIndex === index
                                ? {
                                    ...item,
                                    options: item.options.map((opt, optIndex) =>
                                      optIndex === i ? e.target.value : opt
                                    ),
                                  }
                                : item
                            )
                          )
                        }
                      />
                    </div>
                  ))}
                  <label>Correct Answer:</label>
                  <select
                    value={q.correctAnswerIndex}
                    onChange={(e) =>
                      setQuestions((prev) =>
                        prev.map((item, i) =>
                          i === index ? { ...item, correctAnswerIndex: parseInt(e.target.value) } : item
                        )
                      )
                    }
                  >
                    {q.options.map((_, i) => (
                      <option key={i} value={i}>
                        Option {i + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <button onClick={addQuiz}>Add Quiz</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherDashboard;
