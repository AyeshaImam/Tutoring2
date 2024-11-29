// src/pages/AddQuiz.js
import React, { useState } from 'react';
import axios from 'axios';

const AddQuiz = ({ courseId }) => {
  const [quizTopic, setQuizTopic] = useState('');
  const [questions, setQuestions] = useState(Array(10).fill({ questionText: '', options: ['', '', '', ''], correctAnswerIndex: 0 }));
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === 'questionText') {
      updatedQuestions[index].questionText = value;
    } else {
      const [optionIndex] = field.split('-'); // 'option-0', 'option-1', etc.
      updatedQuestions[index].options[parseInt(optionIndex)] = value;
    }
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].correctAnswerIndex = parseInt(value);
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const quizData = {
      title: quizTopic,
      questions: questions.map((q) => ({
        questionText: q.questionText,
        options: q.options.map((option, i) => ({ text: option, isCorrect: i === q.correctAnswerIndex }))
      }))
    };

    try {
      const response = await axios.post(`/teacher/${courseId}/quizzes/add`, quizData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('Quiz added successfully!');
    } catch (error) {
      setMessage('Failed to add quiz. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Quiz</h2>
      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Quiz Topic:</label>
          <input
            type="text"
            value={quizTopic}
            onChange={(e) => setQuizTopic(e.target.value)}
            required
          />
        </div>

        <h3>Questions</h3>
        {questions.map((q, index) => (
          <div key={index}>
            <label>Question {index + 1}:</label>
            <input
              type="text"
              value={q.questionText}
              onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
              required
            />
            <div>
              {q.options.map((option, i) => (
                <div key={i}>
                  <label>Option {i + 1}:</label>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleQuestionChange(index, `option-${i}`, e.target.value)}
                    required
                  />
                </div>
              ))}
              <label>Correct Answer:</label>
              <select value={q.correctAnswerIndex} onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}>
                {q.options.map((_, i) => (
                  <option key={i} value={i}>Option {i + 1}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Add Quiz'}
        </button>
      </form>
    </div>
  );
};

export default AddQuiz;
