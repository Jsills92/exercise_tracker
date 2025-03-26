const pool = require('../db/db');

// Get all exercises
const getExercises = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM exercises');
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message) 
        res.status(500).send('Server Error');
    }
};

//Add a new exercise
const addExercise = async (req, res) => {
    const { user_id, description, duration } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO exercises (user_id, description, duration) VALUES ($1, $2, $3) RETURNING *',
            [user_id, description, duration]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

module.exports = { getExercises, addExercise };