import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance'; // Assuming axiosInstance is properly set up

const EntriesCreate = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    try {
      // Send POST request to create a new entry
      await axiosInstance.post('/entries/', {
        title,
        body,
      });
      
      // After successful creation, redirect to entries list
      navigate('/entries');
    } catch (error) {
      console.error('Error creating entry:', error);
      setError('Failed to create entry. Please try again.');
    }
  };

  return (
    <div>
      <h1>Create a New Entry</h1>
      {/* Display error message if any */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Entry creation form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="body">Content</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default EntriesCreate;
