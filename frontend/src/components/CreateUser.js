// src/components/CreateUser.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
  const [username, setUsername] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        username
      });
  
      const data = response.data;
      console.log('User created:', data); // ✅ Good for debugging
  
      // ✅ Make sure you show the _id to the user
      setResponseMessage(`User created: ${data.username}, ID: ${data._id}`);
    } catch (error) {
      console.error('There was an error creating the user:', error);
      setResponseMessage('Failed to create user.');
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
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default CreateUser;
