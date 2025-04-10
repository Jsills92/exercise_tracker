// src/components/ExerciseLog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExerciseLog = ({ userId }) => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get(`https://exercise-tracker-app-5e089126146e.herokuapp.com/api/users/${userId}/logs`);
        setExercises(response.data);
      } catch (error) {
        console.error('Error fetching exercises:', error);
      }
    };

    if (userId) {
      fetchExercises();
    }
  }, [userId]);

  return (
    <div>
      <h2>Exercise Log</h2>
      {exercises.length === 0 ? (
        <p>No exercises logged yet.</p>
      ) : (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise.id}>
              {exercise.description} - {exercise.duration} minutes - {exercise.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ExerciseLog;
