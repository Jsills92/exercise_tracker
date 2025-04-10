const pool = require('../db/db');

const createUser = async (req, res) => {
  const { username } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO users (username) VALUES ($1) RETURNING *',
      [username]
    );

    const user = result.rows[0];

    res.json({
      username: user.username,
      _id: user.id  // Map your database `id` to `_id` as expected by FCC
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
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
