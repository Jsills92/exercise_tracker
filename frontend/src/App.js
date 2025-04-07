// src/App.js
import React, { useState } from 'react';
import CreateUser from './components/CreateUser';
import AddExercise from './components/AddExercise';
import ExerciseLog from './components/ExerciseLog';

function App() {
  const [userId, setUserId] = useState('');

  return (
    <div className="App">
      <h1>Exercise Tracker</h1>
      
      <CreateUser />
      <AddExercise />
      
      <div>
        <h3>View Exercise Log by User ID:</h3>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
      </div>

      {userId && <ExerciseLog userId={userId} />}
    </div>
  );
}

export default App;
