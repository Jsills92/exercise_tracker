const express = require('express');
const router = express.Router();
const { getExercises, addExercise, deleteExercise, updateExercise } = require('../controllers/exerciseController');
const { createUser } = require('../controllers/userController');

// Get all exercises
router.get('/exercises', getExercises);

// Add a new exercise
router.post('/exercises', addExercise);

// Delete an exercise
router.delete('/exercises/:id', deleteExercise);

// Update an exercise by ID
router.put('/exercises/:id', updateExercise)


module.exports = router;