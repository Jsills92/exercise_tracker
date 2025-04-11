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
      const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);
  
      if (userResult.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const exerciseResult = await pool.query(
        'SELECT description, duration, date FROM exercises WHERE user_id = $1',
        [user_id]
      );
  
      const log = exerciseResult.rows.map(ex => ({
        description: ex.description,
        duration: ex.duration,
        date: new Date(ex.date).toDateString()
      }));
  
      const user = userResult.rows[0];
  
      res.json({
        username: user.username,
        count: log.length,
        _id: user.id,
        log
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  

//Add a new exercise
const addExercise = async (req, res) => {
    const { user_id } = req.params;
    let { description, duration, date } = req.body;

    if (!description || !duration) {
        return res.status(400).json({ error: 'Description and duration are required' });
    }

    if (!date) {
        date = new Date().toISOString().split('T')[0];
    }

    try {
        // Insert exercise
        const insertResult = await pool.query(
            'INSERT INTO exercises (user_id, description, duration, date) VALUES ($1, $2, $3, $4) RETURNING *',
            [user_id, description, duration, date]
        );

        // Fetch user to get username
        const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [user_id]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const user = userResult.rows[0];
        const exercise = insertResult.rows[0];

        res.status(201).json({
            _id: user.id,
            username: user.username,
            date: new Date(exercise.date).toDateString(),
            duration: Number(exercise.duration),
            description: exercise.description
        });
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