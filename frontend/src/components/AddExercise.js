import React, { useState } from 'react';
import axios from 'axios';

const AddExercise = () => {
  const [userId, setUserId] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!userId || !description || !duration || !date) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/users/${userId}/exercises`, // Make sure this matches the backend route
        { description, duration, date } // Send only the exercise details in the body
      );
      console.log('Exercise added:', response.data);
      setError(''); // Reset error on successful submission
    } catch (error) {
      console.error('There was an error adding the exercise:', error);
      setError('There was an error adding the exercise.');
    }
  };

  return (
    <div>
      <h2>Add Exercise</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddExercise;
