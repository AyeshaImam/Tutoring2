// src/pages/AddLesson.js
import React, { useState } from 'react';
import axios from 'axios';

const AddLesson = ({ courseId }) => {
  const [lessonName, setLessonName] = useState('');
  const [lessonFile, setLessonFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setLessonFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    // Prepare form data for file upload
    const formData = new FormData();
    formData.append('lessonName', lessonName);
    formData.append('file', lessonFile);

    try {
      const response = await axios.post(`/teacher/${courseId}/lessons/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setMessage('Lesson added successfully!');
    } catch (error) {
      setMessage('Failed to add lesson. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Add Lesson</h2>
      {message && <p>{message}</p>}
      
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>Lesson Name:</label>
          <input
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Upload Lesson File:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Uploading...' : 'Add Lesson'}
        </button>
      </form>
    </div>
  );
};

export default AddLesson;
