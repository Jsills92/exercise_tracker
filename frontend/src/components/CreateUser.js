// src/components/CreateUser.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users', { username });
      console.log('User created:', response.data);
      setUserId(response.data.id); // save the ID in state
    } catch (error) {
      console.error('There was an error creating the user:', error);
    }
  };

  return (
    <div>
      <h2>Create a New User</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {/* 👇 This will show the user ID after successful creation */}
    {userId && <p>Your user ID is: {userId}</p>}
    </div>
  );
};

export default CreateUser;
