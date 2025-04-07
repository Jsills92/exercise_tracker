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
// Get exercise by user
const getExercisesByUser = async (req, res) => {
    const { user_id } = req.params;
    
    try {
        const result = await pool.query(
            'SELECT * FROM exercises WHERE user_id = $1',
            [user_id]
        );
        res.status(200).json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

//Add a new exercise
const addExercise = async (req, res) => {
    const { user_id } = req.params;  // Extract user_id from the route parameters
    const { description, duration } = req.body; // user_id will come from the URL

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


//Delete a new exercise


const deleteExercise = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM exercises WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        res.json({ message: 'Exercise deleted successfully', deletedExercise: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateExercise = async (req, res) => {
    const { id } = req.params;
    const { description, duration, date } = req.body;

    if (!description || !duration || !date) {
        return res.status(400).json({ message: 'Description, duration, and date are required' });
    }

    try {
        const result = await pool.query(
            'UPDATE exercises SET description = $1, duration = $2, date = $3 WHERE id = $4 RETURNING *',
            [description, duration, date, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Exercise not found' });
        }

        res.json({ message: 'Exercise updated successfully', updatedExercise: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};



module.exports = { getExercises, getExercisesByUser, addExercise, deleteExercise, updateExercise };