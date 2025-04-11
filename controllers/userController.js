const pool = require('../db/db');

const createUser = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (username) VALUES ($1) RETURNING *',
      [username]
    );

    const user = result.rows[0];

    res.json({
      username: user.username,
      _id: user.id,  // Return the user ID as _id as per FCC spec
    });
  } catch (err) {
    console.error('Error creating user:', err);  // More detailed error logging
    res.status(500).json({ error: 'Failed to create user' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id AS _id, username FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


module.exports = { createUser, getAllUsers};
